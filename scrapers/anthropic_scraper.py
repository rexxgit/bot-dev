#!/usr/bin/env python3
"""
Anthropic Blog Scraper - RSS Feed Implementation
Fetches latest Anthropic AI blog posts
"""

import feedparser
import json
import hashlib
import re
from datetime import datetime
from typing import List, Dict

ANTHROPIC_RSS_URL = "https://www.anthropic.com/blog/rss.xml"
OUTPUT_FILE = "anthropic_articles.json"

def scrape_anthropic_blog() -> List[Dict]:
    """Scrape Anthropic blog posts via RSS."""
    print(f"📡 Fetching Anthropic blog from: {ANTHROPIC_RSS_URL}")
    
    try:
        feed = feedparser.parse(ANTHROPIC_RSS_URL)
        
        articles = []
        for entry in feed.entries[:10]:  # Get last 10 articles
            # Clean content
            content = clean_content(entry.get('summary', entry.get('description', '')))
            
            article = {
                'title': entry.title,
                'author': 'Anthropic',
                'date': entry.get('published', datetime.now().isoformat()),
                'content': content[:5000],  # Limit content length
                'url': entry.link,
                'source_name': 'Anthropic Blog',
                'source_type': 'blog',
                'word_count': len(content.split()),
                'hash': hashlib.md5(entry.link.encode()).hexdigest()[:8],
                'domain': 'anthropic.com',
                'timestamp': datetime.now().isoformat()
            }
            articles.append(article)
            print(f"   ✅ Found: {article['title'][:60]}...")
        
        print(f"✅ Scraped {len(articles)} Anthropic articles")
        return articles
        
    except Exception as e:
        print(f"❌ Error scraping Anthropic blog: {e}")
        return []

def clean_content(content: str) -> str:
    """Clean HTML content and extract text."""
    if not content:
        return ""
    # Remove HTML tags
    clean = re.sub(r'<[^>]+>', ' ', content)
    # Remove extra whitespace
    clean = ' '.join(clean.split())
    return clean

def save_to_json(articles: List[Dict]) -> bool:
    """Save articles to JSON file."""
    if not articles:
        print("❌ No articles to save")
        return False
    
    data = {
        'source': 'Anthropic Blog',
        'source_url': ANTHROPIC_RSS_URL,
        'total_articles': len(articles),
        'articles': articles,
        'last_updated': datetime.now().isoformat()
    }
    
    with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    
    print(f"✅ Saved {len(articles)} articles to {OUTPUT_FILE}")
    return True

if __name__ == "__main__":
    print("=" * 60)
    print("🤖 Anthropic Blog Scraper")
    print(f"📡 Target: {ANTHROPIC_RSS_URL}")
    print("=" * 60)
    
    articles = scrape_anthropic_blog()
    save_to_json(articles)
    
    if articles:
        print("\n📊 SUMMARY")
        print("=" * 60)
        for i, article in enumerate(articles[:3], 1):
            print(f"   {i}. {article['title'][:60]}...")
            print(f"      📅 {article['date']}")
            print()
