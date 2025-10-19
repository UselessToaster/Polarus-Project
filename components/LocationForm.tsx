
import React, { useState } from 'react';

interface LocationFormProps {
  onLocationSet: (zip: string) => void;
  onUseGeolocation: () => void;
  geoError: string | null;
  geoLoading: boolean;
}

export const LocationForm: React.FC<LocationFormProps> = ({ onLocationSet, onUseGeolocation, geoError, geoLoading }) => {
  const [zip, setZip] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (/^\d{5}$/.test(zip)) {
      setError('');
      onLocationSet(zip);
    } else {
      setError('Please enter a valid 5-digit ZIP code.');
    }
  };

  return (
    <div className="w-full max-w-md text-center">
      <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Unlock Your Ballot.</h2>
      <p className="text-lg md:text-xl text-slate-300 mb-8">Enter your ZIP code to find personalized voting information.</p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={zip}
          onChange={(e) => setZip(e.target.value)}
          placeholder="Enter 5-digit ZIP Code"
          className="w-full px-5 py-3 text-lg text-center bg-slate-700/50 border-2 border-slate-600 rounded-full text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-all"
        />
        {error && <p className="text-red-400 text-sm">{error}</p>}
        <button
          type="submit"
          className="w-full bg-cyan-400 text-slate-900 font-bold py-3 px-6 rounded-full text-lg hover:bg-cyan-300 transform hover:scale-105 transition-all"
        >
          Find My Voting Info
        </button>
      </form>
      <div className="relative flex py-5 items-center">
        <div className="flex-grow border-t border-slate-600"></div>
        <span className="flex-shrink mx-4 text-slate-400">OR</span>
        <div className="flex-grow border-t border-slate-600"></div>
      </div>
      <button
        onClick={onUseGeolocation}
        disabled={geoLoading}
        className="w-full bg-slate-700 text-white font-bold py-3 px-6 rounded-full text-lg hover:bg-slate-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {geoLoading ? 'Finding You...' : 'Use My Current Location'}
      </button>
      {geoError && <p className="text-red-400 text-sm mt-4">{geoError}</p>}
    </div>
  );
};
