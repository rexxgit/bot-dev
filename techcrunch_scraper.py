"""
TechCrunch AI Scraper - Static & Dynamic Web Scraper
Extracts articles from TechCrunch's AI category with pagination support
"""

import os
import json
import time
import random
import hashlib
from datetime import datetime
from typing import List, Dict, Optional
from urllib.parse import urljoin, urlparse

import requests
from bs4 import BeautifulSoup

# ================================================
# CONFIGURATION
# ================================================

BASE_URL = 'https://techcrunch.com/category/artificial-intelligence/'
USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
MAX_ARTICLES = 15
MAX_PAGES = 3

# ================================================
# TECHCRUNCH SCRAPER CLASS
# ================================================

class TechCrunchScraper:
    """
    A robust scraper for TechCrunch's AI section.
    Handles both category page (static) and article pages (static).
    """
    
    def __init__(self):
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': USER_AGENT,
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
            'Accept-Language': 'en-US,en;q=0.9',
            'Accept-Encoding': 'gzip, deflate, br',
            'Connection': 'keep-alive',
            'Upgrade-Insecure-Requests': '1',
            'Sec-Fetch-Dest': 'document',
            'Sec-Fetch-Mode': 'navigate',
            'Sec-Fetch-Site': 'none',
            'Sec-Fetch-User': '?1',
            'Cache-Control': 'max-age=0',
        })
        self.articles = []
        self.article_urls = []
    
    # ================================================
    # 1. CATEGORY PAGE SCRAPING
    # ================================================
    
    def scrape_category_page(self, url: str) -> List[str]:
        """
        Extract all article URLs from a TechCrunch AI category page.
        Uses the flex column structure and article title links.
        """
        try:
            print(f"📄 Scraping category page: {url}")
            response = self.session.get(url, timeout=15)
            response.raise_for_status()
            
            soup = BeautifulSoup(response.text, 'html.parser')
            
            # Find all article title links within flex columns
            # Using the specific structure: wp-block-columns with article links
            article_links = []
            
            # Method 1: Look for .loop-card__title-link (direct title links)
            for link in soup.select('a.loop-card__title-link'):
                href = link.get('href')
                if href and 'techcrunch.com' in href and '/category/' not in href:
                    article_links.append(href)
                    print(f"   🔗 Found article: {link.get_text(strip=True)[:50]}...")
            
            # Method 2: Look for any article links within flex columns
            if not article_links:
                for column in soup.select('.wp-block-columns, .wp-block-column'):
                    for link in column.find_all('a', href=True):
                        href = link.get('href')
                        if href and 'techcrunch.com' in href and '/category/' not in href:
                            if href not in article_links:
                                article_links.append(href)
                                print(f"   🔗 Found article: {link.get_text(strip=True)[:50]}...")
            
            # Method 3: Fallback - look for all article links in the main content
            if not article_links:
                main_content = soup.find('main') or soup.find('div', class_='wp-block-group')
                if main_content:
                    for link in main_content.find_all('a', href=True):
                        href = link.get('href')
                        if href and 'techcrunch.com' in href and '/category/' not in href:
                            if href not in article_links:
                                article_links.append(href)
                                print(f"   🔗 Found article: {link.get_text(strip=True)[:50]}...")
            
            print(f"✅ Found {len(article_links)} unique article URLs")
            return article_links[:MAX_ARTICLES]
            
        except Exception as e:
            print(f"❌ Error scraping category page: {e}")
            return []
    
    def get_next_page_url(self, soup: BeautifulSoup) -> Optional[str]:
        """
        Extract the next page URL from pagination.
        Looks for: a.wp-block-query-pagination-next
        """
        try:
            next_link = soup.select_one('a.wp-block-query-pagination-next')
            if next_link:
                href = next_link.get('href')
                if href:
                    return urljoin(BASE_URL, href)
            return None
        except Exception as e:
            print(f"⚠️ Could not find next page: {e}")
            return None
    
    def scrape_multiple_pages(self, start_url: str, max_pages: int = MAX_PAGES) -> List[str]:
        """
        Scrape multiple pages of the TechCrunch AI category.
        """
        all_urls = []
        current_url = start_url
        page_count = 0
        
        while current_url and page_count < max_pages:
            page_count += 1
            print(f"\n📑 Scraping page {page_count}: {current_url}")
            
            try:
                response = self.session.get(current_url, timeout=15)
                response.raise_for_status()
                soup = BeautifulSoup(response.text, 'html.parser')
                
                # Extract article URLs from this page
                page_urls = self._extract_article_urls_from_soup(soup)
                new_urls = [url for url in page_urls if url not in all_urls]
                all_urls.extend(new_urls)
                print(f"   📝 Added {len(new_urls)} new articles (total: {len(all_urls)})")
                
                # Check if we have enough articles
                if len(all_urls) >= MAX_ARTICLES:
                    print(f"   🎯 Reached target of {MAX_ARTICLES} articles")
                    break
                
                # Get next page URL
                current_url = self.get_next_page_url(soup)
                if current_url:
                    # Random delay to be respectful
                    delay = random.uniform(1.5, 3.5)
                    print(f"   ⏳ Waiting {delay:.1f}s before next page...")
                    time.sleep(delay)
                else:
                    print("   📌 No more pages available")
                    break
                    
            except Exception as e:
                print(f"❌ Error on page {page_count}: {e}")
                break
        
        # Trim to max articles
        if len(all_urls) > MAX_ARTICLES:
            all_urls = all_urls[:MAX_ARTICLES]
            
        print(f"\n✅ Collected {len(all_urls)} article URLs from {page_count} pages")
        return all_urls
    
    def _extract_article_urls_from_soup(self, soup: BeautifulSoup) -> List[str]:
        """Extract article URLs from a BeautifulSoup object."""
        article_urls = []
        
        # Look for .loop-card__title-link (most reliable)
        for link in soup.select('a.loop-card__title-link'):
            href = link.get('href')
            if href and 'techcrunch.com' in href and '/category/' not in href:
                if href not in article_urls:
                    article_urls.append(href)
        
        # If none found, look in flex columns
        if not article_urls:
            for column in soup.select('.wp-block-columns, .wp-block-column, .post-block'):
                for link in column.find_all('a', href=True):
                    href = link.get('href')
                    if href and 'techcrunch.com' in href and '/category/' not in href:
                        if href not in article_urls:
                            article_urls.append(href)
        
        # If still none, look in main content
        if not article_urls:
            main_content = soup.find('main') or soup.find('div', class_='wp-block-group')
            if main_content:
                for link in main_content.find_all('a', href=True):
                    href = link.get('href')
                    if href and 'techcrunch.com' in href and '/category/' not in href:
                        if href not in article_urls:
                            article_urls.append(href)
        
        return article_urls
    
    # ================================================
    # 2. ARTICLE PAGE SCRAPING
    # ================================================
    
    def scrape_article(self, url: str) -> Optional[Dict]:
        """
        Scrape a single TechCrunch article page.
        Extracts: title, author, date, content, and metadata.
        """
        try:
            print(f"   📄 Scraping article: {url}")
            response = self.session.get(url, timeout=15)
            response.raise_for_status()
            
            soup = BeautifulSoup(response.text, 'html.parser')
            
            # ============================================
            # EXTRACT TITLE
            # ============================================
            title_elem = soup.select_one('h1.article__title, h1.wp-block-post-title, h1.entry-title, h1')
            title = title_elem.get_text(strip=True) if title_elem else 'No Title'
            
            # ============================================
            # EXTRACT AUTHOR
            # ============================================
            author_elem = soup.select_one('span.article__byline a, .wp-block-post-author__name, .byline a, .author a')
            author = author_elem.get_text(strip=True) if author_elem else 'Unknown'
            
            # ============================================
            # EXTRACT DATE
            # ============================================
            date_elem = soup.select_one('time, .wp-block-post-date time, .article__date, .post-date')
            if date_elem:
                date = date_elem.get('datetime') or date_elem.get_text(strip=True)
            else:
                date = datetime.now().strftime('%B %d, %Y')
            
            # ============================================
            # EXTRACT CONTENT (WITHIN entry-content)
            # ============================================
            content = ''
            content_elem = soup.select_one('.entry-content.wp-block-post-content')
            if content_elem:
                # Remove unwanted elements
                for unwanted in content_elem.find_all(['script', 'style', 'aside', 'div.ad', 'div.related-posts']):
                    unwanted.decompose()
                
                # Get all paragraphs
                paragraphs = content_elem.find_all('p')
                content = ' '.join([p.get_text(strip=True) for p in paragraphs if len(p.get_text(strip=True)) > 20])
            
            # Fallback: try other content selectors
            if not content:
                content_elem = soup.select_one('.article-content, .post-content, .entry-content, main article')
                if content_elem:
                    for unwanted in content_elem.find_all(['script', 'style', 'aside']):
                        unwanted.decompose()
                    paragraphs = content_elem.find_all('p')
                    content = ' '.join([p.get_text(strip=True) for p in paragraphs if len(p.get_text(strip=True)) > 20])
            
            # ============================================
            # EXTRACT EXCERPT (sub-sections)
            # ============================================
            excerpt = ''
            excerpt_elem = soup.select_one('.article__subtitle, .post-excerpt, .entry-summary, .article-excerpt')
            if excerpt_elem:
                excerpt = excerpt_elem.get_text(strip=True)
            
            # ============================================
            # BUILD RESULT
            # ============================================
            if content and len(content) > 100:
                result = {
                    'title': title,
                    'author': author,
                    'date': date,
                    'content': content[:8000],
                    'excerpt': excerpt,
                    'url': url,
                    'source_name': 'TechCrunch AI',
                    'source_type': 'blog',
                    'word_count': len(content.split()),
                    'hash': hashlib.md5(url.encode()).hexdigest()[:8],
                    'timestamp': datetime.now().isoformat()
                }
                print(f"      ✅ Title: {title[:60]}...")
                print(f"      📊 Words: {result['word_count']}")
                return result
            else:
                print(f"      ⚠️ Content too short or missing")
                return None
                
        except Exception as e:
            print(f"      ❌ Error scraping article: {e}")
            return None
    
    # ================================================
    # 3. MAIN EXECUTION
    # ================================================
    
    def run(self, max_articles: int = MAX_ARTICLES, max_pages: int = MAX_PAGES) -> List[Dict]:
        """
        Main execution method: scrape category pages, then individual articles.
        """
        print("=" * 60)
        print("🤖 TechCrunch AI Scraper")
        print(f"📡 Target: {BASE_URL}")
        print(f"📑 Max articles: {max_articles}")
        print(f"📑 Max pages: {max_pages}")
        print("=" * 60)
        
        # Step 1: Collect article URLs from category pages
        print("\n🔍 Step 1: Collecting article URLs...")
        article_urls = self.scrape_multiple_pages(BASE_URL, max_pages)
        
        if not article_urls:
            print("❌ No article URLs found")
            return []
        
        # Step 2: Scrape each article
        print(f"\n📝 Step 2: Scraping {len(article_urls)} articles...")
        articles = []
        for i, url in enumerate(article_urls):
            print(f"\n   📊 Progress: {i+1}/{len(article_urls)}")
            article = self.scrape_article(url)
            if article:
                articles.append(article)
            # Random delay to avoid rate limiting
            delay = random.uniform(1, 2.5)
            time.sleep(delay)
        
        print(f"\n✅ Scraped {len(articles)} articles successfully")
        return articles
    
    # ================================================
    # 4. SAVE RESULTS
    # ================================================
    
    def save_to_json(self, articles: List[Dict], output_file: str = 'techcrunch_data.json'):
        """Save scraped articles to JSON."""
        if not articles:
            print("❌ No articles to save")
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
# 5. RUN
# ================================================

if __name__ == "__main__":
    scraper = TechCrunchScraper()
    articles = scraper.run(max_articles=15, max_pages=3)
    scraper.save_to_json(articles, 'techcrunch_ai_articles.json')
    
    # Print summary
    if articles:
        print("\n" + "=" * 60)
        print("📊 SUMMARY")
        print("=" * 60)
        for article in articles:
            print(f"   📄 {article['title'][:60]}...")
            print(f"      ✍️ {article['author']} | 📅 {article['date']} | 📊 {article['word_count']} words")
            print(f"      🔗 {article['url']}")
            print()
