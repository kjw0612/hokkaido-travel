// hokkaido-travel-planner-fixed.js
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
    query: '삿포로 격자형 도시 구조 설계',
    description: 'About Sapporo\'s unique grid layout'
  },
  {
    name: '아이누족 문화 (Ainu culture)',
    query: '홋카이도 아이누족 문화 역사',
    description: 'About Ainu people and their culture in Hokkaido'
  },
  {
    name: '홋카이도 온천 (Hokkaido onsen)',
    query: '홋카이도 유명 온천 추천',
    description: 'About hot springs in Hokkaido'
  },
  {
    name: '홋카이도 음식 문화 (Hokkaido food culture)',
    query: '홋카이도 대표 음식 문화 요리',
    description: 'About food culture in Hokkaido'
  },
  {
    name: '삿포로 눈축제 (Sapporo Snow Festival)',
    query: '삿포로 눈축제 일정 볼거리',
    description: 'About Sapporo Snow Festival'
  },
  {
    name: '삿포로 맥주 (Sapporo Beer)',
    query: '삿포로 맥주 역사 공장 견학',
    description: 'About Sapporo Beer'
  }
];

// Function to check if link is from a Korean blog platform
function isKoreanBlogLink(url) {
  const koreanBlogPlatforms = [
    'blog.naver.com',
    '.tistory.com',
    'brunch.co.kr',
    'velog.io',
    'blog.daum.net',
    'medium.com',
    '.egloos.com',
    'postype.com'
  ];
  
  return koreanBlogPlatforms.some(platform => url.includes(platform));
}

// Extract year from date string
function extractYear(dateStr) {
  if (!dateStr) return null;
  
  // Try to extract a year from date formats like "2023.05.24" or just "2023"
  const yearMatch = dateStr.match(/\b(20\d{2})\b/);
  if (yearMatch) {
    return parseInt(yearMatch[1]);
  }
  
  // If it's something like "1일 전" (1 day ago), "2주 전" (2 weeks ago), etc., consider it recent
  if (dateStr.includes('일 전') || dateStr.includes('시간 전') || 
      dateStr.includes('분 전') || dateStr.includes('초 전') ||
      dateStr.includes('주 전') && parseInt(dateStr) < 12) {
    return new Date().getFullYear();
  }
  
  // If it's something like "1개월 전" (1 month ago) and less than 12, consider it from this year
  if (dateStr.includes('개월 전')) {
    const months = parseInt(dateStr);
    if (!isNaN(months) && months < 12) {
      return new Date().getFullYear();
    }
  }
  
  return null;
}

async function searchBlogPostsForTopic(page, topic) {
  console.log(`\n\n==== Searching for: ${topic.name} ====`);
  console.log(topic.description);
  
  // Navigate to Naver search
  await page.goto('https://search.naver.com/', { timeout: 60000 });
  
  // Wait for the search input to be visible and type the search query
  await page.waitForSelector('input#query', { timeout: 10000 });
  await page.fill('input#query', topic.query + ' 블로그');
  
  // Press Enter to search
  await page.press('input#query', 'Enter');
  
  // Wait for search results to load
  await page.waitForSelector('.main_pack', { timeout: 30000 });
  
  // Look for blog section
  try {
    const blogSection = page.locator('.section_type.section_blog');
    if (await blogSection.isVisible()) {
      // If there's a "view more" button for blogs, click it
      const viewMoreButton = blogSection.locator('.api_more_wrap .btn_view');
      if (await viewMoreButton.isVisible()) {
        await viewMoreButton.click();
        await page.waitForNavigation();
      }
    } else {
      // Try clicking on "blog" in the filters if visible
      const blogFilterBtn = page.locator('a.filter[aria-label="블로그"]');
      if (await blogFilterBtn.isVisible()) {
        await blogFilterBtn.click();
        await page.waitForNavigation({ timeout: 30000 });
      }
    }
  } catch (e) {
    console.log(`Blog filter navigation error: ${e.message}`);
    // Continue anyway
  }
  
  // Wait a bit for the page to stabilize
  await page.waitForTimeout(2000);
  
  // Extract blog links
  const blogLinks = await page.evaluate(() => {
    const links = [];
    const titles = [];
    const dates = [];
    const descriptions = [];

    // Try different selectors for blog results
    const resultItems = document.querySelectorAll('li.bx._svp_item') || 
                        document.querySelectorAll('.total_wrap') ||
                        document.querySelectorAll('.api_txt_lines');
    
    resultItems.forEach((item) => {
      // Get the title and link (try different possible selectors)
      const titleElement = item.querySelector('.title_link') || 
                          item.querySelector('.api_txt_lines') ||
                          item.querySelector('.total_tit a') ||
                          item.querySelector('a[href^="https://blog"]');
      
      if (!titleElement) return;
      
      // Get the link URL
      let link = titleElement.href;
      if (!link) return;
      
      // Skip shopping results
      if (link.includes('shopping.naver.com')) return;
      
      // Get the title text
      const title = titleElement.textContent.trim();
      if (!title) return;
      
      // Try to get the date (try different possible selectors)
      let date = '';
      const infoElement = item.querySelector('.sub_txt.sub_name') || 
                          item.querySelector('.info') ||
                          item.querySelector('.etc_box') ||
                          item.querySelector('.sub_info');
                          
      if (infoElement) {
        const dateText = infoElement.textContent;
        if (dateText) {
          // Extract date with regex (looking for patterns like "2023.05.24." or "1일 전")
          const dateMatch = dateText.match(/\d{4}\.\d{2}\.\d{2}\.?/) || 
                            dateText.match(/\d+[일|시간|분|주|개월] 전/);
          if (dateMatch) {
            date = dateMatch[0];
          }
        }
      }
      
      // Try to get the description
      let description = '';
      const descElement = item.querySelector('.dsc_txt') || 
                          item.querySelector('.api_txt_lines.dsc_txt') ||
                          item.querySelector('.total_group') ||
                          item.querySelector('.api_txt_lines.sub_desc');
                          
      if (descElement) {
        description = descElement.textContent.trim();
      }
      
      links.push(link);
      titles.push(title);
      dates.push(date);
      descriptions.push(description);
    });

    return { links, titles, dates, descriptions };
  });
  
  console.log(`Found ${blogLinks.links.length} potential blog posts`);
  
  // Filter and validate blog links
  const validatedLinks = [];
  const currentYear = new Date().getFullYear();
  
  for (let i = 0; i < Math.min(blogLinks.links.length, 10); i++) {
    const url = blogLinks.links[i];
    const title = blogLinks.titles[i];
    const date = blogLinks.dates[i];
    const description = blogLinks.descriptions[i];
    
    if (!url || !isKoreanBlogLink(url)) {
      console.log(`Skipping non-blog link: ${url}`);
      continue;
    }
    
    // Check if it's recent content (within 3 years) based on the date
    const year = extractYear(date);
    if (year && (currentYear - year > 3)) {
      console.log(`Skipping older content from ${year}: ${title}`);
      continue;
    }
    
    try {
      // Visit the link to validate it
      console.log(`Checking link ${i+1}: ${title}`);
      await page.goto(url, { timeout: 30000 }).catch(e => {
        throw new Error(`Navigation timeout: ${e.message}`);
      });
      
      // Wait for the page to load
      await page.waitForLoadState('domcontentloaded').catch(() => {
        console.log('  - Page load state timed out, continuing anyway');
      });
      
      // Slight delay to ensure content loads
      await page.waitForTimeout(2000);
      
      // Check if the page has Korean text
      const hasKoreanText = await page.evaluate(() => {
        const bodyText = document.body.innerText;
        // Regular expression to match Korean characters
        const koreanRegex = /[\uAC00-\uD7AF\u1100-\u11FF\u3130-\u318F\uA960-\uA97F\uD7B0-\uD7FF]/;
        return koreanRegex.test(bodyText);
      });
      
      if (!hasKoreanText) {
        console.log('  - Skipping: No Korean text found');
        continue;
      }
      
      // Check if the content is relevant to the topic
      const isRelevant = await page.evaluate((topicQuery) => {
        const bodyText = document.body.innerText;
        const queryTerms = topicQuery.split(' ');
        
        // Check if at least 2 terms from our query appear in the content
        const matchedTerms = queryTerms.filter(term => bodyText.includes(term));
        return matchedTerms.length >= 2;
      }, topic.query);
      
      if (!isRelevant) {
        console.log('  - Skipping: Content not relevant enough to the topic');
        continue;
      }
      
      // Check if it has a substantial amount of content
      const hasSubstantialContent = await page.evaluate(() => {
        const textContent = document.body.innerText;
        // Consider substantial if it has over 1000 characters
        return textContent.length > 1000;
      });
      
      if (!hasSubstantialContent) {
        console.log('  - Skipping: Content is too brief');
        continue;
      }
      
      validatedLinks.push({
        url,
        title,
        date,
        description
      });
      
      console.log(`  - Valid link: ${title} (${date})`);
      
      // Stop if we have enough links
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
    slowMo: 100
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
        const blogLinks = await searchBlogPostsForTopic(page, topic);
        results[topic.name] = blogLinks;
        
        // Save results after each topic (in case of errors later)
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
    
    // Print final results in a structured format
    let markdownResults = '# Hokkaido Korean Blog Resources\n\n';
    
    for (const topic in results) {
      markdownResults += `## ${topic}\n\n`;
      
      if (results[topic].length === 0) {
        markdownResults += 'No valid blog posts found for this topic.\n\n';
        continue;
      }
      
      results[topic].forEach((link, i) => {
        markdownResults += `${i+1}. [${link.title}](${link.url})\n`;
        if (link.date) markdownResults += `   - Date: ${link.date}\n`;
        if (link.description) markdownResults += `   - ${link.description}\n`;
        markdownResults += '\n';
      });
    }
    
    // Save the markdown results
    await fs.writeFile('hokkaido-blog-results.md', markdownResults, 'utf8');
    console.log('\nResults saved to hokkaido-blog-results.md');
    
    // Save the JSON results
    await fs.writeFile(
      'hokkaido-blog-results.json', 
      JSON.stringify(results, null, 2), 
      'utf8'
    );
    console.log('Results saved to hokkaido-blog-results.json');
    
    // Print a summary of the results
    console.log('\n\n=========== RESULTS SUMMARY ===========\n');
    for (const topic in results) {
      console.log(`${topic}: ${results[topic].length} validated blog posts`);
    }
    
  } catch (error) {
    console.error('Error during search:', error);
  } finally {
    // Close browser
    await browser.close();
  }
}

main().catch(console.error);