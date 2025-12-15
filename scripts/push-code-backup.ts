import { Octokit } from '@octokit/rest';
import * as fs from 'fs';
import * as path from 'path';

let connectionSettings: any;

async function getAccessToken() {
  if (connectionSettings && connectionSettings.settings.expires_at && new Date(connectionSettings.settings.expires_at).getTime() > Date.now()) {
    return connectionSettings.settings.access_token;
  }
  
  const hostname = process.env.REPLIT_CONNECTORS_HOSTNAME;
  const xReplitToken = process.env.REPL_IDENTITY 
    ? 'repl ' + process.env.REPL_IDENTITY 
    : process.env.WEB_REPL_RENEWAL 
    ? 'depl ' + process.env.WEB_REPL_RENEWAL 
    : null;

  if (!xReplitToken) {
    throw new Error('X_REPLIT_TOKEN not found');
  }

  connectionSettings = await fetch(
    'https://' + hostname + '/api/v2/connection?include_secrets=true&connector_names=github',
    {
      headers: {
        'Accept': 'application/json',
        'X_REPLIT_TOKEN': xReplitToken
      }
    }
  ).then(res => res.json()).then(data => data.items?.[0]);

  const accessToken = connectionSettings?.settings?.access_token || connectionSettings.settings?.oauth?.credentials?.access_token;

  if (!connectionSettings || !accessToken) {
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
  'generated'
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
          if (!isBinary && content.length < 1024 * 1024) {
            files.push({
              path: relativePath,
              content: content.toString('base64')
            });
          }
        } catch (e) {
          console.log(`Skipping ${relativePath}: ${e}`);
        }
      }
    }
  } catch (e) {
    console.log(`Error reading ${dir}: ${e}`);
  }
  
  return files;
}

async function createOrUpdateFile(octokit: Octokit, owner: string, repo: string, filePath: string, content: string) {
  let sha: string | undefined;
  
  try {
    const { data } = await octokit.repos.getContent({
      owner,
      repo,
      path: filePath
    });
    if (!Array.isArray(data)) {
      sha = data.sha;
    }
  } catch (e: any) {
    if (e.status !== 404) throw e;
  }
  
  await octokit.repos.createOrUpdateFileContents({
    owner,
    repo,
    path: filePath,
    message: `Update ${filePath}`,
    content,
    sha
  });
}

async function main() {
  const accessToken = await getAccessToken();
  const octokit = new Octokit({ auth: accessToken });
  
  const owner = 'FullStackMaster1';
  const repo = 'fullstackmaster.net-code';
  
  // Try to create the repo
  try {
    await octokit.repos.createForAuthenticatedUser({
      name: repo,
      description: 'Source code for FullStackMaster coaching website',
      private: false,
      auto_init: true
    });
    console.log(`Created new repo: ${repo}`);
    await new Promise(r => setTimeout(r, 3000));
  } catch (e: any) {
    if (e.status === 422) {
      console.log(`Repo ${repo} already exists, will update files`);
    } else {
      throw e;
    }
  }
  
  console.log('Collecting files...');
  const files = getAllFiles('.');
  console.log(`Found ${files.length} files to push`);
  
  for (const file of files) {
    try {
      await createOrUpdateFile(octokit, owner, repo, file.path, file.content);
      console.log(`✓ ${file.path}`);
    } catch (e: any) {
      console.log(`✗ ${file.path}: ${e.message}`);
    }
  }
  
  console.log(`\nDone! Code pushed to https://github.com/${owner}/${repo}`);
}

main().catch(console.error);
