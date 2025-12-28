// Script to push code to GitHub using Replit's GitHub integration
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

async function getGitHubClient() {
  const accessToken = await getAccessToken();
  return new Octokit({ auth: accessToken });
}

async function pushToGitHub() {
  const octokit = await getGitHubClient();
  
  // Get authenticated user
  const { data: user } = await octokit.users.getAuthenticated();
  console.log(`Authenticated as: ${user.login}`);
  
  const owner = 'fullstackmaster1';
  const repo = 'fullstackmaster1.github.io';
  
  // Get the default branch
  let defaultBranch = 'main';
  try {
    const { data: repoData } = await octokit.repos.get({ owner, repo });
    defaultBranch = repoData.default_branch;
    console.log(`Repository: ${owner}/${repo}, Default branch: ${defaultBranch}`);
  } catch (error: any) {
    console.error('Error getting repo:', error.message);
    throw error;
  }
  
  // Get latest commit SHA
  const { data: refData } = await octokit.git.getRef({
    owner,
    repo,
    ref: `heads/${defaultBranch}`,
  });
  const latestCommitSha = refData.object.sha;
  console.log(`Latest commit: ${latestCommitSha}`);
  
  // Get the tree of the latest commit
  const { data: commitData } = await octokit.git.getCommit({
    owner,
    repo,
    commit_sha: latestCommitSha,
  });
  
  // Build the dist folder first
  console.log('Building production files...');
  const { execSync } = await import('child_process');
  execSync('npm run build', { stdio: 'inherit' });
  
  // Read all files from dist folder
  const distPath = path.join(process.cwd(), 'dist', 'public');
  
  async function getAllFiles(dir: string, baseDir: string = dir): Promise<{path: string, content: string}[]> {
    const files: {path: string, content: string}[] = [];
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      const relativePath = path.relative(baseDir, fullPath);
      
      if (entry.isDirectory()) {
        files.push(...await getAllFiles(fullPath, baseDir));
      } else {
        const content = fs.readFileSync(fullPath);
        files.push({
          path: relativePath,
          content: content.toString('base64')
        });
      }
    }
    return files;
  }
  
  const files = await getAllFiles(distPath);
  console.log(`Found ${files.length} files to upload`);
  
  // Create blobs for each file
  const treeItems: any[] = [];
  for (const file of files) {
    const { data: blob } = await octokit.git.createBlob({
      owner,
      repo,
      content: file.content,
      encoding: 'base64',
    });
    treeItems.push({
      path: file.path,
      mode: '100644',
      type: 'blob',
      sha: blob.sha,
    });
    console.log(`Created blob for: ${file.path}`);
  }
  
  // Create new tree
  const { data: newTree } = await octokit.git.createTree({
    owner,
    repo,
    tree: treeItems,
    base_tree: commitData.tree.sha,
  });
  console.log(`Created tree: ${newTree.sha}`);
  
  // Create commit
  const { data: newCommit } = await octokit.git.createCommit({
    owner,
    repo,
    message: 'Deploy: Add 5 viral marketing features with WhatsApp lead capture',
    tree: newTree.sha,
    parents: [latestCommitSha],
  });
  console.log(`Created commit: ${newCommit.sha}`);
  
  // Update reference
  await octokit.git.updateRef({
    owner,
    repo,
    ref: `heads/${defaultBranch}`,
    sha: newCommit.sha,
  });
  
  console.log(`\n✅ Successfully pushed to https://github.com/${owner}/${repo}`);
  console.log(`Your site will be live at https://${owner}.github.io shortly!`);
}

pushToGitHub().catch(console.error);
