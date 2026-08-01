#!/usr/bin/env python3
"""
scrape_all.py - Run all scrapers and merge results
Run this manually or via cron to update your bot's data
"""

import subprocess
import sys
from datetime import datetime

# List of scraper scripts
SCRAPERS = [
    "techcrunch_scraper.py",
    "venturebeat_scraper.py",
    "scrapers/anthropic_scraper.py",
    # Add new scrapers here
]

def run_scraper(script):
    """Run a scraper script."""
    print(f"\n🚀 Running: {script}")
    try:
        result = subprocess.run(
            [sys.executable, script],
            capture_output=True,
            text=True,
            timeout=300
        )
        if result.returncode == 0:
            print(f"✅ {script} completed")
            return True
        else:
            print(f"❌ {script} failed")
            print(result.stderr[-500:])
            return False
    except Exception as e:
        print(f"❌ Error: {e}")
        return False

def main():
    print("=" * 60)
    print("🤖 AI News Scraper Pipeline")
    print(f"📅 Started: {datetime.now().isoformat()}")
    print("=" * 60)
    
    # Run scrapers
    success = 0
    for scraper in SCRAPERS:
        if run_scraper(scraper):
            success += 1
    
    # Merge results
    print(f"\n📊 Merging sources into api/data.generated.js...")
    try:
        result = subprocess.run(
            [sys.executable, "scripts/merge_sources.py"],
            capture_output=True,
            text=True
        )
        if result.returncode == 0:
            print("✅ Merge completed")
            print(result.stdout)
        else:
            print("❌ Merge failed")
            print(result.stderr)
    except Exception as e:
        print(f"❌ Error: {e}")
    
    print(f"\n✅ Pipeline complete! {success}/{len(SCRAPERS)} scrapers succeeded")

if __name__ == "__main__":
    main()
