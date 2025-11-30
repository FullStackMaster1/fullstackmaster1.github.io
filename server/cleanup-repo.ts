import { Octokit } from '@octokit/rest';

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

async function cleanupRepo() {
  const owner = 'FullStackMaster1';
  const repo = 'fullstackmaster1.github.io';
  const branch = 'main';
  
  // Files that were incorrectly pushed to root (should only be in /docs)
  const filesToDelete = [
    '404.html',
    'API_REFERENCE.md',
    'CNAME',
    'CONTENT_MANAGEMENT.md',
    'DEPLOYMENT_GUIDE.md',
    'QUICK_DEPLOY.md',
    'TECHNICAL_STACK.md',
    '_headers',
    'deploy.sh',
    'favicon.png',
    'github-actions-deploy.yml',
    'index.html',
    'package-scripts.json',
    'vite.config.static.ts',
    'assets/1_1764272631453-B6nxnrwJ.png',
    'assets/2_1764272631453-DmMf_eOO.png',
    'assets/3_1764272631453-DzPJM7YJ.png',
    'assets/fullstack_master_logo_1764259679495-DjmD_HY1.jpeg',
    'assets/image_1764273039071-CWhd7Rzv.png',
    'assets/image_1764282508840-D6-WgJJd.png',
    'assets/index-DkG5Uy-B.css',
    'assets/index-Iz9CiyTW.js',
    'assets/rupesh-seating-confidently_1764278393371-B6L2zwSc.png'
  ];

  console.log('🧹 Cleaning up incorrectly deployed files from repo root...');
  
  const accessToken = await getAccessToken();
  const octokit = new Octokit({ auth: accessToken });
  
  try {
    // Get current commit
    const { data: refData } = await octokit.git.getRef({
      owner,
      repo,
      ref: `heads/${branch}`
    });
    const currentCommitSha = refData.object.sha;
    
    // Get current tree
    const { data: commitData } = await octokit.git.getCommit({
      owner,
      repo,
      commit_sha: currentCommitSha
    });
    
    // Get full tree recursively
    const { data: treeData } = await octokit.git.getTree({
      owner,
      repo,
      tree_sha: commitData.tree.sha,
      recursive: 'true'
    });
    
    // Filter out the files to delete, keep everything else
    const newTree = treeData.tree
      .filter(item => {
        // Keep if it's in docs/ folder or not in the delete list
        if (item.path?.startsWith('docs/')) return true;
        if (filesToDelete.includes(item.path || '')) {
          console.log(`  🗑️  Deleting: ${item.path}`);
          return false;
        }
        return true;
      })
      .map(item => ({
        path: item.path,
        mode: item.mode as '100644' | '100755' | '040000' | '160000' | '120000',
        type: item.type as 'blob' | 'tree' | 'commit',
        sha: item.sha
      }));
    
    // Create new tree
    const { data: newTreeData } = await octokit.git.createTree({
      owner,
      repo,
      tree: newTree
    });
    
    // Create commit
    const { data: newCommit } = await octokit.git.createCommit({
      owner,
      repo,
      message: 'Cleanup: Remove incorrectly deployed root files',
      tree: newTreeData.sha,
      parents: [currentCommitSha]
    });
    
    // Update branch reference
    await octokit.git.updateRef({
      owner,
      repo,
      ref: `heads/${branch}`,
      sha: newCommit.sha
    });
    
    console.log('\n✅ Cleanup complete!');
    console.log(`📌 New commit: ${newCommit.sha.substring(0, 7)}`);
    
  } catch (error: any) {
    console.error('❌ Error:', error.message);
    if (error.response) {
      console.error('Response:', error.response.data);
    }
  }
}

cleanupRepo();
