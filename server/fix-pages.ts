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

async function fixPagesConfig() {
  const owner = 'FullStackMaster1';
  const repo = 'fullstackmaster1.github.io';
  
  const accessToken = await getAccessToken();
  const octokit = new Octokit({ auth: accessToken });
  
  try {
    console.log('Updating GitHub Pages to serve from root...');
    
    // Update source to root
    await octokit.repos.updateInformationAboutPagesSite({
      owner,
      repo,
      source: {
        branch: 'main',
        path: '/'
      },
      cname: 'www.fullstackmaster.net',
      https_enforced: true
    });
    
    console.log('✅ GitHub Pages now serving from root (/)');
    console.log('✅ Custom domain: www.fullstackmaster.net');
    console.log('\n⏱️  Wait 2-3 minutes for changes to take effect.');
    
    // Verify
    const { data: pages } = await octokit.repos.getPages({ owner, repo });
    console.log('\nUpdated config:');
    console.log(JSON.stringify(pages, null, 2));
    
  } catch (e: any) {
    console.error('Error:', e.message);
    if (e.response) {
      console.error('Response:', e.response.data);
    }
  }
}

fixPagesConfig();
