import React, { useEffect, useState } from 'react';
import { simplifyInitiative, simplifyLegislativeBill } from '../services/geminiService';
import { Proposition, Amendment, LegislativeBill } from '../types';

type SimplifiableItem = Proposition | Amendment | LegislativeBill;

interface SimplifiedContentModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: SimplifiableItem | null;
}

const LoadingSpinner: React.FC = () => (
  <div className="flex justify-center items-center h-full">
    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-cyan-400"></div>
  </div>
);

// Type guard to differentiate a bill from an initiative (Prop/Amendment)
function isLegislativeBill(item: any): item is LegislativeBill {
  return item && 'level' in item && 'status' in item;
}

export const SimplifiedContentModal: React.FC<SimplifiedContentModalProps> = ({ isOpen, onClose, item }) => {
  const [simplifiedText, setSimplifiedText] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen && item) {
      const fetchSimplifiedText = async () => {
        setIsLoading(true);
        setSimplifiedText('');
        let result;
        if (isLegislativeBill(item)) {
            result = await simplifyLegislativeBill(item);
        } else {
            // It's either a Proposition or an Amendment
            result = await simplifyInitiative(item);
        }
        setSimplifiedText(result);
        setIsLoading(false);
      };
      fetchSimplifiedText();
    }
  }, [isOpen, item]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center p-4"
      onClick={onClose}
    >
      <div 
        className="bg-slate-800 bg-opacity-80 backdrop-blur-lg border border-slate-600 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] overflow-y-auto p-8 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h2 className="text-2xl font-bold text-cyan-300 mb-2">Simplified:</h2>
        <h3 className="text-xl text-slate-100 mb-6">{item?.title}</h3>
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <div className="prose prose-invert prose-p:text-slate-300 prose-strong:text-cyan-300 prose-headings:text-slate-100 whitespace-pre-wrap">
            {simplifiedText.split('\n').map((line, i) => (
                <p key={i}>{line.replace(/\*\*/g, '')}</p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
