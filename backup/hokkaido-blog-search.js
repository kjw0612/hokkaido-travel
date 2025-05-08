// hokkaido-blog-search.js
import { chromium } from 'playwright';

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

async function searchBlogPostsForTopic(page, topic) {
  console.log(`\n\n==== Searching for: ${topic.name} ====`);
  console.log(topic.description);
  
  // Navigate to Naver search
  await page.goto('https://search.naver.com/search.naver');
  
  // Type search query
  await page.fill('input[name="query"]', topic.query + ' 블로그');
  
  // Click search button
  await page.click('button.btn_search');
  
  // Wait for search results to load
  await page.waitForSelector('.total_wrap');
  
  // Add view option for blogs
  try {
    // Try to click on the blog filter if it exists
    await page.click('a.filter[aria-label="블로그"]', { timeout: 5000 });
    await page.waitForTimeout(1000);
  } catch (e) {
    console.log('Blog filter not found, continuing with general results...');
  }
  
  // Extract blog links (looking for more than we need, as some may be filtered out)
  const blogLinks = await page.evaluate(() => {
    const links = [];
    const titles = [];
    const dates = [];
    const descriptions = [];

    // Get blog titles and links
    document.querySelectorAll('.total_area').forEach((item, index) => {
      // Get the title and link
      const titleElement = item.querySelector('.title_link');
      if (!titleElement) return;
      
      // Get the link URL
      const link = titleElement.href;
      if (!link) return;
      
      // Get the title text
      const title = titleElement.textContent.trim();
      if (!title) return;
      
      // Try to get the date
      let date = '';
      const infoElement = item.querySelector('.sub_txt.sub_name') || item.querySelector('.info');
      if (infoElement) {
        const dateText = infoElement.textContent;
        if (dateText) {
          // Extract date with regex (looking for patterns like "2023.05.24." or "1일 전")
          const dateMatch = dateText.match(/\d{4}\.\d{2}\.\d{2}\.?/) || dateText.match(/\d+[일|시간|분] 전/);
          if (dateMatch) {
            date = dateMatch[0];
          }
        }
      }
      
      // Try to get the description
      let description = '';
      const descElement = item.querySelector('.dsc_txt') || item.querySelector('.total_group');
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
  
  for (let i = 0; i < Math.min(blogLinks.links.length, 8); i++) {
    const url = blogLinks.links[i];
    const title = blogLinks.titles[i];
    const date = blogLinks.dates[i];
    const description = blogLinks.descriptions[i];
    
    if (!isKoreanBlogLink(url)) {
      console.log(`Skipping non-blog link: ${url}`);
      continue;
    }
    
    try {
      // Visit the link to validate it
      console.log(`Checking link ${i+1}: ${title}`);
      await page.goto(url, { timeout: 30000 });
      
      // Wait for the page to load
      await page.waitForLoadState('load');
      
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
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();
  
  // Results object
  const results = {};
  
  try {
    // Search for each topic
    for (const topic of searchTopics) {
      const blogLinks = await searchBlogPostsForTopic(page, topic);
      results[topic.name] = blogLinks;
    }
    
    // Print final results in a nicely formatted way
    console.log('\n\n=========== FINAL RESULTS ===========\n');
    
    for (const topic in results) {
      console.log(`\n== ${topic} ==\n`);
      
      if (results[topic].length === 0) {
        console.log('No valid blog posts found for this topic.');
        continue;
      }
      
      results[topic].forEach((link, i) => {
        console.log(`${i+1}. ${link.title}`);
        console.log(`   URL: ${link.url}`);
        if (link.date) console.log(`   Date: ${link.date}`);
        console.log('');
      });
    }
  } catch (error) {
    console.error('Error during search:', error);
  } finally {
    // Save results to a file
    const fs = await import('fs');
    fs.writeFileSync(
      'hokkaido-blog-results.json', 
      JSON.stringify(results, null, 2), 
      'utf8'
    );
    console.log('\nResults saved to hokkaido-blog-results.json');
    
    // Close browser
    await browser.close();
  }
}

main().catch(console.error);