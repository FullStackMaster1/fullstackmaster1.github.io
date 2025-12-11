import { Octokit } from "@octokit/rest";
import * as fs from "fs";

let connectionSettings: any;

async function getAccessToken() {
  const hostname = process.env.REPLIT_CONNECTORS_HOSTNAME
  const xReplitToken = process.env.REPL_IDENTITY 
    ? 'repl ' + process.env.REPL_IDENTITY 
    : process.env.WEB_REPL_RENEWAL 
    ? 'depl ' + process.env.WEB_REPL_RENEWAL 
    : null;

  if (!xReplitToken) {
    throw new Error('X_REPLIT_TOKEN not found');
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

async function pushReview() {
  const accessToken = await getAccessToken();
  const octokit = new Octokit({ auth: accessToken });
  
  const owner = 'FullStackMaster1';
  const repo = 'FullStackMaster';
  const path = 'client/src/data/reviews.json';
  const branch = 'main';

  const content = fs.readFileSync(path, 'utf-8');
  const encodedContent = Buffer.from(content).toString('base64');

  const { data: currentFile } = await octokit.repos.getContent({
    owner, repo, path, ref: branch
  });

  await octokit.repos.createOrUpdateFileContents({
    owner, repo, path, branch,
    message: "Add Ashley's 5-star review from Dec 10, 2025 - Phone Screen Prep",
    content: encodedContent,
    sha: (currentFile as any).sha
  });

  console.log('✓ Ashley review pushed to GitHub successfully!');
}

pushReview().catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});
