import React from 'react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Credits: React.FC = () => (
    <p className="text-slate-400">
      Background Photo by{' '}
      <a
        href="https://unsplash.com/@ketandesign?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
        target="_blank"
        rel="noopener noreferrer"
        className="text-cyan-400 underline underline-offset-2 hover:text-white transition-colors"
      >
        Ketan Pandey
      </a>
      {' '}on{' '}
      <a
        href="https://unsplash.com/photos/stars-in-the-sky-during-night-time-H9VHLtEd4hA?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
        target="_blank"
        rel="noopener noreferrer"
        className="text-cyan-400 underline underline-offset-2 hover:text-white transition-colors"
      >
        Unsplash
      </a>
    </p>
);

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-slate-800 bg-opacity-90 backdrop-blur-lg border border-slate-600 rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] flex flex-col p-8 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors z-10">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <h2 className="text-3xl font-bold text-cyan-300 mb-6 text-center">About Project Polarus</h2>
        
        <div className="space-y-4 text-slate-300 overflow-y-auto">
          <div>
            <p>Polarus is an application designed to help users view their voting ballots, find polling places, and understand complex ballot measures. It provides simplified explanations of bills and sends reminders for important voting deadlines. This project was developed at HackTX 2025.</p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-slate-100">Developers</h3>
            <div className="flex flex-col space-y-1">
              <a href="https://github.com/UselessToaster" target="_blank" rel="noopener noreferrer" className="text-cyan-400 underline underline-offset-2 hover:text-white transition-colors w-fit">Tianna Davis</a>
              <a href="https://github.com/RuthA120" target="_blank" rel="noopener noreferrer" className="text-cyan-400 underline underline-offset-2 hover:text-white transition-colors w-fit">Ruth Assefa</a>
              <a href="https://github.com/Anoushka-kancherla" target="_blank" rel="noopener noreferrer" className="text-cyan-400 underline underline-offset-2 hover:text-white transition-colors w-fit">Anoushka Kancherla</a>
              <a href="https://github.com/ila-w" target="_blank" rel="noopener noreferrer" className="text-cyan-400 underline underline-offset-2 hover:text-white transition-colors w-fit">Ila Wallace</a>
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-slate-100">Technology</h3>
            <p>The skeletal framework for this application was created in Google AI Studio using Gemini 2.5 Pro. The application logo was created using Canva.</p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-slate-100">Credits</h3>
            <Credits />
          </div>
        </div>
        
        <div className="text-center text-sm text-slate-500 mt-6 pt-4 border-t border-slate-700">
          <p>Version 1.0</p>
          <p>Created: October 18th, 2025</p>
          <p>Last Updated: October 19th, 2025</p>
        </div>
        
        <div className="mt-4 text-center">
            <button
                onClick={onClose}
                className="inline-block bg-cyan-400 text-slate-900 font-bold py-2 px-6 rounded-full text-lg hover:bg-cyan-300 transform hover:scale-105 transition-all"
            >
                Close
            </button>
        </div>
      </div>
    </div>
  );
};