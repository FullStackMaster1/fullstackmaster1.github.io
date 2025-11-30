// GitHub deployment script using Octokit
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
    throw new Error('X_REPLIT_TOKEN not found for repl/depl');
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

async function getAllFiles(dir: string, baseDir: string = dir): Promise<{path: string, content: string}[]> {
  const files: {path: string, content: string}[] = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    const relativePath = path.relative(baseDir, fullPath);
    
    if (entry.isDirectory()) {
      const subFiles = await getAllFiles(fullPath, baseDir);
      files.push(...subFiles);
    } else {
      // Read file as base64 for binary files, utf8 for text
      const isBinary = /\.(png|jpg|jpeg|gif|ico|woff|woff2|ttf|eot)$/i.test(entry.name);
      const content = fs.readFileSync(fullPath, isBinary ? 'base64' : 'utf8');
      files.push({ path: relativePath, content });
    }
  }
  
  return files;
}

async function deployToGitHub() {
  const owner = 'FullStackMaster1';
  const repo = 'fullstackmaster1.github.io';
  const branch = 'main';
  const docsDir = './docs';
  
  console.log('🚀 Starting GitHub deployment...');
  console.log(`📁 Repository: ${owner}/${repo}`);
  
  try {
    const octokit = await getGitHubClient();
    console.log('✅ GitHub client authenticated');
    
    // Get the current commit SHA
    const { data: refData } = await octokit.git.getRef({
      owner,
      repo,
      ref: `heads/${branch}`
    });
    const currentCommitSha = refData.object.sha;
    console.log(`📌 Current commit: ${currentCommitSha.substring(0, 7)}`);
    
    // Get the current tree
    const { data: commitData } = await octokit.git.getCommit({
      owner,
      repo,
      commit_sha: currentCommitSha
    });
    
    // Get all files from docs directory
    const files = await getAllFiles(docsDir);
    console.log(`📄 Found ${files.length} files to upload`);
    
    // Create blobs for each file
    const blobs: {path: string, sha: string, mode: string, type: string}[] = [];
    
    for (const file of files) {
      const isBinary = /\.(png|jpg|jpeg|gif|ico|woff|woff2|ttf|eot|css|js)$/i.test(file.path);
      
      const { data: blobData } = await octokit.git.createBlob({
        owner,
        repo,
        content: isBinary ? file.content : Buffer.from(file.content).toString('base64'),
        encoding: 'base64'
      });
      
      blobs.push({
        path: file.path,
        sha: blobData.sha,
        mode: '100644',
        type: 'blob'
      });
      console.log(`  ✓ ${file.path}`);
    }
    
    // Create a new tree
    const { data: treeData } = await octokit.git.createTree({
      owner,
      repo,
      tree: blobs as any,
      base_tree: undefined // Replace entire tree
    });
    console.log(`🌳 Created new tree: ${treeData.sha.substring(0, 7)}`);
    
    // Create a new commit
    const { data: newCommit } = await octokit.git.createCommit({
      owner,
      repo,
      message: 'Updated site with GA tracking, email templates, and branding',
      tree: treeData.sha,
      parents: [currentCommitSha]
    });
    console.log(`💾 Created commit: ${newCommit.sha.substring(0, 7)}`);
    
    // Update the reference
    await octokit.git.updateRef({
      owner,
      repo,
      ref: `heads/${branch}`,
      sha: newCommit.sha
    });
    
    console.log('');
    console.log('🎉 Deployment successful!');
    console.log(`🔗 Your site will be live at: https://fullstackmaster1.github.io`);
    console.log(`🔗 Custom domain: https://www.fullstackmaster.net`);
    console.log('');
    console.log('⏱️  GitHub Pages may take 2-3 minutes to rebuild.');
    
  } catch (error: any) {
    console.error('❌ Deployment failed:', error.message);
    if (error.response) {
      console.error('API Response:', error.response.data);
    }
    process.exit(1);
  }
}

deployToGitHub();
