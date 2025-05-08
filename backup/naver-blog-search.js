// naver-blog-search.js
import { chromium } from 'playwright';
import fs from 'fs/promises';

const searchTopics = [
  {
    name: '홋카이도 미국 영향 (Hokkaido US influence)',
    query: '홋카이도 미국 영향 역사',
    description: 'History of American influence on Hokkaido development'
  },
  {
    name: '삿포로 격자형 도시 (Sapporo grid city)',
    query: '삿포로 격자형 도시 구조',
    description: 'About Sapporo\'s unique grid layout'
  },
  {
    name: '아이누족 문화 (Ainu culture)',
    query: '홋카이도 아이누족 문화',
    description: 'About Ainu people and their culture in Hokkaido'
  },
  {
    name: '홋카이도 온천 (Hokkaido onsen)',
    query: '홋카이도 온천 추천',
    description: 'About hot springs in Hokkaido'
  },
  {
    name: '홋카이도 음식 문화 (Hokkaido food culture)',
    query: '홋카이도 음식 문화',
    description: 'About food culture in Hokkaido'
  },
  {
    name: '삿포로 눈축제 (Sapporo Snow Festival)',
    query: '삿포로 눈축제',
    description: 'About Sapporo Snow Festival'
  },
  {
    name: '삿포로 맥주 (Sapporo Beer)',
    query: '삿포로 맥주 역사',
    description: 'About Sapporo Beer'
  }
];

// Extract year from date string
function extractYear(dateStr) {
  if (!dateStr) return null;
  
  // Try to extract a year from date formats like "2023.05.24" or just "2023"
  const yearMatch = dateStr.match(/\b(20\d{2})\b/);
  if (yearMatch) {
    return parseInt(yearMatch[1]);
  }
  
  return null;
}

async function searchNaverBlog(page, topic) {
  console.log(`\n\n==== Searching for: ${topic.name} ====`);
  console.log(topic.description);
  
  // Navigate directly to Naver Blog search
  await page.goto(`https://search.naver.com/search.naver?where=blog&query=${encodeURIComponent(topic.query)}`, { timeout: 60000 });
  
  // Wait for search results to load
  await page.waitForSelector('.api_txt_lines.total_tit', { timeout: 30000 });
  
  // Wait a bit for any dynamic content to load
  await page.waitForTimeout(2000);
  
  // Extract blog links
  const blogLinks = await page.evaluate(() => {
    const results = [];
    
    // Get all blog post cards
    const blogCards = document.querySelectorAll('.api_txt_lines.total_tit');
    
    blogCards.forEach((card) => {
      try {
        // Get the link and title
        if (!card.href || !card.textContent) return;
        
        const url = card.href;
        const title = card.textContent.trim();
        
        // Find the parent container to extract more information
        const container = card.closest('.total_wrap');
        if (!container) return;
        
        // Extract date
        let date = '';
        const dateElem = container.querySelector('.sub_time, .sub_txt');
        if (dateElem) {
          date = dateElem.textContent.trim();
        }
        
        // Extract description
        let description = '';
        const descElem = container.querySelector('.api_txt_lines.dsc_txt');
        if (descElem) {
          description = descElem.textContent.trim();
        }
        
        // Extract author/blog name
        let author = '';
        const authorElem = container.querySelector('.sub_txt.sub_name');
        if (authorElem) {
          author = authorElem.textContent.trim();
        }
        
        results.push({
          url,
          title,
          date,
          description,
          author
        });
      } catch (e) {
        // Skip if any errors occur for this item
      }
    });
    
    return results;
  });
  
  console.log(`Found ${blogLinks.length} blog posts`);
  
  // Validate each blog post
  const validatedLinks = [];
  const currentYear = new Date().getFullYear();
  const minPostLength = 500; // Minimum text length to consider it detailed content
  
  for (let i = 0; i < Math.min(blogLinks.length, 8); i++) {
    const link = blogLinks[i];
    
    // Check if it's recent content (within 3 years) based on the date
    const year = extractYear(link.date);
    if (year && (currentYear - year > 3)) {
      console.log(`Skipping older content from ${year}: ${link.title}`);
      continue;
    }
    
    try {
      console.log(`Checking link ${i+1}: ${link.title}`);
      
      // Visit the blog post
      await page.goto(link.url, { timeout: 30000 }).catch(e => {
        throw new Error(`Navigation timeout: ${e.message}`);
      });
      
      // Wait for the page to load
      await page.waitForLoadState('domcontentloaded').catch(() => {
        console.log('  - Page load state timed out, continuing anyway');
      });
      
      // Wait a bit for any dynamic content
      await page.waitForTimeout(2000);
      
      // Check if it has Korean content
      const hasKoreanContent = await page.evaluate(() => {
        const textContent = document.body.innerText;
        const koreanRegex = /[\uAC00-\uD7AF\u1100-\u11FF\u3130-\u318F\uA960-\uA97F\uD7B0-\uD7FF]/;
        return koreanRegex.test(textContent);
      });
      
      if (!hasKoreanContent) {
        console.log('  - Skipping: No Korean content found');
        continue;
      }
      
      // Check content length and relevance
      const contentStats = await page.evaluate((searchTerms) => {
        const textContent = document.body.innerText;
        
        // Calculate content length
        const contentLength = textContent.length;
        
        // Check relevance to search terms
        const terms = searchTerms.split(' ');
        const matchedTerms = terms.filter(term => textContent.includes(term));
        const relevanceScore = matchedTerms.length / terms.length;
        
        return {
          contentLength,
          relevanceScore,
          matchedTerms: matchedTerms.length
        };
      }, topic.query);
      
      if (contentStats.contentLength < minPostLength) {
        console.log('  - Skipping: Not enough detailed content');
        continue;
      }
      
      if (contentStats.matchedTerms < 2) {
        console.log('  - Skipping: Not relevant enough to the topic');
        continue;
      }
      
      console.log(`  - Valid link: ${link.title} (Length: ${contentStats.contentLength}, Matches: ${contentStats.matchedTerms})`);
      
      validatedLinks.push({
        url: link.url,
        title: link.title,
        date: link.date,
        description: link.description,
        author: link.author,
        contentStats: {
          length: contentStats.contentLength,
          relevanceScore: contentStats.relevanceScore
        }
      });
      
      // Break once we have 3 valid links
      if (validatedLinks.length >= 3) {
        break;
      }
    } catch (e) {
      console.log(`  - Error validating link: ${e.message}`);
    }
  }
  
  console.log(`\nValidated ${validatedLinks.length} blog links for topic: ${topic.name}`);
  return validatedLinks;
}

async function main() {
  // Launch browser
  const browser = await chromium.launch({ 
    headless: false,
    slowMo: 50
  });
  
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36',
    viewport: { width: 1280, height: 800 }
  });
  
  const page = await context.newPage();
  
  // Results object
  const results = {};
  
  try {
    // Search for each topic
    for (const topic of searchTopics) {
      try {
        const blogLinks = await searchNaverBlog(page, topic);
        results[topic.name] = blogLinks;
        
        // Save interim results after each topic
        await fs.writeFile(
          'hokkaido-blog-results-partial.json', 
          JSON.stringify(results, null, 2), 
          'utf8'
        );
      } catch (topicError) {
        console.error(`Error processing topic "${topic.name}":`, topicError);
        results[topic.name] = [];
      }
      
      // Wait between topics to avoid rate limiting
      await page.waitForTimeout(3000);
    }
    
    // Generate markdown result
    let markdown = `# 홋카이도 관련 한국어 블로그 정보\n\n`;
    markdown += `*검색일: ${new Date().toISOString().split('T')[0]}*\n\n`;
    
    for (const topicName in results) {
      const links = results[topicName];
      
      markdown += `## ${topicName}\n\n`;
      
      if (links.length === 0) {
        markdown += `*해당 주제에 대한 적합한 블로그를 찾지 못했습니다.*\n\n`;
        continue;
      }
      
      links.forEach((link, index) => {
        markdown += `### ${index + 1}. [${link.title}](${link.url})\n\n`;
        
        if (link.author) {
          markdown += `- **작성자**: ${link.author}\n`;
        }
        
        if (link.date) {
          markdown += `- **작성일**: ${link.date}\n`;
        }
        
        if (link.description) {
          markdown += `- **요약**: ${link.description}\n`;
        }
        
        markdown += `\n`;
      });
    }
    
    // Save results
    await fs.writeFile('hokkaido-blog-results.md', markdown, 'utf8');
    await fs.writeFile('hokkaido-blog-results.json', JSON.stringify(results, null, 2), 'utf8');
    
    console.log('\n\n=========== RESULTS SUMMARY ===========\n');
    for (const topic in results) {
      console.log(`${topic}: ${results[topic].length} validated blog posts`);
    }
    
    console.log('\nResults saved to hokkaido-blog-results.md and hokkaido-blog-results.json');
    
  } catch (error) {
    console.error('Error during search process:', error);
  } finally {
    // Close browser
    await browser.close();
  }
}

main().catch(console.error);