import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useTheme } from '../context/ThemeContext';
import { ciliwungRiverCoordinates } from '../data/dummyData';
import { Navigation, Maximize2, Layers } from 'lucide-react';

const dotColor = {
  tinggi: '#ef4444',
  sedang: '#f59e0b',
  rendah: '#22c55e',
};

// 100% Free Public Map Layers (No API Key Required)
const FREE_MAP_LAYERS = {
  osm: {
    id: 'osm',
    label: 'OpenStreetMap',
    icon: '🗺️',
    url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">OpenStreetMap</a> contributors',
    maxZoom: 19,
    className: 'osm-tile-layer',
  },
  satellite: {
    id: 'satellite',
    label: 'Citra Satelit',
    icon: '🛰️',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, USGS, GeoEye, Earthstar Geographics',
    maxZoom: 18,
    className: 'satellite-tile-layer',
  },
  topo: {
    id: 'topo',
    label: 'Topografi',
    icon: '⛰️',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
    attribution: 'Tiles &copy; Esri &mdash; Esri, USGS, FAO, NPS, NRCAN, GeoBase',
    maxZoom: 18,
    className: 'topo-tile-layer',
  },
};

// Create custom glowing radar marker
function createSensorIcon(sensor, isSelected) {
  const color = dotColor[sensor.level] || '#0ea5e9';
  const isHigh = sensor.level === 'tinggi';
  const isMed = sensor.level === 'sedang';

  const pulseHtml = isHigh
    ? `<div class="marker-pulse-ring" style="border-color:${color};"></div><div class="marker-pulse-ring-delayed" style="border-color:${color};"></div>`
    : isMed
    ? `<div class="marker-pulse-ring" style="border-color:${color}; animation-duration: 2.2s;"></div>`
    : '';

  const selectRing = isSelected
    ? `<div style="position:absolute; inset:-8px; border-radius:50%; border:2px dashed #38bdf8; animation: spin-slow 8s linear infinite;"></div>`
    : '';

  const html = `
    <div class="leaflet-sensor-pin" style="position:relative; width:34px; height:34px; display:flex; align-items:center; justify-content:center;">
      ${pulseHtml}
      ${selectRing}
      <div style="
        width: 24px;
        height: 24px;
        border-radius: 50%;
        background: ${color};
        border: 2.5px solid #ffffff;
        box-shadow: 0 0 14px ${color}, 0 2px 6px rgba(0,0,0,0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: 'Space Grotesk', sans-serif;
        font-size: 9px;
        font-weight: 800;
        color: #ffffff;
        cursor: pointer;
        transition: transform 0.2s;
      ">
        ${sensor.id.replace('S-', '')}
      </div>
    </div>
  `;

  return L.divIcon({
    className: 'custom-sensor-div-icon',
    html: html,
    iconSize: [34, 34],
    iconAnchor: [17, 17],
    popupAnchor: [0, -18],
  });
}

export default function CiliwungMap({ sensors = [], selected, setSelected }) {
  const { isDark } = useTheme();
  const [activeLayer, setActiveLayer] = useState('osm');
  const containerRef = useRef(null);
  const mapRef = useRef(null);
  const tileLayerRef = useRef(null);
  const markersRef = useRef({});
  const riverFlowRef = useRef(null);
  const riverGlowRef = useRef(null);

  // Initialize Leaflet Map
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    // Center around Sungai Ciliwung corridor (Bogor - Depok - Jakarta)
    const map = L.map(containerRef.current, {
      center: [-6.35, 106.84],
      zoom: 11,
      scrollWheelZoom: true,
      zoomControl: true,
    });
    mapRef.current = map;

    // Zoom control to bottom left
    if (map.zoomControl) {
      map.zoomControl.setPosition('bottomleft');
    }

    // Outer Glow for Ciliwung River
    const glow = L.polyline(ciliwungRiverCoordinates, {
      color: isDark ? '#06b6d4' : '#0284c7',
      weight: 9,
      opacity: 0.4,
      lineCap: 'round',
      lineJoin: 'round',
    }).addTo(map);
    riverGlowRef.current = glow;

    // Inner River Flow Polyline
    const flow = L.polyline(ciliwungRiverCoordinates, {
      color: isDark ? '#38bdf8' : '#0369a1',
      weight: 3.5,
      opacity: 0.95,
      lineCap: 'round',
      lineJoin: 'round',
    }).addTo(map);

    flow.bindTooltip(
      `<div style="font-family: Inter, sans-serif; font-size: 11px;">
        <strong style="color: #0284c7;">Aliran Utama Sungai Ciliwung</strong>
        <div>Panjang DAS ±119 km dari Puncak ke Teluk Jakarta</div>
      </div>`,
      { sticky: true, direction: 'top', opacity: 0.95 }
    );
    riverFlowRef.current = flow;

    // Ensure map tiles settle properly
    const timer = setTimeout(() => {
      map.invalidateSize();
    }, 200);

    return () => {
      clearTimeout(timer);
      map.remove();
      mapRef.current = null;
    };
  }, []);

  // Update river styling when theme changes
  useEffect(() => {
    if (riverGlowRef.current) {
      riverGlowRef.current.setStyle({
        color: isDark ? '#06b6d4' : '#0284c7',
      });
    }
    if (riverFlowRef.current) {
      riverFlowRef.current.setStyle({
        color: isDark ? '#38bdf8' : '#0369a1',
      });
    }
  }, [isDark]);

  // Handle Free Tile Layer change (No API Key Required)
  useEffect(() => {
    if (!mapRef.current) return;

    if (tileLayerRef.current) {
      mapRef.current.removeLayer(tileLayerRef.current);
    }

    const currentLayerCfg = FREE_MAP_LAYERS[activeLayer] || FREE_MAP_LAYERS.osm;

    const tileLayer = L.tileLayer(currentLayerCfg.url, {
      attribution: currentLayerCfg.attribution,
      maxZoom: currentLayerCfg.maxZoom,
      className: currentLayerCfg.className,
    }).addTo(mapRef.current);

    tileLayerRef.current = tileLayer;
  }, [activeLayer, isDark]);

  // Handle Markers sync
  useEffect(() => {
    if (!mapRef.current) return;
    const map = mapRef.current;

    // Clear old markers
    Object.values(markersRef.current).forEach(m => map.removeLayer(m));
    markersRef.current = {};

    sensors.forEach(sensor => {
      if (!sensor.lat || !sensor.lng) return;

      const isSel = selected?.id === sensor.id;
      const icon = createSensorIcon(sensor, isSel);
      const marker = L.marker([sensor.lat, sensor.lng], { icon }).addTo(map);

      // Popup Content
      const popupHtml = `
        <div style="min-width: 200px; padding: 2px 0;">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px;">
            <span style="font-size: 10px; font-family: 'JetBrains Mono', monospace; color: var(--text-muted);">${sensor.id}</span>
            <span style="padding: 2px 8px; border-radius: 999px; font-size: 10px; font-weight: 700; background: ${dotColor[sensor.level]}22; color: ${dotColor[sensor.level]}; border: 1px solid ${dotColor[sensor.level]}55;">
              ${sensor.level.toUpperCase()}
            </span>
          </div>
          <div style="font-size: 13px; font-weight: 700; color: var(--text-heading); margin-bottom: 2px;">
            ${sensor.nama}
          </div>
          <div style="font-size: 11px; color: var(--text-secondary); margin-bottom: 10px;">
            ${sensor.lokasi || ''} • ${sensor.wilayah || ''}
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 6px; background: var(--bg-panel); padding: 8px; border-radius: 8px; margin-bottom: 10px;">
            <div>
              <div style="font-size: 10px; color: var(--text-muted);">Tinggi Air</div>
              <div style="font-size: 14px; font-weight: 800; color: ${dotColor[sensor.level]};">
                ${sensor.ketinggian} <span style="font-size: 10px;">m</span>
              </div>
            </div>
            <div>
              <div style="font-size: 10px; color: var(--text-muted);">Curah Hujan</div>
              <div style="font-size: 14px; font-weight: 800; color: var(--text-heading);">
                ${sensor.curahHujan} <span style="font-size: 10px;">mm</span>
              </div>
            </div>
          </div>
          <div style="font-size: 10.5px; color: var(--text-muted); font-family: 'JetBrains Mono', monospace;">
            GPS: ${sensor.lat.toFixed(4)}, ${sensor.lng.toFixed(4)}
          </div>
        </div>
      `;

      marker.bindPopup(popupHtml, { className: 'hg-leaflet-popup' });

      marker.on('click', () => {
        setSelected(sensor);
      });

      markersRef.current[sensor.id] = marker;
    });
  }, [sensors, selected?.id]);

  // Handle selected sensor changes -> smooth fly to
  useEffect(() => {
    if (!mapRef.current || !selected?.lat || !selected?.lng) return;
    mapRef.current.flyTo([selected.lat, selected.lng], 13.5, { duration: 1.2 });

    const marker = markersRef.current[selected.id];
    if (marker) {
      marker.openPopup();
    }
  }, [selected]);

  const handleFly = (coords, zoom) => {
    if (mapRef.current) {
      mapRef.current.flyTo(coords, zoom, { duration: 1.2 });
    }
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', minHeight: 460, borderRadius: 12, overflow: 'hidden', border: '1px solid var(--border)' }}>
      {/* Top Map Floating Toolbar */}
      <div
        style={{
          position: 'absolute',
          top: 10,
          left: 10,
          right: 10,
          zIndex: 30,
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 8,
          pointerEvents: 'none',
        }}
      >
        {/* Title badge & Free OSM Indicator */}
        <div
          style={{
            pointerEvents: 'auto',
            display: 'flex',
            alignItems: 'center',
            gap: 7,
            background: 'var(--bg-card)',
            backdropFilter: 'blur(16px)',
            border: '1px solid var(--border)',
            borderRadius: 999,
            padding: '5px 12px',
            boxShadow: 'var(--card-shadow)',
          }}
        >
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#0ea5e9' }} className="blink" />
          <span style={{ fontSize: 11.5, fontWeight: 700, color: 'var(--text-heading)' }}>
            DAS Sungai Ciliwung
          </span>
          <span style={{ fontSize: 10, color: '#22c55e', fontWeight: 600, fontFamily: 'JetBrains Mono, monospace' }}>
            ● 100% Free Maps
          </span>
        </div>

        {/* Toolbar Controls: Focus Points & Free Layer Switcher */}
        <div
          style={{
            pointerEvents: 'auto',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            overflowX: 'auto',
            maxWidth: '100%',
          }}
        >
          {/* Layer Selector */}
          <div
            style={{
              display: 'flex',
              background: 'var(--bg-card)',
              backdropFilter: 'blur(14px)',
              border: '1px solid var(--border)',
              borderRadius: 8,
              padding: 2,
              gap: 2,
            }}
          >
            {Object.values(FREE_MAP_LAYERS).map(layer => {
              const active = activeLayer === layer.id;
              return (
                <button
                  key={layer.id}
                  type="button"
                  onClick={() => setActiveLayer(layer.id)}
                  title={`Ganti layer ke ${layer.label}`}
                  style={{
                    background: active ? 'var(--accent)' : 'transparent',
                    color: active ? '#ffffff' : 'var(--text-secondary)',
                    border: 'none',
                    borderRadius: 6,
                    padding: '4px 8px',
                    fontSize: 10.5,
                    fontWeight: active ? 700 : 500,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 3,
                    transition: 'all 0.18s',
                  }}
                >
                  <span>{layer.icon}</span>
                  <span className="layer-text">{layer.label}</span>
                </button>
              );
            })}
          </div>

          {/* Quick Focus Buttons */}
          <button
            type="button"
            onClick={() => handleFly([-6.35, 106.84], 11)}
            style={{
              background: 'var(--bg-card)',
              backdropFilter: 'blur(12px)',
              border: '1px solid var(--border)',
              borderRadius: 8,
              padding: '5px 9px',
              fontSize: 11,
              fontWeight: 600,
              color: 'var(--text-secondary)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 4,
              transition: 'all 0.2s',
            }}
          >
            <Maximize2 size={12} color="var(--accent)" />
            Semua
          </button>

          <button
            type="button"
            onClick={() => handleFly([-6.6322, 106.8378], 13.5)}
            style={{
              background: 'var(--bg-card)',
              backdropFilter: 'blur(12px)',
              border: '1px solid var(--border)',
              borderRadius: 8,
              padding: '5px 9px',
              fontSize: 11,
              fontWeight: 600,
              color: 'var(--text-secondary)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 4,
              transition: 'all 0.2s',
            }}
          >
            <Navigation size={12} color="#ef4444" />
            Katulampa
          </button>

          <button
            type="button"
            onClick={() => handleFly([-6.4025, 106.8315], 13.5)}
            style={{
              background: 'var(--bg-card)',
              backdropFilter: 'blur(12px)',
              border: '1px solid var(--border)',
              borderRadius: 8,
              padding: '5px 9px',
              fontSize: 11,
              fontWeight: 600,
              color: 'var(--text-secondary)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 4,
              transition: 'all 0.2s',
            }}
          >
            <Navigation size={12} color="#f59e0b" />
            Depok
          </button>

          <button
            type="button"
            onClick={() => handleFly([-6.2088, 106.8488], 14)}
            style={{
              background: 'var(--bg-card)',
              backdropFilter: 'blur(12px)',
              border: '1px solid var(--border)',
              borderRadius: 8,
              padding: '5px 9px',
              fontSize: 11,
              fontWeight: 600,
              color: 'var(--text-secondary)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 4,
              transition: 'all 0.2s',
            }}
          >
            <Navigation size={12} color="#0ea5e9" />
            Manggarai
          </button>
        </div>
      </div>

      {/* Main Leaflet Map DOM Container */}
      <div
        ref={containerRef}
        style={{
          width: '100%',
          height: '100%',
          minHeight: 460,
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
          flexDirection: 'column',
          gap: 6,
          fontSize: 11,
        }}
      >
        <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Status Siaga Ketinggian
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <span style={{ width: 9, height: 9, borderRadius: '50%', background: '#ef4444', display: 'inline-block' }} />
            <span style={{ color: 'var(--text-secondary)' }}>Siaga 1 (&gt;3.5m)</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <span style={{ width: 9, height: 9, borderRadius: '50%', background: '#f59e0b', display: 'inline-block' }} />
            <span style={{ color: 'var(--text-secondary)' }}>Siaga 2 (1.5-3.5m)</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <span style={{ width: 9, height: 9, borderRadius: '50%', background: '#22c55e', display: 'inline-block' }} />
            <span style={{ color: 'var(--text-secondary)' }}>Normal (&lt;1.5m)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
