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

async function getUncachableGitHubClient() {
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

async function deploy() {
  console.log('Getting GitHub client...');
  const octokit = await getUncachableGitHubClient();
  
  const owner = 'FullStackMaster1';
  const repo = 'fullstackmaster1.github.io';
  const branch = 'main';
  
  console.log('Getting current commit SHA...');
  const { data: ref } = await octokit.git.getRef({
    owner,
    repo,
    ref: `heads/${branch}`
  });
  const latestCommitSha = ref.object.sha;
  
  console.log('Getting base tree...');
  const { data: commit } = await octokit.git.getCommit({
    owner,
    repo,
    commit_sha: latestCommitSha
  });
  const baseTreeSha = commit.tree.sha;
  
  console.log('Reading docs folder...');
  const files = await getAllFiles('docs');
  console.log(`Found ${files.length} files to upload`);
  
  console.log('Creating blobs...');
  const blobs = await Promise.all(
    files.map(async (file) => {
      const { data: blob } = await octokit.git.createBlob({
        owner,
        repo,
        content: file.content,
        encoding: 'base64'
      });
      return {
        path: `docs/${file.path}`,
        mode: '100644' as const,
        type: 'blob' as const,
        sha: blob.sha
      };
    })
  );
  
  console.log('Creating tree...');
  const { data: tree } = await octokit.git.createTree({
    owner,
    repo,
    base_tree: baseTreeSha,
    tree: blobs
  });
  
  console.log('Creating commit...');
  const { data: newCommit } = await octokit.git.createCommit({
    owner,
    repo,
    message: 'Update site with latest content, icons, and og-image',
    tree: tree.sha,
    parents: [latestCommitSha]
  });
  
  console.log('Updating reference...');
  await octokit.git.updateRef({
    owner,
    repo,
    ref: `heads/${branch}`,
    sha: newCommit.sha
  });
  
  console.log(`✅ Successfully deployed to GitHub!`);
  console.log(`Commit SHA: ${newCommit.sha}`);
  console.log(`View at: https://github.com/${owner}/${repo}`);
}

deploy().catch(console.error);
