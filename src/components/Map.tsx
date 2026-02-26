"use client";

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, CircleMarker, Marker, useMap, Circle, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix broken Leaflet icons in Next.js/Webpack
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Custom rotating outline icon using Tailwind
const createRotatingOutlineIcon = (colorClass: string) => {
  return L.divIcon({
    className: 'custom-rotating-icon',
    html: `
      <div class="relative flex h-24 w-24 items-center justify-center">
        <div class="absolute h-full w-full rounded-full border-[3px] border-dashed ${colorClass} animate-[spin_5s_linear_infinite] opacity-90 drop-shadow-md"></div>
        <div class="absolute h-12 w-12 rounded-full border-[3px] border-dotted ${colorClass} animate-[spin_3s_linear_infinite_reverse] opacity-70"></div>
      </div>
    `,
    iconSize: [96, 96],
    iconAnchor: [48, 48],
  });
};

const claimedRotatingIcon = createRotatingOutlineIcon('border-red-500');
const capturedRotatingIcon = createRotatingOutlineIcon('border-emerald-500');

function MapBounds({ claimedPos, capturedPos }: { claimedPos?: [number, number], capturedPos?: [number, number] }) {
  const map = useMap();

  useEffect(() => {
    if (claimedPos && capturedPos) {
      const bounds = L.latLngBounds([claimedPos, capturedPos]);
      // Add some padding to bounds so circles aren't cut off
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 16 });
    } else if (claimedPos) {
      map.setView(claimedPos, 15);
    } else if (capturedPos) {
      map.setView(capturedPos, 15);
    }
  }, [map, claimedPos, capturedPos]);

  return null;
}

export interface MapProps {
  claimedLat?: number;
  claimedLng?: number;
  capturedLat?: number;
  capturedLng?: number;
}

export default function VerificationMap({ claimedLat, claimedLng, capturedLat, capturedLng }: MapProps) {
  // We need to wait for client mount to avoid hydration mismatch with Leaflet
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="h-full w-full bg-slate-100 animate-pulse flex items-center justify-center text-slate-400">Loading Map...</div>;
  }

  const claimedPos: [number, number] | undefined = claimedLat && claimedLng ? [claimedLat, claimedLng] : undefined;
  const capturedPos: [number, number] | undefined = capturedLat && capturedLng ? [capturedLat, capturedLng] : undefined;

  // Default position if null
  const defaultCenter: [number, number] = claimedPos || capturedPos || [20.5937, 78.9629];

  return (
    <MapContainer
      center={defaultCenter}
      zoom={13}
      style={{ height: '100%', width: '100%', zIndex: 0 }}
      scrollWheelZoom={false}
      dragging={false}
      doubleClickZoom={false}
      keyboard={false}
      zoomControl={false}
      touchZoom={false}
      preferCanvas={true}
    >
      <TileLayer
        attribution='&copy; Google Maps'
        url="https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}&scale=2"
      />

      {claimedPos && (
        <>
          <Circle
            center={claimedPos}
            radius={500}
            pathOptions={{ color: '#ef4444', fillColor: '#ef4444', fillOpacity: 0.15, weight: 2, dashArray: '4, 8' }}
          />
          <Marker position={claimedPos} icon={claimedRotatingIcon} />
          <CircleMarker
            center={claimedPos}
            radius={4}
            pathOptions={{ color: '#7f1d1d', fillColor: '#ef4444', fillOpacity: 1, weight: 1 }}
          />
        </>
      )}

      {capturedPos && (
        <>
          <Circle
            center={capturedPos}
            radius={500}
            pathOptions={{ color: '#10b981', fillColor: '#10b981', fillOpacity: 0.15, weight: 2, dashArray: '4, 8' }}
          />
          <Marker position={capturedPos} icon={capturedRotatingIcon} />
          <CircleMarker
            center={capturedPos}
            radius={4}
            pathOptions={{ color: '#064e3b', fillColor: '#10b981', fillOpacity: 1, weight: 1 }}
          />
        </>
      )}

      {claimedPos && capturedPos && (
        <Polyline
          positions={[claimedPos, capturedPos]}
          pathOptions={{ color: '#64748b', weight: 4, dashArray: '10, 10', opacity: 0.6 }}
        />
      )}

      <MapBounds claimedPos={claimedPos} capturedPos={capturedPos} />
    </MapContainer>
  );
}
