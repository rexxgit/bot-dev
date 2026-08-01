#!/usr/bin/env python3
"""
merge_sources.py - Auto-updates api/data.js with fresh data
Reads all *_articles.json and embeds into data.js
"""

import json
import glob
import os
import re
from datetime import datetime
import hashlib
from urllib.parse import urlparse

# ============================================
# CONFIGURATION
# ============================================

DATA_FILE = "api/data.js"
SOURCE_PATTERNS = ["*_articles.json"]

# ============================================
# FUNCTIONS
# ============================================

def find_json_files():
    """Find all JSON files."""
    files = []
    for pattern in SOURCE_PATTERNS:
        files.extend(glob.glob(pattern))
    return files

def load_json(filepath):
    """Load JSON file."""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            return json.load(f)
    except Exception as e:
        print(f"⚠️ Error loading {filepath}: {e}")
        return None

def extract_articles(data):
    """Extract articles from JSON."""
    if isinstance(data, list):
        return data
    elif isinstance(data, dict) and 'articles' in data:
        return data['articles']
    return []

def normalize_article(article):
    """Normalize article fields."""
    normalized = {}
    
    field_map = {
        'title': ['title', 'headline', 'name'],
        'author': ['author', 'creator', 'writer', 'byline'],
        'date': ['date', 'published', 'pubDate', 'created'],
        'content': ['content', 'description', 'summary', 'body', 'text'],
        'url': ['url', 'link', 'href', 'source_url'],
        'source_name': ['source_name', 'source', 'publisher'],
        'source_type': ['source_type', 'type'],
        'word_count': ['word_count', 'words'],
        'domain': ['domain'],
    }
    
    for target, sources in field_map.items():
        for source in sources:
            if source in article and article[source]:
                normalized[target] = article[source]
                break
        if target not in normalized:
            defaults = {
                'title': 'Untitled',
                'author': 'Unknown',
                'source_name': 'Unknown',
                'source_type': 'blog',
                'word_count': 0,
                'url': '#',
                'date': datetime.now().isoformat(),
                'domain': 'unknown'
            }
            normalized[target] = defaults.get(target, '')
    
    if 'hash' not in normalized:
        url = normalized.get('url', '')
        if url and url != '#':
            normalized['hash'] = hashlib.md5(url.encode()).hexdigest()[:8]
        else:
            normalized['hash'] = hashlib.md5(normalized['title'].encode()).hexdigest()[:8]
    
    if 'timestamp' not in normalized:
        normalized['timestamp'] = datetime.now().isoformat()
    
    return normalized

def update_data_js(articles, source_stats):
    """Update api/data.js with new data."""
    
    # Read the current file
    with open(DATA_FILE, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Find and replace the data sections
    # Find the techCrunchSources array
    pattern = r'const techCrunchSources = \[[\s\S]*?\];'
    replacement = f'const techCrunchSources = {json.dumps(articles, indent=2)};'
    content = re.sub(pattern, replacement, content)
    
    # Find and replace staticSources
    pattern = r'const staticSources = \[[\s\S]*?\];'
    # We'll keep static sources as they are, or update if needed
    
    # Find and replace ventureBeatSources
    pattern = r'const ventureBeatSources = \[[\s\S]*?\];'
    replacement = f'const ventureBeatSources = {json.dumps([], indent=2)};'
    # content = re.sub(pattern, replacement, content)  # Uncomment if needed
    
    # Update sourceStats
    pattern = r'const sourceStats = \{[\s\S]*?\};'
    replacement = f'const sourceStats = {json.dumps(source_stats, indent=2)};'
    content = re.sub(pattern, replacement, content)
    
    # Write the updated file
    with open(DATA_FILE, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"✅ Updated {DATA_FILE} with {len(articles)} articles")
    return len(articles)

def main():
    """Main execution."""
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
    
    for filepath in json_files:
        data = load_json(filepath)
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
        elif not url or url == '#':
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
    
    # Update the file
    total = update_data_js(final_articles, source_stats)
    
    # Summary
    print("\n" + "=" * 60)
    print("📊 MERGE SUMMARY")
    print("=" * 60)
    print(f"   Total articles loaded: {len(all_articles)}")
    print(f"   Duplicates removed: {len(all_articles) - len(final_articles)}")
    print(f"   Final unique articles: {len(final_articles)}")
    print("\n   Source Breakdown:")
    for source, count in source_stats.items():
        print(f"   - {source}: {count} articles")
    print(f"\n   📁 Updated: {DATA_FILE}")
    print(f"   📅 Completed at: {datetime.now().isoformat()}")

if __name__ == "__main__":
    main()
