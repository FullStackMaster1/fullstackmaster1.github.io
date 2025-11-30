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

async function checkAndConfigurePages() {
  const owner = 'FullStackMaster1';
  const repo = 'fullstackmaster1.github.io';
  
  const accessToken = await getAccessToken();
  const octokit = new Octokit({ auth: accessToken });
  
  try {
    // Get current pages config
    const { data: pages } = await octokit.repos.getPages({ owner, repo });
    console.log('Current Pages config:');
    console.log(JSON.stringify(pages, null, 2));
    
    // Update with custom domain
    if (pages.cname !== 'www.fullstackmaster.net') {
      console.log('\nUpdating custom domain...');
      await octokit.repos.updateInformationAboutPagesSite({
        owner,
        repo,
        cname: 'www.fullstackmaster.net',
        https_enforced: true
      });
      console.log('Custom domain updated to www.fullstackmaster.net!');
    } else {
      console.log('\nCustom domain already set correctly.');
    }
  } catch (e: any) {
    console.error('Error:', e.message);
    if (e.response) {
      console.error('Response:', e.response.data);
    }
  }
}

checkAndConfigurePages();
