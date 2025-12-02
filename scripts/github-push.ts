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

function getAllFiles(dirPath: string, basePath: string = ''): { path: string; content: string }[] {
  const files: { path: string; content: string }[] = [];
  const items = fs.readdirSync(dirPath);

  for (const item of items) {
    const fullPath = path.join(dirPath, item);
    const relativePath = path.join(basePath, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      files.push(...getAllFiles(fullPath, relativePath));
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

async function pushDocsToGitHub() {
  const octokit = await getGitHubClient();
  
  const { data: user } = await octokit.users.getAuthenticated();
  console.log(`Authenticated as: ${user.login}`);

  const repos = await octokit.repos.listForAuthenticatedUser({ per_page: 100 });
  const targetRepo = repos.data.find(r => 
    r.name.toLowerCase().includes('fullstackmaster') || 
    r.homepage?.includes('fullstackmaster')
  );

  if (!targetRepo) {
    console.log('Available repos:');
    repos.data.forEach(r => console.log(`  - ${r.name} (${r.homepage || 'no homepage'})`));
    throw new Error('Could not find fullstackmaster repository');
  }

  const owner = targetRepo.owner.login;
  const repo = targetRepo.name;
  console.log(`Found repository: ${owner}/${repo}`);

  const { data: refData } = await octokit.git.getRef({
    owner,
    repo,
    ref: 'heads/main'
  });
  const latestCommitSha = refData.object.sha;
  console.log(`Latest commit: ${latestCommitSha}`);

  const { data: commitData } = await octokit.git.getCommit({
    owner,
    repo,
    commit_sha: latestCommitSha
  });
  const baseTreeSha = commitData.tree.sha;

  console.log('Reading docs folder...');
  const files = getAllFiles('./docs');
  console.log(`Found ${files.length} files to upload`);

  const treeItems = files.map(file => ({
    path: `docs/${file.path}`,
    mode: '100644' as const,
    type: 'blob' as const,
    content: Buffer.from(file.content, 'base64').toString('utf-8')
  }));

  const binaryExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.ico', '.woff', '.woff2', '.ttf', '.eot'];
  
  const treeItemsWithBlobs = [];
  for (const file of files) {
    const ext = path.extname(file.path).toLowerCase();
    if (binaryExtensions.includes(ext)) {
      const { data: blobData } = await octokit.git.createBlob({
        owner,
        repo,
        content: file.content,
        encoding: 'base64'
      });
      treeItemsWithBlobs.push({
        path: `docs/${file.path}`,
        mode: '100644' as const,
        type: 'blob' as const,
        sha: blobData.sha
      });
    } else {
      treeItemsWithBlobs.push({
        path: `docs/${file.path}`,
        mode: '100644' as const,
        type: 'blob' as const,
        content: Buffer.from(file.content, 'base64').toString('utf-8')
      });
    }
  }

  console.log('Creating tree...');
  const { data: newTree } = await octokit.git.createTree({
    owner,
    repo,
    base_tree: baseTreeSha,
    tree: treeItemsWithBlobs
  });

  console.log('Creating commit...');
  const { data: newCommit } = await octokit.git.createCommit({
    owner,
    repo,
    message: 'Force update docs folder with latest build',
    tree: newTree.sha,
    parents: [latestCommitSha]
  });

  console.log('Updating ref...');
  await octokit.git.updateRef({
    owner,
    repo,
    ref: 'heads/main',
    sha: newCommit.sha,
    force: true
  });

  console.log(`Successfully pushed to ${owner}/${repo}!`);
  console.log(`Commit SHA: ${newCommit.sha}`);
}

pushDocsToGitHub().catch(console.error);
