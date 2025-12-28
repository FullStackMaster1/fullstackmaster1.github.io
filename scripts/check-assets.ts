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

async function checkAssets() {
  const accessToken = await getAccessToken();
  const octokit = new Octokit({ auth: accessToken });
  
  const owner = 'fullstackmaster1';
  const repo = 'fullstackmaster1.github.io';
  
  // Check files in /docs/assets
  const { data: contents } = await octokit.repos.getContent({
    owner,
    repo,
    path: 'docs/assets'
  });
  
  console.log('Files in /docs/assets:');
  if (Array.isArray(contents)) {
    // Look for our viral features
    const quizFile = contents.find(f => f.name.includes('InterviewQuiz'));
    const salaryFile = contents.find(f => f.name.includes('SalaryCalculator'));
    const referralFile = contents.find(f => f.name.includes('ReferralProgram'));
    
    console.log('\nViral feature bundles:');
    console.log('  InterviewQuiz:', quizFile?.name || 'NOT FOUND');
    console.log('  SalaryCalculator:', salaryFile?.name || 'NOT FOUND');
    console.log('  ReferralProgram:', referralFile?.name || 'NOT FOUND');
    
    console.log('\nTotal files in assets:', contents.length);
  }
}

checkAssets().catch(console.error);
