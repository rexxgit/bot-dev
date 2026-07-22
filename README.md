# Omni Brand Intelligence Bot

Python RAG bot with Vercel frontend + GitHub Actions backend.

## How It Works

1. User asks question via Vercel UI
2. Vercel triggers GitHub Actions workflow
3. Python scrapes + FAISS + generates response
4. Result saved as artifact

## Tech Stack

- **Frontend:** Vercel (HTML + Tailwind)
- **Backend:** GitHub Actions (Python)
- **Scraping:** BeautifulSoup
- **Vector Search:** FAISS
- **Embeddings:** sentence-transformers

## Setup

1. Clone repo
2. Generate GitHub token with `repo` and `workflow` scopes
3. Replace `YOUR_GITHUB_TOKEN_HERE` in `index.html`
4. Deploy to Vercel
5. Push to GitHub

## Author

rexxgit
