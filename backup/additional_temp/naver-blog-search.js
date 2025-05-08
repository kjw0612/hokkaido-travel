const { chromium } = require('playwright');

// Search parameters
const searchQuery = '삿포로 도시 정보 블로그 최신'; // Korean search query for "Sapporo city information blog recent"
const keywordsToLookFor = [
  '삿포로 도시', // Sapporo city
  '삿포로 가이드', // Sapporo guide
  '삿포로 그리드', // Sapporo grid
  '삿포로 구조', // Sapporo structure
  '삿포로 시내', // Sapporo downtown
  '삿포로 정보', // Sapporo information
  '삿포로 관광', // Sapporo tourism
  '삿포로 지도', // Sapporo map
  '홋카이도 여행', // Hokkaido travel
  '삿포로 추천', // Sapporo recommendations
  '삿포로 시내 지도', // Sapporo city map
  '삿포로 교통', // Sapporo transportation
  '삿포로 숙소' // Sapporo accommodation
];

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();
  
  console.log('Starting Naver blog search for:', searchQuery);
  
  try {
    // Navigate to Naver
    await page.goto('https://www.naver.com/');
    console.log('Navigated to Naver homepage');
    
    // Enter search query and submit
    await page.fill('input[name="query"]', searchQuery);
    await page.press('input[name="query"]', 'Enter');
    console.log('Submitted search query');
    
    // Wait for search results to load
    await page.waitForLoadState('networkidle');
    
    // Click on the "Blog" tab to see blog results
    await page.locator('a:has-text("블로그")').first().click();
    console.log('Switched to Blog tab');
    await page.waitForLoadState('networkidle');
    
    // Collect blog posts (title, URL, and description)
    console.log('Collecting blog posts...');
    const blogPosts = await page.evaluate((keywordsToLookFor) => {
      const posts = [];
      const blogItems = document.querySelectorAll('.total_area');
      
      for (const item of blogItems) {
        try {
          const titleElement = item.querySelector('.title_link');
          const title = titleElement ? titleElement.textContent.trim() : '';
          const url = titleElement ? titleElement.href : '';
          const descriptionElement = item.querySelector('.dsc_txt');
          const description = descriptionElement ? descriptionElement.textContent.trim() : '';
          const dateElement = item.querySelector('.sub_time');
          const date = dateElement ? dateElement.textContent.trim() : '';
          
          // Check if the post mentions any of our target keywords
          const contentText = (title + ' ' + description).toLowerCase();
          const mentionedKeywords = keywordsToLookFor.filter(keyword => 
            contentText.includes(keyword.toLowerCase())
          );
          
          posts.push({
            title,
            url,
            description,
            date,
            mentionedKeywords,
            keywordCount: mentionedKeywords.length
          });
        } catch (error) {
          console.error('Error parsing blog item:', error);
        }
      }
      
      return posts;
    }, keywordsToLookFor);
    
    console.log(`Found ${blogPosts.length} blog posts`);
    
    // Print and save the results
    console.log('\nResults:');
    const topResults = blogPosts.filter(post => post.keywordCount > 0)
                               .sort((a, b) => b.keywordCount - a.keywordCount)
                               .slice(0, 15);
    
    console.log(JSON.stringify(topResults, null, 2));
    
    // Format results as Markdown for easy reading
    let markdown = '# 삿포로 도시 정보 관련 블로그 포스트\n\n';
    topResults.forEach((post, index) => {
      markdown += `## ${index + 1}. ${post.title}\n`;
      markdown += `- **URL:** ${post.url}\n`;
      markdown += `- **날짜:** ${post.date}\n`;
      markdown += `- **관련 키워드:** ${post.mentionedKeywords.join(', ')}\n`;
      markdown += `- **키워드 수:** ${post.keywordCount}\n`;
      markdown += `- **설명:** ${post.description}\n\n`;
    });
    
    // Save markdown to file
    const fs = require('fs');
    fs.writeFileSync('sapporo-city-info-blogs.md', markdown);
    console.log('Results saved to sapporo-city-info-blogs.md');
    
    console.log('Search completed successfully');
    return { blogPosts: topResults, markdown };
    
  } catch (error) {
    console.error('An error occurred during the search:', error);
  } finally {
    await context.close();
    await browser.close();
  }
})();