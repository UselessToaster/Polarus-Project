from flask import Flask, request, jsonify
from extensions import db
import os
from threading import Thread

app = Flask(__name__)

# Database configuration: prefer DATABASE_URL env var for production
DATABASE_URL = os.getenv("DATABASE_URL")
if DATABASE_URL:
    app.config["SQLALCHEMY_DATABASE_URI"] = DATABASE_URL
else:
    # fallback to local defaults (use socket if available)
    username = os.getenv("DB_USER", "root")
    password = os.getenv("DB_PASS", "Spoodilyspoods6!")
    hostname = os.getenv("DB_HOST", "localhost")
    database = os.getenv("DB_NAME", "texas_bills")
    mysql_socket = os.getenv("MYSQL_SOCKET", "/tmp/mysql.sock")
    app.config[
        "SQLALCHEMY_DATABASE_URI"
    ] = f"mysql+pymysql://{username}:{password}@{hostname}/{database}?unix_socket={mysql_socket}"

app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db.init_app(app)


# Admin trigger token (set in production as env var)
ADMIN_TOKEN = os.getenv("ADMIN_TOKEN", None)


def _run_scraper():
    # import inside worker to avoid circular imports
    try:
        from webscraper import main as run_scraper
        run_scraper()
    except Exception:
        import traceback
        traceback.print_exc()


@app.route("/health", methods=["GET"])
def health():
    return jsonify({"status": "ok"}), 200


@app.route("/admin/scrape", methods=["POST"])
def trigger_scrape():
    if ADMIN_TOKEN is None:
        return ("Admin token not configured", 503)

    auth = request.headers.get("Authorization", "")
    if auth != f"Bearer {ADMIN_TOKEN}":
        return ("Forbidden", 403)

    Thread(target=_run_scraper, daemon=True).start()
    return jsonify({"status": "started"}), 202


if __name__ == "__main__":
    # import models inside the app context to avoid circular imports
    with app.app_context():
        from models import Bill, Legislator, BillLegislatorRole, Subject, BillSubject
        db.create_all()  # creates all tables if not exist
        print("✅ Database tables created successfully!")
