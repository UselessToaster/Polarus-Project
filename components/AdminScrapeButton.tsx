import React, { useState } from 'react';

export const AdminScrapeButton: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const trigger = async () => {
    setLoading(true);
    setMessage(null);
    try {
      const res = await fetch('/.netlify/functions/trigger-scrape', { method: 'POST' });
      if (!res.ok) {
        const text = await res.text();
        setMessage(`Error: ${res.status} ${text}`);
      } else {
        const json = await res.json();
        setMessage(`Triggered: ${json.status}`);
      }
    } catch (err: any) {
      setMessage(`Exception: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        onClick={trigger}
        disabled={loading}
        className="px-4 py-2 bg-amber-400 text-slate-900 font-semibold rounded-lg shadow-lg hover:brightness-95"
      >
        {loading ? 'Triggering...' : 'Trigger Scrape'}
      </button>
      {message && <div className="mt-2 text-sm text-slate-200 bg-slate-800/60 p-2 rounded">{message}</div>}
    </div>
  );
};
