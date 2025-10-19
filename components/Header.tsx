import React from 'react';
import { PolarusLogo } from './icons/PolarusLogo';

export const Header: React.FC<{ onAboutClick: () => void; }> = ({ onAboutClick }) => {
  return (
    <header className="absolute top-0 left-0 right-0 z-20 py-4 px-6 md:px-12 flex items-center justify-between bg-transparent">
      <div className="flex items-center space-x-4">
        <PolarusLogo className="h-10 w-10" />
        <h1 className="text-2xl md:text-3xl font-bold text-slate-100 tracking-wider">
          Polarus
        </h1>
      </div>
      <button 
        onClick={onAboutClick}
        className="bg-slate-700/50 backdrop-blur-sm border border-slate-600 text-slate-200 h-10 w-10 rounded-full flex items-center justify-center hover:bg-slate-600/70 hover:border-slate-500 transition-colors"
        aria-label="About this application"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </button>
    </header>
  );
};