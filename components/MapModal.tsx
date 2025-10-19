import React from 'react';
import { PollingPlace } from '../types';

interface MapModalProps {
  isOpen: boolean;
  onClose: () => void;
  place: PollingPlace | null;
}

export const MapModal: React.FC<MapModalProps> = ({ isOpen, onClose, place }) => {
  if (!isOpen || !place) return null;

  const embedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(place.address)}&t=&z=15&ie=UTF8&iwloc=q&output=embed`;
  const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.address)}`;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-slate-800 bg-opacity-90 backdrop-blur-lg border border-slate-600 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] aspect-square flex flex-col p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors z-10">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-cyan-300">{place.name}</h2>
          <p className="text-slate-300">{place.address}</p>
        </div>
        <div className="flex-grow rounded-lg overflow-hidden border border-slate-700">
            <iframe
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                src={embedUrl}
                title={`Map of ${place.name}`}
            ></iframe>
        </div>
        <div className="mt-4 text-center">
            <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-cyan-400 text-slate-900 font-bold py-2 px-6 rounded-full text-lg hover:bg-cyan-300 transform hover:scale-105 transition-all"
            >
                Get Directions
            </a>
        </div>
      </div>
    </div>
  );
};
