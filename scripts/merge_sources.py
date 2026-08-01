#!/usr/bin/env python3
"""
Merge Sources Script - Auto-generates api/data.js from scraped JSON files
Run this after scraping to automatically update your bot's knowledge base
"""

import json
import os
from datetime import datetime
from pathlib import Path
import glob

# ============================================
# CONFIGURATION
# ============================================

OUTPUT_FILE = "api/data.js"
SOURCE_PATTERNS = [
    "techcrunch_ai_articles.json",
    "venturebeat_articles.json",
    "anthropic_articles.json",
    "*_articles.json",  # Catch all JSON files ending with _articles.json
]

# Manual static sources (these are always included)
STATIC_SOURCES = [
    {
        "title": "GPT-5.6, Claude Sonnet 5 and Grok 4.5: What the July 2026 AI Model Wave Means for Your Business",
        "author": "Raulji Technologies",
        "date": "July 27, 2026",
        "content": "Anthropic, OpenAI, and xAI all shipped major models in weeks. Here is what the July 2026 AI model wave means for your business, and how to turn it into a competitive advantage.",
        "url": "https://www.rauljitechnologies.com/blog/july-2026-ai-model-wave/",
        "source_name": "Raulji Technologies",
        "source_type": "blog",
        "word_count": 1768,
        "hash": "raulji_001",
        "domain": "rauljitechnologies.com",
        "timestamp": "2026-07-27T08:36:53.036255"
    },
    {
        "title": "15 best AI apps I can't live without in 2026",
        "author": "Gumloop",
        "date": "July 27, 2026",
        "content": "It all started with ChatGPT, then Claude, and then we had an explosion of AI apps for literally every use case you can think of.",
        "url": "https://www.gumloop.com/blog/best-ai-apps",
        "source_name": "Gumloop",
        "source_type": "blog",
        "word_count": 6894,
        "hash": "gumloop_001",
        "domain": "gumloop.com",
        "timestamp": "2026-07-27T08:36:53.036255"
    },
    {
        "title": "Top AI Platforms in 2026: The 15 Best Platforms I've Actually Tested",
        "author": "Pickaxe",
        "date": "July 27, 2026",
        "content": "I have tested more AI platforms than I can count over the past three years. Most of them blurred together. Some were genuinely great.",
        "url": "https://pickaxe.co/post/top-ai-platforms",
        "source_name": "Pickaxe",
        "source_type": "blog",
        "word_count": 6534,
        "hash": "pickaxe_001",
        "domain": "pickaxe.co",
        "timestamp": "2026-07-27T08:36:53.036255"
    },
    {
        "title": "The 12 Best AI Tools for 2026 (That People Actually Use)",
        "author": "Synthesia",
        "date": "July 27, 2026",
        "content": "Can you believe it's been over three years since ChatGPT landed in our internet browsers? In a short space of time, AI has become a staple part of daily work.",
        "url": "https://www.synthesia.io/post/ai-tools",
        "source_name": "Synthesia",
        "source_type": "blog",
        "word_count": 2343,
        "hash": "synthesia_001",
        "domain": "synthesia.io",
        "timestamp": "2026-07-27T08:36:53.036255"
    },
    {
        "title": "Six Popular AI Platforms Everyone Can Use",
        "author": "Red River Communications",
        "date": "July 27, 2026",
        "content": "Whether it's Fortune 500 companies or your friends and coworkers, just about everywhere you turn, people are talking about AI.",
        "url": "https://redrivercomm.com/six-popular-ai-platforms-everyone-can-use",
        "source_name": "Red River Communications",
        "source_type": "blog",
        "word_count": 953,
        "hash": "redriver_001",
        "domain": "redrivercomm.com",
        "timestamp": "2026-07-27T08:36:53.036255"
    }
]

# ============================================
# HELPER FUNCTIONS
# ============================================

def find_json_files():
    """Find all JSON files matching the patterns."""
    json_files = []
    
    for pattern in SOURCE_PATTERNS:
        if '*' in pattern:
            # Wildcard pattern
            matches = glob.glob(pattern)
            for match in matches:
                if match not in json_files:
                    json_files.append(match)
        else:
            # Exact file
            if os.path.exists(pattern):
                json_files.append(pattern)
    
    return json_files

def load_json_file(filepath):
    """Load a JSON file with error handling."""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            return json.load(f)
    except FileNotFoundError:
        print(f"⚠️ File not found: {filepath}")
        return None
    except json.JSONDecodeError as e:
        print(f"❌ Error parsing {filepath}: {e}")
        return None

def extract_articles(data):
    """Extract articles from loaded JSON data."""
    if isinstance(data, list):
        return data
    elif isinstance(data, dict):
        if 'articles' in data:
            return data['articles']
        elif 'data' in data and 'articles' in data['data']:
            return data['data']['articles']
    return []

def normalize_article(article):
    """Ensure consistent field names across different sources."""
    # Map common field variations
    field_map = {
        'source_name': ['source_name', 'source', 'publisher', 'brand'],
        'content': ['content', 'description', 'summary', 'body', 'text'],
        'url': ['url', 'link', 'href', 'source_url'],
        'author': ['author', 'creator', 'writer', 'byline'],
        'date': ['date', 'published', 'pubDate', 'created', 'timestamp'],
        'title': ['title', 'headline', 'name'],
    }
    
    normalized = {}
    for target_field, possible_fields in field_map.items():
        for field in possible_fields:
            if field in article and article[field]:
                normalized[target_field] = article[field]
                break
        if target_field not in normalized:
            # Set default values
            if target_field == 'source_name':
                normalized[target_field] = 'Unknown'
            elif target_field == 'content':
                normalized[target_field] = ''
            elif target_field == 'url':
                normalized[target_field] = '#'
            elif target_field == 'author':
                normalized[target_field] = 'Unknown'
            elif target_field == 'date':
                normalized[target_field] = datetime.now().isoformat()
            elif target_field == 'title':
                normalized[target_field] = 'Untitled'
    
    # Add required fields if missing
    normalized['source_type'] = article.get('source_type', 'blog')
    normalized['word_count'] = article.get('word_count', len(normalized.get('content', '').split()))
    normalized['hash'] = article.get('hash', '')
    if not normalized['hash'] and normalized['url']:
        import hashlib
        normalized['hash'] = hashlib.md5(normalized['url'].encode()).hexdigest()[:8]
    normalized['domain'] = article.get('domain', '')
    if not normalized['domain'] and normalized['url']:
        try:
            from urllib.parse import urlparse
            normalized['domain'] = urlparse(normalized['url']).netloc.replace('www.', '')
        except:
            normalized['domain'] = 'unknown'
    normalized['timestamp'] = article.get('timestamp', datetime.now().isoformat())
    
    return normalized

def generate_data_js(articles, source_stats):
    """Generate the complete api/data.js file."""
    
    # Build the JavaScript content
    js_content = f"""// api/data.js - Auto-generated from scraped sources
// DO NOT EDIT MANUALLY - This file is auto-generated by scripts/merge_sources.py
// Generated: {datetime.now().isoformat()}
// Total Sources: {len(articles)}

const techCrunchData = {{
  source: "Multi-Source AI News",
  source_url: "https://techcrunch.com/category/artificial-intelligence/",
  total_sources: {len(articles)},
  source_stats: {{
    {', '.join([f'"{k}": {v}' for k, v in source_stats.items()])}
  }},
  last_updated: "{datetime.now().isoformat()}",
  articles: {json.dumps(articles, indent=2)}
}};

// Export for Node.js
if (typeof module !== 'undefined' && module.exports) {{
  module.exports = {{ techCrunchData }};
}}

// Export for browser
if (typeof window !== 'undefined') {{
  window.techCrunchData = techCrunchData;
  window.allSources = techCrunchData.articles;
}}

export default techCrunchData;
"""
    
    # Write the file
    with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
        f.write(js_content)
    
    print(f"✅ Generated {OUTPUT_FILE} with {len(articles)} articles")

def main():
    """Main execution - merge all sources into api/data.js."""
    print("=" * 60)
    print("📊 AI News Source Merger")
    print(f"📅 Started at: {datetime.now().isoformat()}")
    print("=" * 60)
    
    # Find all JSON files
    json_files = find_json_files()
    print(f"\n📁 Found {len(json_files)} JSON files:")
    for f in json_files:
        print(f"   - {f}")
    
    # Load all articles
    all_articles = []
    source_stats = {}
    
    # Add static sources first
    for article in STATIC_SOURCES:
        normalized = normalize_article(article)
        all_articles.append(normalized)
        source_stats['static'] = source_stats.get('static', 0) + 1
    
    print(f"\n✅ Loaded {source_stats.get('static', 0)} static sources")
    
    # Load from JSON files
    for filepath in json_files:
        data = load_json_file(filepath)
        if data:
            articles = extract_articles(data)
            if articles:
                source_name = os.path.splitext(os.path.basename(filepath))[0]
                count = 0
                for article in articles:
                    normalized = normalize_article(article)
                    all_articles.append(normalized)
                    count += 1
                source_stats[source_name] = count
                print(f"✅ Loaded {count} articles from {filepath}")
    
    # Remove duplicates by URL
    unique_articles = []
    seen_urls = set()
    for article in all_articles:
        url = article.get('url', '')
        if url and url not in seen_urls:
            seen_urls.add(url)
            unique_articles.append(article)
        elif not url:
            # Keep articles without URLs (rare)
            unique_articles.append(article)
    
    # Remove duplicates by title
    seen_titles = set()
    final_articles = []
    for article in unique_articles:
        title = article.get('title', '').lower().strip()
        if title and title not in seen_titles:
            seen_titles.add(title)
            final_articles.append(article)
        elif not title:
            final_articles.append(article)
    
    # Generate the data.js file
    generate_data_js(final_articles, source_stats)
    
    # Print summary
    print("\n" + "=" * 60)
    print("📊 MERGE SUMMARY")
    print("=" * 60)
    print(f"   Total articles loaded: {len(all_articles)}")
    print(f"   Duplicates removed: {len(all_articles) - len(final_articles)}")
    print(f"   Final unique articles: {len(final_articles)}")
    print("\n   Source Breakdown:")
    for source, count in source_stats.items():
        print(f"   - {source}: {count} articles")
    print(f"\n   📁 Output: {OUTPUT_FILE}")
    print(f"   📅 Completed at: {datetime.now().isoformat()}")

if __name__ == "__main__":
    main()
