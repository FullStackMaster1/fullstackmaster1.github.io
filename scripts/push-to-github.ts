// Script to push code to GitHub /docs folder for GitHub Pages
import { Octokit } from '@octokit/rest';
import * as fs from 'fs';
import * as path from 'path';

let connectionSettings: any;

async function getAccessToken() {
  const hostname = process.env.REPLIT_CONNECTORS_HOSTNAME;
  const xReplitToken = process.env.REPL_IDENTITY 
    ? 'repl ' + process.env.REPL_IDENTITY 
    : process.env.WEB_REPL_RENEWAL 
    ? 'depl ' + process.env.WEB_REPL_RENEWAL 
    : null;

  connectionSettings = await fetch(
    'https://' + hostname + '/api/v2/connection?include_secrets=true&connector_names=github',
    {
      headers: {
        'Accept': 'application/json',
        'X_REPLIT_TOKEN': xReplitToken!
      }
    }
  ).then(res => res.json()).then(data => data.items?.[0]);

  return connectionSettings?.settings?.access_token || connectionSettings.settings?.oauth?.credentials?.access_token;
}

async function pushToGitHub() {
  const accessToken = await getAccessToken();
  const octokit = new Octokit({ auth: accessToken });
  
  const owner = 'fullstackmaster1';
  const repo = 'fullstackmaster1.github.io';
  
  // Get repo info
  const { data: repoData } = await octokit.repos.get({ owner, repo });
  const defaultBranch = repoData.default_branch;
  console.log(`Repository: ${owner}/${repo}, Branch: ${defaultBranch}`);
  
  // Get latest commit
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
  
  // Build first
  console.log('Building production files...');
  const { execSync } = await import('child_process');
  execSync('npm run build', { stdio: 'inherit' });
  
  // Read all files from dist/public
  const distPath = path.join(process.cwd(), 'dist', 'public');
  
  async function getAllFiles(dir: string, baseDir: string = dir): Promise<{path: string, content: Buffer}[]> {
    const files: {path: string, content: Buffer}[] = [];
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      const relativePath = path.relative(baseDir, fullPath);
      
      if (entry.isDirectory()) {
        files.push(...await getAllFiles(fullPath, baseDir));
      } else {
        files.push({
          path: 'docs/' + relativePath,  // Push to /docs folder
          content: fs.readFileSync(fullPath)
        });
      }
    }
    return files;
  }
  
  const files = await getAllFiles(distPath);
  console.log(`Found ${files.length} files to upload to /docs`);
  
  // Create blobs
  const treeItems: any[] = [];
  for (const file of files) {
    const { data: blob } = await octokit.git.createBlob({
      owner,
      repo,
      content: file.content.toString('base64'),
      encoding: 'base64',
    });
    treeItems.push({
      path: file.path,
      mode: '100644',
      type: 'blob',
      sha: blob.sha,
    });
    process.stdout.write('.');
  }
  console.log('\nBlobs created');
  
  // Also add CNAME to docs folder
  const { data: cnameBlob } = await octokit.git.createBlob({
    owner,
    repo,
    content: Buffer.from('www.fullstackmaster.net').toString('base64'),
    encoding: 'base64',
  });
  treeItems.push({
    path: 'docs/CNAME',
    mode: '100644',
    type: 'blob',
    sha: cnameBlob.sha,
  });
  
  // Create new tree with base tree (preserves other files)
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
    message: 'Deploy to /docs: Add 5 viral marketing features with WhatsApp lead capture',
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
  
  console.log(`\n✅ Successfully pushed to https://github.com/${owner}/${repo}/tree/main/docs`);
  console.log(`Your site will be live at https://www.fullstackmaster.net shortly!`);
}

pushToGitHub().catch(console.error);
