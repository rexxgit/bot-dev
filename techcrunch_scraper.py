"""
TechCrunch AI Scraper - Playwright Dynamic Web Scraper
Handles JavaScript-rendered content with Playwright's auto-waiting and selectors
"""

import os
import json
import time
import random
import hashlib
import asyncio
from datetime import datetime
from typing import List, Dict, Optional
from urllib.parse import urljoin

from playwright.async_api import async_playwright, TimeoutError as PlaywrightTimeoutError

# ================================================
# CONFIGURATION
# ================================================

BASE_URL = 'https://techcrunch.com/category/artificial-intelligence/'
MAX_ARTICLES = 15
MAX_PAGES = 3
OUTPUT_FILE = 'techcrunch_ai_articles.json'

# ================================================
# PLAYWRIGHT TECHCRUNCH SCRAPER
# ================================================

class TechCrunchPlaywrightScraper:
    """
    TechCrunch scraper using Playwright for JavaScript-rendered content.
    Handles dynamic loading, pagination, and full article extraction.
    """
    
    def __init__(self, headless: bool = True):
        self.headless = headless
        self.playwright = None
        self.browser = None
        self.context = None
        self.page = None
        self.articles = []
        
    async def _init_browser(self):
        """Initialize Playwright browser with context."""
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
            timezone_id='America/New_York',
            java_script_enabled=True,
            bypass_csp=True
        )
        
        self.page = await self.context.new_page()
        
        # Add stealth to avoid detection
        await self.page.add_init_script("""
            Object.defineProperty(navigator, 'webdriver', {
                get: () => undefined
            });
        """)
        
        print("✅ Playwright browser initialized")
    
    async def _close_browser(self):
        """Clean up browser resources."""
        if self.browser:
            await self.browser.close()
        if self.playwright:
            await self.playwright.stop()
        print("🔚 Browser closed")
    
    # ================================================
    # 1. CATEGORY PAGE SCRAPING
    # ================================================
    
    async def scrape_category_page(self, url: str) -> List[str]:
        """
        Scrape article URLs from a TechCrunch category page.
        Uses Playwright's auto-waiting and multiple selector strategies.
        """
        try:
            print(f"📄 Loading category page: {url}")
            
            # Navigate with wait until network idle
            await self.page.goto(url, wait_until='networkidle', timeout=30000)
            
            # Scroll to trigger lazy loading
            await self._scroll_to_load()
            
            # Wait for articles to appear with multiple strategies
            article_urls = []
            
            # ============================================
            # STRATEGY 1: data-destinationlink (TechCrunch's actual attribute)
            # ============================================
            try:
                # Wait for any article link to appear
                await self.page.wait_for_selector(
                    'a[data-destinationlink]', 
                    timeout=10000
                )
                
                # Get all links with data-destinationlink
                links = await self.page.query_selector_all('a[data-destinationlink]')
                for link in links:
                    href = await link.get_attribute('href')
                    text = await link.text_content()
                    
                    if href and 'techcrunch.com' in href and '/category/' not in href:
                        if href not in article_urls:
                            article_urls.append(href)
                            print(f"   🔗 Found: {text[:50] if text else 'Unknown'}...")
            except PlaywrightTimeoutError:
                print("   ⏳ No data-destinationlink found, trying other selectors...")
            
            # ============================================
            # STRATEGY 2: .loop-card__title-link
            # ============================================
            if not article_urls:
                try:
                    links = await self.page.query_selector_all('.loop-card__title-link')
                    for link in links:
                        href = await link.get_attribute('href')
                        text = await link.text_content()
                        
                        if href and 'techcrunch.com' in href and '/category/' not in href:
                            if href not in article_urls:
                                article_urls.append(href)
                                print(f"   🔗 Found: {text[:50] if text else 'Unknown'}...")
                except Exception:
                    pass
            
            # ============================================
            # STRATEGY 3: .wp-block-post a (article blocks)
            # ============================================
            if not article_urls:
                try:
                    links = await self.page.query_selector_all('.wp-block-post a, .post-block a, article a')
                    for link in links:
                        href = await link.get_attribute('href')
                        if href and 'techcrunch.com' in href and '/category/' not in href:
                            if '/202' in href and href not in article_urls:
                                article_urls.append(href)
                                print(f"   🔗 Found: {await link.text_content() or 'Unknown'}...")
                except Exception:
                    pass
            
            # ============================================
            # STRATEGY 4: Any link with date pattern
            # ============================================
            if not article_urls:
                try:
                    all_links = await self.page.query_selector_all('a[href*="techcrunch.com"]')
                    for link in all_links:
                        href = await link.get_attribute('href')
                        if href and '/202' in href and '/category/' not in href:
                            if href not in article_urls:
                                article_urls.append(href)
                                print(f"   🔗 Found: {await link.text_content() or 'Unknown'}...")
                except Exception:
                    pass
            
            # Remove duplicates and filter
            article_urls = list(dict.fromkeys(article_urls))
            
            print(f"✅ Found {len(article_urls)} article URLs on this page")
            return article_urls[:MAX_ARTICLES]
            
        except Exception as e:
            print(f"❌ Error scraping category page: {e}")
            return []
    
    async def _scroll_to_load(self):
        """Scroll to load lazy-loaded content."""
        try:
            # Scroll down
            await self.page.evaluate('window.scrollTo(0, document.body.scrollHeight)')
            await asyncio.sleep(2)
            
            # Scroll back up
            await self.page.evaluate('window.scrollTo(0, 0)')
            await asyncio.sleep(1)
            
            # Scroll down again to catch all
            await self.page.evaluate('window.scrollTo(0, document.body.scrollHeight)')
            await asyncio.sleep(2)
            
            print("   📜 Scrolled to load all content")
        except Exception as e:
            print(f"   ⚠️ Scroll error: {e}")
    
    async def get_next_page_url(self) -> Optional[str]:
        """
        Extract the next page URL from pagination.
        """
        try:
            # Try multiple pagination selectors
            selectors = [
                'a.wp-block-query-pagination-next',
                'a.next[data-destinationlink]',
                'a.next.page-numbers',
                'a:has-text("Next")',
                'a:has-text("›")',
                'a:has-text("→")'
            ]
            
            for selector in selectors:
                try:
                    next_link = await self.page.query_selector(selector)
                    if next_link:
                        href = await next_link.get_attribute('href')
                        if href:
                            print(f"   📌 Next page found: {href}")
                            return urljoin(BASE_URL, href)
                except Exception:
                    continue
            
            return None
            
        except Exception as e:
            print(f"   ⚠️ Could not find next page: {e}")
            return None
    
    async def scrape_multiple_pages(self, start_url: str, max_pages: int = MAX_PAGES) -> List[str]:
        """
        Scrape multiple pages of the TechCrunch AI category.
        """
        all_urls = []
        current_url = start_url
        page_count = 0
        
        while current_url and page_count < max_pages:
            page_count += 1
            print(f"\n📑 Scraping page {page_count}: {current_url}")
            
            # Navigate to page
            await self.page.goto(current_url, wait_until='networkidle', timeout=30000)
            await asyncio.sleep(2)  # Additional wait for stability
            
            # Get article URLs
            page_urls = await self.scrape_category_page(current_url)
            
            # Add new URLs
            new_urls = [url for url in page_urls if url not in all_urls]
            all_urls.extend(new_urls)
            print(f"   📝 Added {len(new_urls)} new articles (total: {len(all_urls)})")
            
            # Check if we have enough
            if len(all_urls) >= MAX_ARTICLES:
                print(f"   🎯 Reached target of {MAX_ARTICLES} articles")
                break
            
            # Get next page URL
            current_url = await self.get_next_page_url()
            if current_url:
                delay = random.uniform(1.5, 3.5)
                print(f"   ⏳ Waiting {delay:.1f}s before next page...")
                await asyncio.sleep(delay)
            else:
                print("   📌 No more pages available")
                break
        
        # Trim to max articles
        if len(all_urls) > MAX_ARTICLES:
            all_urls = all_urls[:MAX_ARTICLES]
        
        print(f"\n✅ Collected {len(all_urls)} article URLs from {page_count} pages")
        return all_urls
    
    # ================================================
    # 2. ARTICLE PAGE SCRAPING
    # ================================================
    
    async def scrape_article(self, url: str) -> Optional[Dict]:
        """
        Scrape a single TechCrunch article page using Playwright.
        """
        try:
            print(f"   📄 Scraping article: {url}")
            
            # Navigate with wait
            await self.page.goto(url, wait_until='networkidle', timeout=30000)
            await asyncio.sleep(1.5)  # Allow any additional JS execution
            
            # Scroll to load all content
            await self._scroll_to_load()
            
            # ============================================
            # EXTRACT TITLE
            # ============================================
            title_selectors = [
                'h1.article__title',
                'h1.wp-block-post-title',
                'h1.entry-title',
                'h1'
            ]
            title = "No Title"
            for selector in title_selectors:
                try:
                    elem = await self.page.query_selector(selector)
                    if elem:
                        title = await elem.text_content()
                        title = title.strip() if title else "No Title"
                        break
                except Exception:
                    continue
            
            # ============================================
            # EXTRACT AUTHOR
            # ============================================
            author_selectors = [
                'span.article__byline a',
                '.wp-block-post-author__name',
                '.byline a',
                '.author a',
                '.author-name'
            ]
            author = "Unknown"
            for selector in author_selectors:
                try:
                    elem = await self.page.query_selector(selector)
                    if elem:
                        author = await elem.text_content()
                        author = author.strip() if author else "Unknown"
                        break
                except Exception:
                    continue
            
            # ============================================
            # EXTRACT DATE
            # ============================================
            date_selectors = [
                'time[datetime]',
                '.wp-block-post-date time',
                '.article__date',
                '.post-date',
                '.pub-date'
            ]
            date = datetime.now().strftime('%B %d, %Y')
            for selector in date_selectors:
                try:
                    elem = await self.page.query_selector(selector)
                    if elem:
                        datetime_val = await elem.get_attribute('datetime')
                        if datetime_val:
                            date = datetime_val
                        else:
                            text = await elem.text_content()
                            if text:
                                date = text.strip()
                        break
                except Exception:
                    continue
            
            # ============================================
            # EXTRACT CONTENT
            # ============================================
            content_selectors = [
                '.entry-content.wp-block-post-content',
                '.entry-content',
                '.article-content',
                '.post-content',
                'main article'
            ]
            
            content = ""
            content_elem = None
            for selector in content_selectors:
                try:
                    content_elem = await self.page.query_selector(selector)
                    if content_elem:
                        break
                except Exception:
                    continue
            
            if content_elem:
                try:
                    # Get all paragraphs within content
                    paragraphs = await content_elem.query_selector_all('p')
                    paragraph_texts = []
                    for p in paragraphs:
                        text = await p.text_content()
                        if text and len(text.strip()) > 20:
                            paragraph_texts.append(text.strip())
                    content = ' '.join(paragraph_texts)
                except Exception:
                    content = ""
            
            # Fallback: get all text from main
            if not content or len(content) < 100:
                try:
                    body = await self.page.query_selector('body')
                    if body:
                        content = await body.text_content()
                        # Clean up: remove extra whitespace, navigation, etc.
                        content = ' '.join(content.split())
                except Exception:
                    pass
            
            # ============================================
            # BUILD RESULT
            # ============================================
            if content and len(content) > 100:
                result = {
                    'title': title,
                    'author': author,
                    'date': date,
                    'content': content[:8000],
                    'url': url,
                    'source_name': 'TechCrunch AI',
                    'source_type': 'blog',
                    'word_count': len(content.split()),
                    'hash': hashlib.md5(url.encode()).hexdigest()[:8],
                    'timestamp': datetime.now().isoformat()
                }
                print(f"      ✅ {title[:60]}... ({result['word_count']} words)")
                return result
            else:
                print(f"      ⚠️ Content too short or missing")
                return None
                
        except PlaywrightTimeoutError:
            print(f"      ⏳ Timeout loading {url}")
            return None
        except Exception as e:
            print(f"      ❌ Error: {e}")
            return None
    
    # ================================================
    # 3. MAIN EXECUTION
    # ================================================
    
    async def run(self, max_articles: int = MAX_ARTICLES, max_pages: int = MAX_PAGES) -> List[Dict]:
        """
        Main execution with Playwright dynamic scraping.
        """
        print("=" * 60)
        print("🤖 TechCrunch AI Scraper (Playwright)")
        print(f"📡 Target: {BASE_URL}")
        print(f"📑 Max articles: {max_articles}")
        print(f"📑 Max pages: {max_pages}")
        print("=" * 60)
        
        try:
            # Initialize browser
            await self._init_browser()
            
            # Step 1: Collect article URLs
            print("\n🔍 Step 1: Collecting article URLs...")
            article_urls = await self.scrape_multiple_pages(BASE_URL, max_pages)
            
            if not article_urls:
                print("❌ No article URLs found")
                return []
            
            # Step 2: Scrape each article
            print(f"\n📝 Step 2: Scraping {len(article_urls)} articles...")
            articles = []
            for i, url in enumerate(article_urls):
                print(f"\n   📊 Progress: {i+1}/{len(article_urls)}")
                article = await self.scrape_article(url)
                if article:
                    articles.append(article)
                # Random delay to avoid rate limiting
                await asyncio.sleep(random.uniform(1, 2.5))
            
            print(f"\n✅ Scraped {len(articles)} articles successfully")
            return articles
            
        finally:
            await self._close_browser()
    
    # ================================================
    # 4. SAVE RESULTS
    # ================================================
    
    def save_to_json(self, articles: List[Dict], output_file: str = OUTPUT_FILE):
        """Save scraped articles to JSON."""
        if not articles:
            with open(output_file, 'w', encoding='utf-8') as f:
                json.dump({
                    'source': 'TechCrunch AI',
                    'source_url': BASE_URL,
                    'total_articles': 0,
                    'articles': [],
                    'last_updated': datetime.now().isoformat(),
                    'status': 'No articles found'
                }, f, indent=2, ensure_ascii=False)
            print(f"✅ Created empty {output_file}")
            return False
        
        combined = {
            'source': 'TechCrunch AI',
            'source_url': BASE_URL,
            'total_articles': len(articles),
            'articles': articles,
            'last_updated': datetime.now().isoformat()
        }
        
        with open(output_file, 'w', encoding='utf-8') as f:
            json.dump(combined, f, indent=2, ensure_ascii=False)
        
        print(f"\n✅ Data saved to {output_file}")
        print(f"   Total articles: {len(articles)}")
        return True

# ================================================
# 5. MAIN ENTRY POINT
# ================================================

async def main():
    """Async main entry point."""
    scraper = TechCrunchPlaywrightScraper(headless=True)
    articles = await scraper.run(max_articles=15, max_pages=3)
    scraper.save_to_json(articles, OUTPUT_FILE)
    
    # Print summary
    if articles:
        print("\n" + "=" * 60)
        print("📊 SUMMARY")
        print("=" * 60)
        for article in articles[:5]:
            print(f"   📄 {article['title'][:60]}...")
            print(f"      ✍️ {article['author']} | 📅 {article['date']} | 📊 {article['word_count']} words")
            print()

if __name__ == "__main__":
    # Run the async main function
    asyncio.run(main())
