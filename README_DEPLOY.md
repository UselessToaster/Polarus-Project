Deployment notes (quick demo/hackathon)

1) Environment variables
- DATABASE_URL (optional) — if provided, app will use this DB URI
- DB_USER, DB_PASS, DB_HOST, DB_NAME, MYSQL_SOCKET (optional local fallback)
- ADMIN_TOKEN — a secret token used to protect the /admin/scrape endpoint

2) Quick local test
- Create a virtualenv and install requirements:

```bash
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

- Run the web app (local dev):

```bash
export ADMIN_TOKEN=changeme
python app.py
```

- Trigger scraping locally:

```bash
curl -X POST http://127.0.0.1:5000/admin/scrape -H "Authorization: Bearer changeme"
```

3) Deploy to a PaaS (Railway / Render / Heroku)
- Option A: Deploy web + worker
  - Add a Web service using the Dockerfile or buildpack.
  - Add a Worker service with command `python run_scraper.py` (or use platform scheduler to run it periodically).
- Set environment variables in the platform dashboard (DATABASE_URL and ADMIN_TOKEN).

4) Scheduling
- Use platform scheduler (Railway/Render/Heroku Scheduler) to run `python run_scraper.py` on a cron.
- Or call POST /admin/scrape from a scheduler.

5) Security
- Do not commit real secrets. Use platform secret management or env vars.
- Create a non-root DB user for production.
