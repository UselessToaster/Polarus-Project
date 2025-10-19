# Minimal Dockerfile for Polarus-Project
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
ENV PYTHONUNBUFFERED=1
ENV FLASK_APP=app.py
CMD ["gunicorn", "app:app", "--bind", "0.0.0.0:8000", "--workers", "2"]
