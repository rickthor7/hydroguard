import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useTheme } from '../context/ThemeContext';
import { simulasiRuteEvakuasi } from '../data/masyarakatData';

export default function EvakuasiMap({ currentStep = 0, isSimulating = false }) {
  const { isDark } = useTheme();
  const containerRef = useRef(null);
  const mapRef = useRef(null);
  const tileLayerRef = useRef(null);
  const walkerMarkerRef = useRef(null);
  const routePolylineRef = useRef(null);

  // Initialize Leaflet Map
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    // Center on Kampung Melayu - Otista Area
    const map = L.map(containerRef.current, {
      center: [-6.2310, 106.8670],
      zoom: 15,
      scrollWheelZoom: true,
      zoomControl: true,
    });
    mapRef.current = map;

    if (map.zoomControl) {
      map.zoomControl.setPosition('bottomleft');
    }

    // 1. Polygon Zona Banjir / Genangan
    const floodPolygon = L.polygon(simulasiRuteEvakuasi.zonaGenanganBanjir, {
      color: '#ef4444',
      fillColor: '#dc2626',
      fillOpacity: 0.35,
      weight: 2,
      dashArray: '6, 6',
    }).addTo(map);

    floodPolygon.bindTooltip(
      `<div style="font-family:Inter,sans-serif;font-size:11px;font-weight:700;color:#ef4444;">
        ⚠️ ZONA LUAPAN BANJIR CILIWUNG (KEDALAMAN 90 - 150 cm)
      </div>`,
      { sticky: true, direction: 'center', permanent: false }
    );

    // 2. Safe Evacuation Route (Glowing Green)
    const routeOuter = L.polyline(simulasiRuteEvakuasi.ruteAman, {
      color: '#22c55e',
      weight: 8,
      opacity: 0.35,
      lineCap: 'round',
      lineJoin: 'round',
    }).addTo(map);

    const routeCore = L.polyline(simulasiRuteEvakuasi.ruteAman, {
      color: '#10b981',
      weight: 4,
      opacity: 0.95,
      lineCap: 'round',
      lineJoin: 'round',
    }).addTo(map);
    routePolylineRef.current = routeCore;

    // 3. Start Point Marker (Rumah Warga)
    const startIcon = L.divIcon({
      className: 'evac-custom-icon',
      html: `
        <div style="position:relative;display:flex;align-items:center;justify-content:center;width:36px;height:36px;">
          <div style="position:absolute;inset:-4px;border-radius:50%;border:2px solid #f59e0b;" class="blink"></div>
          <div style="width:30px;height:30px;border-radius:50%;background:#f59e0b;color:#fff;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:14px;box-shadow:0 0 16px rgba(245,158,11,0.6);border:2px solid #fff;">
            🏠
          </div>
        </div>
      `,
      iconSize: [36, 36],
      iconAnchor: [18, 18],
    });

    const startMarker = L.marker(simulasiRuteEvakuasi.titikAwal.koordinat, { icon: startIcon }).addTo(map);
    startMarker.bindPopup(`
      <div style="padding:4px 0;font-family:Inter,sans-serif;">
        <strong style="color:#f59e0b;font-size:12px;">Titik Asal Pemukiman Warga</strong>
        <div style="font-size:11px;color:var(--text-heading);margin-top:2px;">${simulasiRuteEvakuasi.titikAwal.nama}</div>
        <div style="font-size:10px;color:var(--text-muted);margin-top:4px;">${simulasiRuteEvakuasi.titikAwal.elevasi}</div>
      </div>
    `);

    // 4. Destination Marker (Posko Pengungsian GOR Otista)
    const destIcon = L.divIcon({
      className: 'evac-custom-icon',
      html: `
        <div style="position:relative;display:flex;align-items:center;justify-content:center;width:42px;height:42px;">
          <div style="position:absolute;inset:-6px;border-radius:50%;border:2.5px solid #22c55e;" class="radar"></div>
          <div style="width:34px;height:34px;border-radius:50%;background:#10b981;color:#fff;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:16px;box-shadow:0 0 20px rgba(34,197,94,0.7);border:2px solid #fff;">
            🛡️
          </div>
        </div>
      `,
      iconSize: [42, 42],
      iconAnchor: [21, 21],
    });

    const destMarker = L.marker(simulasiRuteEvakuasi.titikTujuan.koordinat, { icon: destIcon }).addTo(map);
    destMarker.bindPopup(`
      <div style="padding:4px 0;font-family:Inter,sans-serif;">
        <strong style="color:#10b981;font-size:12px;">Posko Evakuasi Aman (Bebas Genangan)</strong>
        <div style="font-size:12px;font-weight:700;color:var(--text-heading);margin-top:2px;">${simulasiRuteEvakuasi.titikTujuan.nama}</div>
        <div style="font-size:10.5px;color:var(--text-secondary);margin-top:4px;">${simulasiRuteEvakuasi.titikTujuan.kapasitas}</div>
        <div style="font-size:10px;color:#22c55e;font-weight:600;margin-top:2px;">${simulasiRuteEvakuasi.titikTujuan.elevasi}</div>
      </div>
    `);

    // 5. Danger Point Markers
    simulasiRuteEvakuasi.titikBahaya.forEach(danger => {
      const dangerIcon = L.divIcon({
        className: 'evac-custom-icon',
        html: `
          <div style="position:relative;display:flex;align-items:center;justify-content:center;width:28px;height:28px;">
            <div style="width:24px;height:24px;border-radius:6px;background:#ef4444;color:#fff;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:800;box-shadow:0 0 12px rgba(239,68,68,0.7);border:2px solid #fff;">
              ⚠️
            </div>
          </div>
        `,
        iconSize: [28, 28],
        iconAnchor: [14, 14],
      });

      const dangerMarker = L.marker(danger.koordinat, { icon: dangerIcon }).addTo(map);
      dangerMarker.bindPopup(`
        <div style="padding:4px 0;font-family:Inter,sans-serif;color:#ef4444;">
          <strong style="font-size:11.5px;">TITIK BAHAYA — HINDARI!</strong>
          <div style="font-size:11px;color:var(--text-heading);margin-top:3px;">${danger.nama}</div>
        </div>
      `);
    });

    // 6. Walker Avatar Marker (For live simulation)
    const walkerIcon = L.divIcon({
      className: 'evac-custom-icon',
      html: `
        <div style="position:relative;display:flex;align-items:center;justify-content:center;width:34px;height:34px;">
          <div style="position:absolute;inset:-4px;border-radius:50%;border:2px solid #38bdf8;" class="blink"></div>
          <div style="width:26px;height:26px;border-radius:50%;background:#0284c7;color:#fff;display:flex;align-items:center;justify-content:center;font-size:14px;box-shadow:0 0 14px #0284c7;border:2px solid #fff;">
            🚶
          </div>
        </div>
      `,
      iconSize: [34, 34],
      iconAnchor: [17, 17],
    });

    const walkerMarker = L.marker(simulasiRuteEvakuasi.ruteAman[0], { icon: walkerIcon, zIndexOffset: 1000 }).addTo(map);
    walkerMarkerRef.current = walkerMarker;

    const timer = setTimeout(() => {
      map.invalidateSize();
    }, 200);

    return () => {
      clearTimeout(timer);
      map.remove();
      mapRef.current = null;
    };
  }, []);

  // Sync Map Tile Layer with Theme
  useEffect(() => {
    if (!mapRef.current) return;

    if (tileLayerRef.current) {
      mapRef.current.removeLayer(tileLayerRef.current);
    }

    const tileUrl = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
    const tileLayer = L.tileLayer(tileUrl, {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 19,
      className: 'osm-tile-layer',
    }).addTo(mapRef.current);

    tileLayerRef.current = tileLayer;
  }, [isDark]);

  // Sync simulation step with walker marker position
  useEffect(() => {
    if (!walkerMarkerRef.current || !mapRef.current) return;

    const stepIndex = Math.min(Math.max(currentStep, 0), simulasiRuteEvakuasi.ruteAman.length - 1);
    const targetCoord = simulasiRuteEvakuasi.ruteAman[stepIndex];

    walkerMarkerRef.current.setLatLng(targetCoord);

    mapRef.current.panTo(targetCoord, {
      animate: true,
      duration: 0.8,
    });
  }, [currentStep]);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', minHeight: 380, borderRadius: 14, overflow: 'hidden', border: '1px solid var(--border)' }}>
      {/* Top Map Floating Badge */}
      <div
        style={{
          position: 'absolute',
          top: 10,
          left: 10,
          zIndex: 30,
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          background: 'var(--bg-card)',
          backdropFilter: 'blur(16px)',
          border: '1px solid var(--border)',
          borderRadius: 999,
          padding: '4px 12px',
          boxShadow: 'var(--card-shadow)',
        }}
      >
        <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#22c55e' }} className="blink" />
        <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-heading)' }}>
          Rute Evakuasi EvacSafe™ Real-Time
        </span>
      </div>

      {/* DOM Map Container */}
      <div
        ref={containerRef}
        style={{
          width: '100%',
          height: '100%',
          minHeight: 380,
          background: isDark ? '#020c1b' : '#e2e8f0',
        }}
      />

      {/* Floating Bottom Legend */}
      <div
        style={{
          position: 'absolute',
          bottom: 10,
          right: 10,
          zIndex: 30,
          background: 'var(--bg-card)',
          backdropFilter: 'blur(16px)',
          border: '1px solid var(--border)',
          borderRadius: 10,
          padding: '8px 12px',
          boxShadow: 'var(--card-shadow)',
          display: 'flex',
          flexWrap: 'wrap',
          gap: 12,
          fontSize: 10.5,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          <span style={{ width: 14, height: 4, borderRadius: 2, background: '#10b981', display: 'inline-block' }} />
          <span style={{ color: 'var(--text-secondary)' }}>Jalur Evakuasi Bebas Banjir</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          <span style={{ width: 10, height: 10, borderRadius: 3, background: 'rgba(239,68,68,0.4)', border: '1px solid #ef4444', display: 'inline-block' }} />
          <span style={{ color: 'var(--text-secondary)' }}>Zona Genangan (&gt;90cm)</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          <span style={{ fontSize: 11 }}>⚠️</span>
          <span style={{ color: 'var(--text-secondary)' }}>Titik Berbahaya / Arus</span>
        </div>
      </div>
    </div>
  );
}
