
import { useState, useEffect } from 'react';

interface GeolocationState {
  loading: boolean;
  error: GeolocationPositionError | null;
  data: GeolocationPosition | null;
}

export const useGeolocation = () => {
  const [state, setState] = useState<GeolocationState>({
    loading: false,
    error: null,
    data: null,
  });

  const getPosition = () => {
    if (!navigator.geolocation) {
      setState(s => ({ ...s, error: { message: "Geolocation is not supported by your browser." } as GeolocationPositionError }));
      return;
    }

    setState(s => ({ ...s, loading: true }));
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setState({ loading: false, error: null, data: position });
      },
      (error) => {
        setState({ loading: false, error, data: null });
      }
    );
  };

  return { ...state, getPosition };
};
