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

  if (!xReplitToken) throw new Error('X_REPLIT_TOKEN not found');

  const data = await fetch(
    'https://' + hostname + '/api/v2/connection?include_secrets=true&connector_names=github',
    { headers: { 'Accept': 'application/json', 'X_REPLIT_TOKEN': xReplitToken } }
  ).then(res => res.json());

  return data.items?.[0]?.settings?.access_token;
}

async function updateFile(octokit: Octokit, owner: string, repo: string, filePath: string, content: Buffer, message: string) {
  let sha: string | undefined;
  
  try {
    const { data } = await octokit.repos.getContent({ owner, repo, path: filePath });
    if (!Array.isArray(data)) sha = data.sha;
  } catch (e: any) {
    if (e.status !== 404) throw e;
  }

  await octokit.repos.createOrUpdateFileContents({
    owner, repo, path: filePath, message,
    content: content.toString('base64'),
    sha
  });
  console.log(`✓ ${filePath}`);
}

const IGNORE = ['node_modules', '.git', 'dist', '.cache', '.local', '.replit', 'replit.nix', '.config', 'package-lock.json', '.upm', 'generated', '.breakpoints', 'attached_assets'];

function shouldIgnore(p: string): boolean {
  return IGNORE.some(pattern => p.includes(pattern));
}

function getAllFiles(dir: string, basePath = ''): { path: string; content: Buffer }[] {
  const files: { path: string; content: Buffer }[] = [];
  
  try {
    for (const item of fs.readdirSync(dir)) {
      const fullPath = path.join(dir, item);
      const relativePath = path.join(basePath, item);
      
      if (shouldIgnore(relativePath)) continue;
      
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        files.push(...getAllFiles(fullPath, relativePath));
      } else if (stat.isFile() && stat.size < 500 * 1024) {
        try {
          const content = fs.readFileSync(fullPath);
          const isBinary = content.includes(0);
          if (!isBinary) files.push({ path: relativePath, content });
        } catch (e) {}
      }
    }
  } catch (e) {}
  
  return files;
}

async function main() {
  const accessToken = await getAccessToken();
  const octokit = new Octokit({ auth: accessToken });
  
  const owner = 'FullStackMaster1';
  const repo = 'fullstackmaster-website-code';
  
  // Step 1: Create the repo if it doesn't exist
  console.log('Checking/creating repository...');
  try {
    await octokit.repos.get({ owner, repo });
    console.log('Repo exists');
  } catch (e: any) {
    if (e.status === 404) {
      console.log('Creating repo...');
      await octokit.repos.createForAuthenticatedUser({
        name: repo,
        description: 'Source code for FullStackMaster coaching website',
        private: false,
        auto_init: true
      });
      console.log('Repo created! Waiting for initialization...');
      await new Promise(r => setTimeout(r, 5000));
    } else {
      throw e;
    }
  }
  
  // Step 2: Push all files
  console.log('\nCollecting files...');
  const files = getAllFiles('.');
  console.log(`Found ${files.length} files to push\n`);
  
  let success = 0, failed = 0;
  
  for (const file of files) {
    try {
      await updateFile(octokit, owner, repo, file.path, file.content, `Update ${file.path}`);
      success++;
    } catch (e: any) {
      console.log(`✗ ${file.path}: ${e.message}`);
      failed++;
    }
  }
  
  console.log(`\n✅ Done! ${success} files pushed, ${failed} failed`);
  console.log(`📁 View your code: https://github.com/${owner}/${repo}`);
}

main().catch(console.error);
