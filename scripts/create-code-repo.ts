import { Octokit } from '@octokit/rest';
import * as fs from 'fs';
import * as path from 'path';

async function getAccessToken() {
  const hostname = process.env.REPLIT_CONNECTORS_HOSTNAME;
  const xReplitToken = process.env.REPL_IDENTITY 
    ? 'repl ' + process.env.REPL_IDENTITY 
    : process.env.WEB_REPL_RENEWAL 
    ? 'depl ' + process.env.WEB_REPL_RENEWAL 
    : null;

  if (!xReplitToken) {
    throw new Error('X_REPLIT_TOKEN not found');
  }

  const data = await fetch(
    'https://' + hostname + '/api/v2/connection?include_secrets=true&connector_names=github',
    {
      headers: {
        'Accept': 'application/json',
        'X_REPLIT_TOKEN': xReplitToken
      }
    }
  ).then(res => res.json());

  const accessToken = data.items?.[0]?.settings?.access_token;
  if (!accessToken) {
    throw new Error('GitHub not connected');
  }
  return accessToken;
}

const IGNORE_PATTERNS = [
  'node_modules',
  '.git',
  'dist',
  '.cache',
  '.local',
  '.replit',
  'replit.nix',
  '.config',
  'package-lock.json',
  '.upm',
  'generated',
  '.breakpoints'
];

function shouldIgnore(filePath: string): boolean {
  return IGNORE_PATTERNS.some(pattern => filePath.includes(pattern));
}

function getAllFiles(dir: string, basePath = ''): { path: string; content: string }[] {
  const files: { path: string; content: string }[] = [];
  
  try {
    const items = fs.readdirSync(dir);
    
    for (const item of items) {
      const fullPath = path.join(dir, item);
      const relativePath = path.join(basePath, item);
      
      if (shouldIgnore(relativePath)) continue;
      
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        files.push(...getAllFiles(fullPath, relativePath));
      } else if (stat.isFile()) {
        try {
          const content = fs.readFileSync(fullPath);
          const isBinary = content.includes(0);
          if (!isBinary && content.length < 500 * 1024) {
            files.push({
              path: relativePath,
              content: content.toString('base64')
            });
          }
        } catch (e) {
          // Skip unreadable files
        }
      }
    }
  } catch (e) {
    // Skip unreadable directories
  }
  
  return files;
}

async function main() {
  const accessToken = await getAccessToken();
  const octokit = new Octokit({ auth: accessToken });
  
  const owner = 'FullStackMaster1';
  const repo = 'fullstackmaster.net-code';
  
  // Create the repo first
  console.log('Creating repository...');
  try {
    await octokit.repos.createForAuthenticatedUser({
      name: repo,
      description: 'Source code for FullStackMaster coaching website',
      private: false
    });
    console.log(`Created new repo: ${repo}`);
    // Wait for repo to be ready
    await new Promise(r => setTimeout(r, 5000));
  } catch (e: any) {
    if (e.status === 422 || e.message?.includes('already exists')) {
      console.log(`Repo ${repo} already exists`);
    } else {
      console.error('Failed to create repo:', e.message);
      throw e;
    }
  }
  
  // Collect all files
  console.log('Collecting files...');
  const files = getAllFiles('.');
  console.log(`Found ${files.length} files to push`);
  
  // Push files one by one
  let success = 0;
  let failed = 0;
  
  for (const file of files) {
    try {
      let sha: string | undefined;
      
      try {
        const { data } = await octokit.repos.getContent({
          owner,
          repo,
          path: file.path
        });
        if (!Array.isArray(data)) {
          sha = data.sha;
        }
      } catch (e: any) {
        // File doesn't exist yet, that's fine
      }
      
      await octokit.repos.createOrUpdateFileContents({
        owner,
        repo,
        path: file.path,
        message: `Add ${file.path}`,
        content: file.content,
        sha
      });
      
      console.log(`✓ ${file.path}`);
      success++;
    } catch (e: any) {
      console.log(`✗ ${file.path}: ${e.message}`);
      failed++;
    }
  }
  
  console.log(`\nDone! ${success} files pushed, ${failed} failed`);
  console.log(`View at: https://github.com/${owner}/${repo}`);
}

main().catch(console.error);
