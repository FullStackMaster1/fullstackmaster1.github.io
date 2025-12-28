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

async function checkDocs() {
  const accessToken = await getAccessToken();
  const octokit = new Octokit({ auth: accessToken });
  
  const owner = 'fullstackmaster1';
  const repo = 'fullstackmaster1.github.io';
  
  // Check files in /docs
  const { data: contents } = await octokit.repos.getContent({
    owner,
    repo,
    path: 'docs'
  });
  
  console.log('Files in /docs folder:');
  if (Array.isArray(contents)) {
    contents.forEach(f => console.log(`  ${f.type}: ${f.name}`));
  }
  
  // Check if star-stories-guide.pdf exists
  try {
    const { data: pdf } = await octokit.repos.getContent({
      owner,
      repo,
      path: 'docs/star-stories-guide.pdf'
    });
    console.log('\n✅ star-stories-guide.pdf exists in /docs');
  } catch (e) {
    console.log('\n❌ star-stories-guide.pdf NOT found in /docs');
  }
  
  // Get index.html content to check it's updated
  try {
    const { data: indexHtml } = await octokit.repos.getContent({
      owner,
      repo,
      path: 'docs/index.html'
    }) as any;
    
    const content = Buffer.from(indexHtml.content, 'base64').toString('utf-8');
    console.log('\nindex.html size:', content.length, 'bytes');
    console.log('Contains InterviewQuiz:', content.includes('InterviewQuiz'));
    console.log('Contains SalaryCalculator:', content.includes('SalaryCalculator'));
  } catch (e: any) {
    console.log('Error reading index.html:', e.message);
  }
}

checkDocs().catch(console.error);
