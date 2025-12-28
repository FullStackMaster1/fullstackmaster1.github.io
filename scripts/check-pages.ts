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

async function checkPages() {
  const accessToken = await getAccessToken();
  const octokit = new Octokit({ auth: accessToken });
  
  const owner = 'fullstackmaster1';
  const repo = 'fullstackmaster1.github.io';
  
  // Check GitHub Pages info
  try {
    const { data: pages } = await octokit.repos.getPages({ owner, repo });
    console.log('GitHub Pages Status:');
    console.log(`  URL: ${pages.html_url}`);
    console.log(`  Status: ${pages.status}`);
    console.log(`  CNAME: ${pages.cname || 'none'}`);
    console.log(`  Source: ${pages.source?.branch} / ${pages.source?.path}`);
  } catch (e: any) {
    console.log('Pages info error:', e.message);
  }
  
  // Check workflow runs (Actions)
  try {
    const { data: runs } = await octokit.actions.listWorkflowRunsForRepo({
      owner,
      repo,
      per_page: 3
    });
    console.log('\nRecent workflow runs:');
    runs.workflow_runs.forEach(r => {
      console.log(`  ${r.name}: ${r.status} - ${r.conclusion} (${r.created_at})`);
    });
  } catch (e: any) {
    console.log('No workflow runs or error:', e.message);
  }
  
  // Check pages deployments
  try {
    const { data: deployments } = await octokit.repos.listDeployments({
      owner,
      repo,
      per_page: 3
    });
    console.log('\nRecent deployments:');
    deployments.forEach(d => {
      console.log(`  ${d.environment}: ${d.sha?.slice(0,7)} - ${d.created_at}`);
    });
  } catch (e: any) {
    console.log('Deployments error:', e.message);
  }
}

checkPages().catch(console.error);
