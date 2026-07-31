#!/usr/bin/env python3
"""
VentureBeat AI Scraper - Dynamic Web Scraper with Playwright
Handles infinite scrolling and dynamic content loading
"""

import asyncio
import json
import hashlib
from datetime import datetime
from typing import List, Dict, Optional
from playwright.async_api import async_playwright, TimeoutError as PlaywrightTimeoutError

# ============================================
# CONFIGURATION
# ============================================

VENTUREBEAT_URL = "https://venturebeat.com/category/ai/"
MAX_ARTICLES = 20
MAX_SCROLL_ATTEMPTS = 30  # Safety limit for infinite scroll
OUTPUT_FILE = "venturebeat_articles.json"

# ============================================
# SCRAPER CLASS
# ============================================

class VentureBeatScraper:
    """
    VentureBeat AI category scraper using Playwright.
    Handles dynamic content, infinite scroll, and generous timeouts.
    """
    
    def __init__(self, headless: bool = True):
        self.headless = headless
        self.articles = []
        self.article_urls = set()  # For deduplication
        
    async def _init_browser(self):
        """Initialize Playwright browser with generous settings."""
        self.playwright = await async_playwright().start()
        
        self.browser = await self.playwright.chromium.launch(
            headless=self.headless,
            args=[
                '--no-sandbox',
                '--disable-dev-shm-usage',
                '--disable-gpu',
                '--disable-setuid-sandbox',
                '--disable-blink-features=AutomationControlled'
            ]
        )
        
        self.context = await self.browser.new_context(
            user_agent='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            viewport={'width': 1920, 'height': 1080},
            locale='en-US',
            java_script_enabled=True,
            bypass_csp=True
        )
        
        self.page = await self.context.new_page()
        
        # Set generous timeouts
        self.page.set_default_timeout(60000)  # 60 seconds
        
        # Add stealth to avoid detection
        await self.page.add_init_script("""
            Object.defineProperty(navigator, 'webdriver', {
                get: () => undefined
            });
        """)
        
        print("✅ Browser initialized")
    
    async def _close_browser(self):
        """Clean up browser resources."""
        try:
            if self.browser:
                await self.browser.close()
            if self.playwright:
                await self.playwright.stop()
            print("🔚 Browser closed")
        except Exception as e:
            print(f"⚠️ Error closing browser: {e}")
    
    async def _scroll_to_load(self, max_attempts: int = MAX_SCROLL_ATTEMPTS) -> int:
        """
        Handle infinite scrolling by repeatedly scrolling down.
        Returns the number of scroll attempts made.
        """
        print("📜 Starting infinite scroll handling...")
        
        scroll_attempts = 0
        last_height = await self.page.evaluate('document.body.scrollHeight')
        
        while scroll_attempts < max_attempts:
            # Scroll to bottom
            await self.page.evaluate('window.scrollTo(0, document.body.scrollHeight)')
            await self.page.wait_for_timeout(3000)  # Wait for content to load
            
            # Check new height
            new_height = await self.page.evaluate('document.body.scrollHeight')
            
            # Count articles after scroll
            article_count = await self.page.query_selector_all('article.flex.flex-col.gap-12.lg\\:flex-row')
            print(f"   📊 Scrolled {scroll_attempts + 1}: Found {len(article_count)} articles so far")
            
            # Break if no new content loaded
            if new_height == last_height:
                print("   ✅ No more content loading - scroll complete")
                break
            
            # Break if we have enough articles
            if len(article_count) >= MAX_ARTICLES:
                print(f"   🎯 Reached target of {MAX_ARTICLES} articles")
                break
            
            last_height = new_height
            scroll_attempts += 1
        
        print(f"✅ Completed {scroll_attempts + 1} scroll attempts")
        return scroll_attempts
    
    async def scrape_articles(self, max_articles: int = MAX_ARTICLES) -> List[Dict]:
        """
        Main scraping method for VentureBeat AI articles.
        """
        print("=" * 60)
        print("🤖 VentureBeat AI Scraper (Playwright)")
        print(f"📡 Target: {VENTUREBEAT_URL}")
        print(f"📑 Max articles: {max_articles}")
        print("=" * 60)
        
        try:
            # Initialize browser
            await self._init_browser()
            
            # Navigate to page with generous timeout
            print(f"\n📄 Navigating to {VENTUREBEAT_URL}...")
            try:
                await self.page.goto(
                    VENTUREBEAT_URL, 
                    wait_until='domcontentloaded', 
                    timeout=60000
                )
            except PlaywrightTimeoutError:
                print("   ⏳ Initial load timeout, proceeding anyway...")
            
            # Wait for content to appear
            print("   ⏳ Waiting for content to load...")
            try:
                await self.page.wait_for_selector(
                    'article.flex.flex-col.gap-12.lg\\:flex-row',
                    timeout=30000
                )
            except PlaywrightTimeoutError:
                print("   ⚠️ Article selector timeout - content may be slow to load")
            
            # Give extra time for JavaScript to render
            await self.page.wait_for_timeout(5000)
            
            # Handle infinite scrolling
            await self._scroll_to_load()
            
            # Extract articles
            print(f"\n📝 Extracting articles...")
            articles = await self._extract_articles(max_articles)
            
            print(f"\n✅ Successfully extracted {len(articles)} articles")
            return articles
            
        except Exception as e:
            print(f"❌ Error during scraping: {e}")
            return []
        finally:
            await self._close_browser()
    
    async def _extract_articles(self, max_articles: int) -> List[Dict]:
        """Extract article data from the page."""
        articles = []
        
        # Get all article containers
        article_containers = await self.page.query_selector_all(
            'article.flex.flex-col.gap-12.lg\\:flex-row'
        )
        
        print(f"   Found {len(article_containers)} article containers")
        
        for idx, container in enumerate(article_containers[:max_articles]):
            try:
                article_data = await self._extract_single_article(container)
                if article_data:
                    articles.append(article_data)
                    print(f"   ✅ [{idx + 1}] {article_data['title'][:60]}...")
            except Exception as e:
                print(f"   ⚠️ Error extracting article {idx + 1}: {e}")
        
        return articles
    
    async def _extract_single_article(self, container) -> Optional[Dict]:
        """Extract data from a single article container."""
        try:
            # Extract title
            title_link = await container.query_selector('a[href^="/technology/"]')
            if not title_link:
                # Try alternative selector
                title_link = await container.query_selector('a[href*="/"]')
            
            if not title_link:
                return None
                
            title = await title_link.text_content()
            href = await title_link.get_attribute('href')
            
            if not title or not href:
                return None
                
            # Clean title
            title = title.strip()
            
            # Build full URL
            if href.startswith('/'):
                url = f"https://venturebeat.com{href}"
            else:
                url = href
            
            # Extract author
            author_link = await container.query_selector('a[rel="author"]')
            author = await author_link.text_content() if author_link else "Unknown"
            author = author.strip() if author else "Unknown"
            
            # Extract date
            date_span = await container.query_selector('span')
            date = await date_span.text_content() if date_span else None
            if date:
                date = date.strip()
            else:
                date = datetime.now().strftime("%B %d, %Y")
            
            # Extract content paragraphs
            paragraphs = await container.query_selector_all('p')
            content_parts = []
            for p in paragraphs:
                text = await p.text_content()
                if text and text.strip():
                    content_parts.append(text.strip())
            
            content = ' '.join(content_parts)
            
            # Extract headings (h2) as section titles
            headings = await container.query_selector_all('h2')
            heading_texts = [await h.text_content() for h in headings if await h.text_content()]
            
            # If no paragraphs, try getting all text
            if not content:
                content = await container.text_content()
                content = ' '.join(content.split()) if content else ''
            
            # Generate hash
            hash_id = hashlib.md5(url.encode()).hexdigest()[:8]
            
            return {
                'title': title,
                'author': author,
                'date': date,
                'content': content[:8000],  # Limit content length
                'url': url,
                'source_name': 'VentureBeat',
                'source_type': 'blog',
                'word_count': len(content.split()),
                'hash': hash_id,
                'headings': heading_texts,
                'timestamp': datetime.now().isoformat()
            }
            
        except Exception as e:
            print(f"      ⚠️ Error extracting article: {e}")
            return None
    
    async def scrape_article_full(self, url: str) -> Optional[Dict]:
        """
        Scrape a single VentureBeat article in full detail.
        """
        try:
            print(f"   📄 Scraping full article: {url}")
            
            await self.page.goto(url, wait_until='domcontentloaded', timeout=60000)
            await self.page.wait_for_timeout(2000)
            
            # Extract title
            title_elem = await self.page.query_selector('h1')
            title = await title_elem.text_content() if title_elem else "No Title"
            
            # Extract author
            author_elem = await self.page.query_selector('a[rel="author"]')
            author = await author_elem.text_content() if author_elem else "Unknown"
            
            # Extract date
            date_elem = await self.page.query_selector('time, .date, .pub-date')
            if date_elem:
                date = await date_elem.text_content()
                date = date.strip() if date else None
            else:
                date = None
            
            # Extract content
            content_parts = []
            content_elem = await self.page.query_selector('.entry-content, .article-content, .post-content')
            if content_elem:
                paragraphs = await content_elem.query_selector_all('p')
                for p in paragraphs:
                    text = await p.text_content()
                    if text and text.strip() and len(text.strip()) > 20:
                        content_parts.append(text.strip())
            
            content = ' '.join(content_parts)
            
            # Extract headings
            headings = await self.page.query_selector_all('h2, h3')
            heading_texts = [await h.text_content() for h in headings if await h.text_content()]
            
            if not content:
                # Fallback: get all text
                body = await self.page.query_selector('body')
                content = await body.text_content() if body else ''
                content = ' '.join(content.split())
            
            return {
                'title': title.strip() if title else "No Title",
                'author': author.strip() if author else "Unknown",
                'date': date or datetime.now().strftime("%B %d, %Y"),
                'content': content[:10000],
                'url': url,
                'source_name': 'VentureBeat',
                'source_type': 'blog',
                'word_count': len(content.split()),
                'hash': hashlib.md5(url.encode()).hexdigest()[:8],
                'headings': heading_texts,
                'timestamp': datetime.now().isoformat()
            }
            
        except Exception as e:
            print(f"      ❌ Error scraping full article: {e}")
            return None
    
    def save_to_json(self, articles: List[Dict], output_file: str = OUTPUT_FILE):
        """Save scraped articles to JSON."""
        if not articles:
            print("❌ No articles to save")
            return False
        
        combined = {
            'source': 'VentureBeat AI',
            'source_url': VENTUREBEAT_URL,
            'total_articles': len(articles),
            'articles': articles,
            'last_updated': datetime.now().isoformat()
        }
        
        with open(output_file, 'w', encoding='utf-8') as f:
            json.dump(combined, f, indent=2, ensure_ascii=False)
        
        print(f"\n✅ Data saved to {output_file}")
        print(f"   Total articles: {len(articles)}")
        return True

# ============================================
# MAIN EXECUTION
# ============================================

async def main():
    """Async main entry point."""
    scraper = VentureBeatScraper(headless=True)
    articles = await scraper.scrape_articles(max_articles=20)
    scraper.save_to_json(articles, OUTPUT_FILE)
    
    # Print summary
    if articles:
        print("\n" + "=" * 60)
        print("📊 SUMMARY")
        print("=" * 60)
        for i, article in enumerate(articles[:5], 1):
            print(f"   {i}. {article['title'][:60]}...")
            print(f"      ✍️ {article['author']} | 📅 {article['date']}")
            print(f"      📊 {article['word_count']} words")
            print(f"      🔗 {article['url']}")
            print()

if __name__ == "__main__":
    asyncio.run(main())
