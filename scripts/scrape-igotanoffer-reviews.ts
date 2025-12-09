/**
 * IGotAnOffer Reviews Scraper
 * 
 * This script scrapes reviews from Rupesh Tiwari's IGotAnOffer coach profile
 * and updates the successStories.json file with the latest reviews.
 * 
 * Run with: npx tsx scripts/scrape-igotanoffer-reviews.ts
 */

import axios from 'axios';
import * as cheerio from 'cheerio';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const COACH_PROFILE_URL = 'https://igotanoffer.com/en/coach/rupesh';
const SUCCESS_STORIES_PATH = path.join(__dirname, '../client/src/data/successStories.json');

interface Review {
  id: string;
  name: string;
  initials: string;
  title: string;
  company: string;
  image: string;
  rating: number;
  text: string;
  resultBadge: string;
  sessionType: string;
  verificationLink: string;
  source: string;
  scrapedAt?: string;
}

interface SuccessStoriesData {
  sectionTitle: string;
  sectionSubtitle: string;
  verifiedBadge: string;
  coachProfileUrl: string;
  lastUpdated: string;
  stats: {
    totalReviews: string;
    averageRating: string;
    successRate: string;
  };
  reviews: Review[];
}

async function scrapeReviews(): Promise<void> {
  console.log('🔍 Fetching reviews from IGotAnOffer...');
  console.log(`   URL: ${COACH_PROFILE_URL}`);
  
  try {
    const response = await axios.get(COACH_PROFILE_URL, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
      },
      timeout: 30000,
    });

    const $ = cheerio.load(response.data);
    
    // Extract coach stats from the page
    const statsText = $('body').text();
    const ratingMatch = statsText.match(/(\d+\.?\d*)\s*(?:stars?|⭐)/i);
    const reviewCountMatch = statsText.match(/(\d+)\s*reviews?/i);
    const clientsMatch = statsText.match(/(\d+)\s*clients?/i);
    
    console.log('\n📊 Extracted Stats:');
    console.log(`   Rating: ${ratingMatch ? ratingMatch[1] : 'Not found'}`);
    console.log(`   Reviews: ${reviewCountMatch ? reviewCountMatch[1] : 'Not found'}`);
    console.log(`   Clients: ${clientsMatch ? clientsMatch[1] : 'Not found'}`);

    // Try to find review elements (IGotAnOffer structure may vary)
    const reviews: Review[] = [];
    
    // Look for review containers - IGotAnOffer uses various selectors
    const reviewSelectors = [
      '.review-item',
      '.review-card', 
      '.testimonial',
      '[data-testid="review"]',
      '.client-review',
      'div[class*="review"]',
    ];

    for (const selector of reviewSelectors) {
      $(selector).each((index, element) => {
        const $review = $(element);
        const text = $review.find('p, .review-text, .testimonial-text').first().text().trim();
        const author = $review.find('.author, .reviewer-name, .client-name').first().text().trim();
        
        if (text && text.length > 20) {
          reviews.push({
            id: `igo-scraped-${Date.now()}-${index}`,
            name: author || 'Verified Client',
            initials: author ? author.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) : 'VC',
            title: 'Senior Professional',
            company: 'Verified via IGotAnOffer',
            image: '',
            rating: 5,
            text: text,
            resultBadge: 'Got Offer',
            sessionType: 'Interview Coaching',
            verificationLink: COACH_PROFILE_URL,
            source: 'IGotAnOffer',
            scrapedAt: new Date().toISOString(),
          });
        }
      });
    }

    // Read existing successStories.json
    let existingData: any;
    try {
      existingData = JSON.parse(fs.readFileSync(SUCCESS_STORIES_PATH, 'utf-8'));
    } catch (error) {
      console.log('⚠️  Could not read existing successStories.json');
      existingData = {};
    }

    // Update stats based on scraped data - handle different JSON structures
    if (reviewCountMatch) {
      if (existingData.labels) {
        existingData.labels.ratingText = `• ${reviewCountMatch[1]}+ verified reviews on IGotAnOffer`;
        existingData.labels.viewAllReviews = `Verify All ${reviewCountMatch[1]}+ Reviews`;
      }
    }
    existingData.lastUpdated = new Date().toISOString();
    existingData.sourceLink = COACH_PROFILE_URL;
    if (existingData.verifyBanner) {
      existingData.verifyBanner.link = COACH_PROFILE_URL;
    }

    // If we found new reviews, merge them (avoid duplicates by checking text similarity)
    const existingReviews = existingData.successStories || existingData.reviews || [];
    
    if (reviews.length > 0) {
      console.log(`\n✅ Found ${reviews.length} reviews to add`);
      
      const existingTexts = new Set(existingReviews.map((r: any) => (r.review || r.text || '').toLowerCase().slice(0, 50)));
      const newReviews = reviews.filter(r => !existingTexts.has(r.text.toLowerCase().slice(0, 50)));
      
      if (newReviews.length > 0) {
        if (existingData.successStories) {
          existingData.successStories = [...newReviews.map(r => ({
            id: r.id,
            name: r.name,
            role: r.title,
            company: 'Tech Company',
            companyIcon: 'generic',
            outcome: r.resultBadge,
            review: r.text,
            coachReply: '',
            sessionType: r.sessionType,
            date: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
            rating: r.rating,
            featured: false,
            verified: true,
            verificationSource: 'IGotAnOffer',
            verificationLink: COACH_PROFILE_URL,
          })), ...existingData.successStories];
        }
        console.log(`   Added ${newReviews.length} new unique reviews`);
      } else {
        console.log('   No new unique reviews found');
      }
    } else {
      console.log('\n⚠️  Could not automatically extract reviews from page HTML');
      console.log('   The page may use JavaScript rendering or have changed structure');
      console.log('   Updating stats only...');
    }

    // Save updated data
    fs.writeFileSync(SUCCESS_STORIES_PATH, JSON.stringify(existingData, null, 2));
    const totalReviews = (existingData.successStories || existingData.reviews || []).length;
    console.log(`\n💾 Updated ${SUCCESS_STORIES_PATH}`);
    console.log(`   Total reviews in file: ${totalReviews}`);
    console.log(`   Last updated: ${existingData.lastUpdated}`);

    // Also output the raw HTML structure for debugging
    console.log('\n📝 Page structure hints (for debugging):');
    const bodyClasses = $('body').attr('class') || 'none';
    console.log(`   Body classes: ${bodyClasses}`);
    
    // Find any elements that might contain reviews
    const potentialContainers = $('[class*="review"], [class*="testimonial"], [class*="feedback"]');
    console.log(`   Potential review containers found: ${potentialContainers.length}`);

  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(`\n❌ HTTP Error: ${error.response?.status || 'Unknown'}`);
      console.error(`   Message: ${error.message}`);
      if (error.response?.status === 403) {
        console.error('   Note: The site may be blocking automated requests');
      }
    } else {
      console.error('\n❌ Error scraping reviews:', error);
    }
    process.exit(1);
  }
}

// Run the scraper
scrapeReviews().then(() => {
  console.log('\n✨ Scraping complete!');
  console.log('   Run "npx tsx scripts/github-update.ts" to deploy changes');
}).catch(console.error);
