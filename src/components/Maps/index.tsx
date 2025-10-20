import React, { useEffect, useState } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Circle,
  Polyline,
  useMapEvents,
  useMap
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Configurar ícones
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

interface MarkerData {
  id: number;
  position: [number, number];
  title: string;
  description: string;
}

function LocationMarker() {
  const [position, setPosition] = useState<[number, number] | null>([-22.6866679, -43.4497615]);

  useMapEvents({
    click(e) {
      setPosition([e.latlng.lat, e.latlng.lng]);
    },
  });

  return position === null ? null : (
    <Marker position={position}>
      <Popup>
        📌 Novo marcador <br />
        Lat: {position[0].toFixed(4)} <br />
        Lng: {position[1].toFixed(4)}
      </Popup>
    </Marker>
  );
}

function CenterButton({ center }: { center: [number, number] }) {
  const map = useMap();

  const handleCenter = () => {
    map.setView(center, 13);
  };

  useEffect(() => {
    handleCenter();
  }, [center]);

  return (
    <div style={{
      position: 'absolute',
      top: '10px',
      right: '10px',
      zIndex: 1000,
      background: 'white',
      padding: '5px 10px',
      border: '2px solid rgba(0,0,0,0.2)',
      borderRadius: '4px',
      cursor: 'pointer'
    }} onClick={handleCenter}>
      🎯 Centralizar
    </div>
  );
}

const MapView: React.FC<MarkerData> = ({
  position,
  title,
  description,
  id = 0
}) => {
  const markers: MarkerData[] = [
    {
      id,
      position,
      title,
      description

    },
  ];

  const polylinePositions: [number, number][] = markers.map(m => m.position);

  return (
    <div style={{ position: 'relative' }}>
      <MapContainer
        center={position!}
        zoom={12}
        style={{ height: '224px', width: '100%' }}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='<a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {markers.map((marker) => (
          <Marker key={marker.id} position={marker.position!}>
            <Popup>
              <strong>{marker.title}</strong><br />
              {marker.description}
            </Popup>
          </Marker>
        ))}

        <Circle
          center={position}
          radius={800}
          pathOptions={{
            color: 'blueviolet',
            fillColor: 'lightblue',
            fillOpacity: 0.2
          }}
        />

        <Polyline
          positions={polylinePositions}
          pathOptions={{
            color: 'red',
            weight: 3,
            opacity: 0.7
          }}
        />
        <LocationMarker />
        <CenterButton center={position} />
      </MapContainer>
    </div>
  );
};

export default MapView;