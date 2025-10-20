import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';

interface UseLeafletMapProps {
  center: [number, number];
  zoom: number;
}

export const useLeafletMap = ({ center, zoom }: UseLeafletMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);
  const [isMapReady, setIsMapReady] = useState(false);

  useEffect(() => {
    if (mapRef.current && !mapInstance.current) {
      mapInstance.current = L.map(mapRef.current).setView(center, zoom);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(mapInstance.current);

      setIsMapReady(true);
    }

    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
        setIsMapReady(false);
      }
    };
  }, [center, zoom]);

  const addMarker = (position: [number, number], popup?: string) => {
    if (mapInstance.current) {
      const marker = L.marker(position).addTo(mapInstance.current);
      if (popup) marker.bindPopup(popup);
      return marker;
    }
  };

  return {
    mapRef,
    mapInstance: mapInstance.current,
    isMapReady,
    addMarker
  };
};