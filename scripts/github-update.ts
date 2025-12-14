import { Octokit } from '@octokit/rest';
import * as fs from 'fs';
import * as path from 'path';

async function getAccessToken() {
  const hostname = process.env.REPLIT_CONNECTORS_HOSTNAME;
  const xReplitToken = process.env.REPL_IDENTITY 
    ? 'repl ' + process.env.REPL_IDENTITY 
    : process.env.WEB_REPL_RENEWAL 
    ? 'depl ' + process.env.WEB_REPL_RENEWAL 
    : null;

  if (!xReplitToken) {
    throw new Error('X_REPLIT_TOKEN not found');
  }

  const connectionSettings = await fetch(
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

async function updateFile(octokit: Octokit, owner: string, repo: string, filePath: string, content: string, message: string, retries = 3) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    let sha: string | undefined;
    
    try {
      const { data } = await octokit.repos.getContent({
        owner,
        repo,
        path: filePath
      });
      if (!Array.isArray(data)) {
        sha = data.sha;
      }
    } catch (e: any) {
      if (e.status !== 404) throw e;
    }

    try {
      await octokit.repos.createOrUpdateFileContents({
        owner,
        repo,
        path: filePath,
        message,
        content: Buffer.from(content).toString('base64'),
        sha
      });
      
      console.log(`Updated: ${filePath}`);
      return;
    } catch (e: any) {
      if (e.status === 409 && attempt < retries) {
        console.log(`SHA conflict on ${filePath}, retrying (attempt ${attempt + 1})...`);
        await new Promise(r => setTimeout(r, 1000));
        continue;
      }
      throw e;
    }
  }
}

async function updateDocsFolder() {
  const accessToken = await getAccessToken();
  const octokit = new Octokit({ auth: accessToken });
  
  const owner = 'FullStackMaster1';
  const repo = 'fullstackmaster1.github.io';
  
  console.log(`Updating docs in ${owner}/${repo}...`);

  // Read local docs files
  const indexHtml = fs.readFileSync('./docs/index.html', 'utf-8');
  const notFoundHtml = fs.readFileSync('./docs/404.html', 'utf-8');
  
  // Update index.html
  await updateFile(octokit, owner, repo, 'docs/index.html', indexHtml, 'Update index.html with latest changes');
  
  // Update 404.html
  await updateFile(octokit, owner, repo, 'docs/404.html', notFoundHtml, 'Update 404.html with latest changes');
  
  // Update PWA files, SEO files, and root assets
  const pwaFiles = ['sw.js', 'manifest.webmanifest', 'icon-192.png', 'icon-512.png', 'CNAME', 'og-image.png', 'favicon.png', 'apple-touch-icon.png', 'sitemap.xml', 'robots.txt'];
  for (const file of pwaFiles) {
    const filePath = `./docs/${file}`;
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath);
      let sha: string | undefined;
      try {
        const { data } = await octokit.repos.getContent({
          owner,
          repo,
          path: `docs/${file}`
        });
        if (!Array.isArray(data)) {
          sha = data.sha;
        }
      } catch (e: any) {
        if (e.status !== 404) throw e;
      }
      await octokit.repos.createOrUpdateFileContents({
        owner,
        repo,
        path: `docs/${file}`,
        message: `Update PWA file: ${file}`,
        content: content.toString('base64'),
        sha
      });
      console.log(`Updated PWA file: ${file}`);
    }
  }

  // Update icons folder
  const iconsDir = './docs/icons';
  if (fs.existsSync(iconsDir)) {
    const iconFiles = fs.readdirSync(iconsDir);
    for (const file of iconFiles) {
      const filePath = path.join(iconsDir, file);
      const content = fs.readFileSync(filePath);
      let sha: string | undefined;
      try {
        const { data } = await octokit.repos.getContent({
          owner,
          repo,
          path: `docs/icons/${file}`
        });
        if (!Array.isArray(data)) {
          sha = data.sha;
        }
      } catch (e: any) {
        if (e.status !== 404) throw e;
      }
      await octokit.repos.createOrUpdateFileContents({
        owner,
        repo,
        path: `docs/icons/${file}`,
        message: `Update icon: ${file}`,
        content: content.toString('base64'),
        sha
      });
      console.log(`Updated icon: ${file}`);
    }
  }
  
  // Update assets folder
  const assetsDir = './docs/assets';
  if (fs.existsSync(assetsDir)) {
    const assetFiles = fs.readdirSync(assetsDir);
    for (const file of assetFiles) {
      const filePath = path.join(assetsDir, file);
      const content = fs.readFileSync(filePath);
      
      let sha: string | undefined;
      try {
        const { data } = await octokit.repos.getContent({
          owner,
          repo,
          path: `docs/assets/${file}`
        });
        if (!Array.isArray(data)) {
          sha = data.sha;
        }
      } catch (e: any) {
        if (e.status !== 404) throw e;
      }

      await octokit.repos.createOrUpdateFileContents({
        owner,
        repo,
        path: `docs/assets/${file}`,
        message: `Update asset: ${file}`,
        content: content.toString('base64'),
        sha
      });
      console.log(`Updated asset: ${file}`);
    }
  }
  
  console.log('Done! All files updated successfully.');
}

updateDocsFolder().catch(console.error);
