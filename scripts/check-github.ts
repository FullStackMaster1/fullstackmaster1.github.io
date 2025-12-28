import { Octokit } from '@octokit/rest';

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

async function checkRepo() {
  const accessToken = await getAccessToken();
  const octokit = new Octokit({ auth: accessToken });
  
  const owner = 'fullstackmaster1';
  const repo = 'fullstackmaster1.github.io';
  
  // Get latest commits
  const { data: commits } = await octokit.repos.listCommits({
    owner,
    repo,
    per_page: 5
  });
  
  console.log('Latest commits:');
  commits.forEach(c => {
    console.log(`  ${c.sha.slice(0,7)} - ${c.commit.message} (${c.commit.author?.date})`);
  });
  
  // Check files in root
  const { data: contents } = await octokit.repos.getContent({
    owner,
    repo,
    path: ''
  });
  
  console.log('\nFiles in root:');
  if (Array.isArray(contents)) {
    contents.forEach(f => console.log(`  ${f.type}: ${f.name}`));
  }
}

checkRepo().catch(console.error);
