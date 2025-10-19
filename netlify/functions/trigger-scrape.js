const fetch = require('node-fetch');

// Netlify Function: POST /.netlify/functions/trigger-scrape
// Expects env vars: BACKEND_URL (e.g. https://your-backend.com), BACKEND_ADMIN_TOKEN

exports.handler = async function (event, context) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const BACKEND_URL = process.env.BACKEND_URL;
  const BACKEND_ADMIN_TOKEN = process.env.BACKEND_ADMIN_TOKEN;

  if (!BACKEND_URL || !BACKEND_ADMIN_TOKEN) {
    return { statusCode: 500, body: 'Missing BACKEND_URL or BACKEND_ADMIN_TOKEN environment variable' };
  }

  try {
    const res = await fetch(`${BACKEND_URL.replace(/\/$/, '')}/admin/scrape`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${BACKEND_ADMIN_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ trigger: 'netlify_function' })
    });

    const text = await res.text();

    return {
      statusCode: res.status,
      body: JSON.stringify({ status: res.status, body: text })
    };
  } catch (err) {
    return {
      statusCode: 502,
      body: JSON.stringify({ error: String(err) })
    };
  }
};
