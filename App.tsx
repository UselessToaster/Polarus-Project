import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { LocationForm } from './components/LocationForm';
import { Dashboard } from './components/Dashboard';
import { MapModal } from './components/MapModal';
import { AboutModal } from './components/AboutModal';
import { fetchVotingData } from './services/votingInfoService';
import { useGeolocation } from './hooks/useGeolocation';
import { VotingData, PollingPlace } from './types';


// This mock function simulates a real reverse geocoding API call.
const getZipFromCoords = async (lat: number, lon: number): Promise<string> => {
    console.log(`Simulating reverse geocoding for ${lat}, ${lon}`);
    if (lat > 34.0 && lat < 34.2 && lon > -118.5 && lon < -118.3) {
        return new Promise(resolve => setTimeout(() => resolve("90210"), 500));
    }
    if (lat > 30.2 && lat < 30.4 && lon > -97.9 && lon < -97.7) {
        return new Promise(resolve => setTimeout(() => resolve("78746"), 500));
    }
    return new Promise(resolve => setTimeout(() => resolve("78746"), 500));
};

const App: React.FC = () => {
  const [zipCode, setZipCode] = useState<string | null>(null);
  const [votingData, setVotingData] = useState<VotingData | null>(null);
  const [appState, setAppState] = useState<'idle' | 'loading' | 'error' | 'success'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');
  
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState<PollingPlace | null>(null);

  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);

  const geolocation = useGeolocation();

  const handleFetchData = useCallback(async (zip: string) => {
    setAppState('loading');
    setVotingData(null);
    setErrorMessage('');
    try {
      const data = await fetchVotingData(zip);
      setVotingData(data);
      setZipCode(zip);
      setAppState('success');
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage('An unknown error occurred.');
      }
      setAppState('error');
    }
  }, []);
  
  const handleUseGeolocation = async () => {
    geolocation.getPosition();
  };

  useEffect(() => {
    if (geolocation.data) {
        const fetchZip = async () => {
            const zip = await getZipFromCoords(geolocation.data.coords.latitude, geolocation.data.coords.longitude);
            handleFetchData(zip);
        };
        fetchZip();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [geolocation.data]);
  
  const handleViewMapClick = (place: PollingPlace) => {
    setSelectedPlace(place);
    setIsMapModalOpen(true);
  };
  
  const handleAboutClick = () => {
    setIsAboutModalOpen(true);
  };

  const resetApp = () => {
      setZipCode(null);
      setVotingData(null);
      setAppState('idle');
      setErrorMessage('');
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans relative overflow-hidden">
      {/* Background Starfield */}
      <div id="stars1" className="absolute top-0 left-0 w-full h-full"></div>
      <div id="stars2" className="absolute top-0 left-0 w-full h-full"></div>
      <div id="stars3" className="absolute top-0 left-0 w-full h-full"></div>
      <style>{`
        @keyframes move-twink-back { from {background-position:0 0;} to {background-position:-10000px 5000px;} }
        #stars1 { background: transparent url('https://www.transparenttextures.com/patterns/stardust.png') repeat top center; animation: move-twink-back 200s linear infinite; }
        #stars2 { background: transparent url('https://www.transparenttextures.com/patterns/stardust.png') repeat top center; opacity: 0.5; animation: move-twink-back 150s linear infinite; }
        #stars3 { background: transparent url('https://www.transparenttextures.com/patterns/stardust.png') repeat top center; opacity: 0.3; animation: move-twink-back 100s linear infinite; }
        @keyframes fade-in { 0% { opacity: 0; transform: translateY(20px); } 100% { opacity: 1; transform: translateY(0); } }
        .animate-fade-in { animation: fade-in 0.5s ease-out forwards; }
      `}</style>
      
      <div className="relative z-10 min-h-screen flex flex-col">
        <Header onAboutClick={handleAboutClick} />
        <main className="flex-grow flex items-center justify-center p-6 pt-24 md:pt-6">
          {!zipCode && appState !== 'loading' && (
            <div className="animate-fade-in">
              <LocationForm
                onLocationSet={handleFetchData}
                onUseGeolocation={handleUseGeolocation}
                geoError={geolocation.error?.message || null}
                geoLoading={geolocation.loading}
              />
               {appState === 'error' && <p className="text-red-400 mt-4 text-center">{errorMessage}</p>}
            </div>
          )}

          {appState === 'loading' && (
            <div className="flex flex-col items-center animate-fade-in">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-cyan-400 mb-4"></div>
              <p className="text-lg text-slate-300">Finding your voting information...</p>
            </div>
          )}

          {appState === 'success' && votingData && zipCode && (
            <div className="w-full animate-fade-in">
                <Dashboard data={votingData} zipCode={zipCode} onViewMap={handleViewMapClick} />
                <div className="text-center mt-8">
                    <button onClick={resetApp} className="text-slate-400 hover:text-cyan-300 transition-colors text-sm">Search another ZIP code</button>
                </div>
            </div>
          )}
        </main>
      </div>

      <MapModal
        isOpen={isMapModalOpen}
        onClose={() => setIsMapModalOpen(false)}
        place={selectedPlace}
      />
      <AboutModal
        isOpen={isAboutModalOpen}
        onClose={() => setIsAboutModalOpen(false)}
      />
    </div>
  );
};

export default App;