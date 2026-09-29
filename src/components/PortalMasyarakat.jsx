import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CloudLightning, CloudRain, Sun, Wind, Droplets, AlertTriangle, ShieldCheck,
  Navigation, Footprints, Play, Pause, RotateCcw, PhoneCall, CheckSquare, Square,
  MapPin, Clock, ShieldAlert, AlertOctagon, HelpCircle, HeartHandshake, ZapOff,
  Home, ChevronRight, Share2, Compass, Radio
} from 'lucide-react';
import {
  cuacaWarga, daftarWilayahWarga, simulasiRuteEvakuasi,
  mitigasiTutorials, kontakDarurat
} from '../data/masyarakatData';
import EvakuasiMap from './EvakuasiMap';

export default function PortalMasyarakat() {
  const [activeTab, setActiveTab] = useState('evakuasi');
  const [selectedWilayah, setSelectedWilayah] = useState(daftarWilayahWarga[0]);
  const [mitigasiFase, setMitigasiFase] = useState('praBencana');
  const [completedChecklist, setCompletedChecklist] = useState({
    'pra-1': true,
    'pra-2': true,
  });

  // Simulation state
  const [simStep, setSimStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // Auto-play simulation interval
  useEffect(() => {
    let timer;
    if (isPlaying) {
      timer = setInterval(() => {
        setSimStep(prev => {
          if (prev >= simulasiRuteEvakuasi.langkahNavigasi.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 3500);
    }
    return () => clearInterval(timer);
  }, [isPlaying]);

  const toggleChecklist = (id) => {
    setCompletedChecklist(prev => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const currentNav = simulasiRuteEvakuasi.langkahNavigasi[simStep] || simulasiRuteEvakuasi.langkahNavigasi[0];

  const shareEvakuasi = () => {
    const text = `🚨 *PANDUAN EVAKUASI BANJIR HYDROGUARD*\n📍 Dari: ${simulasiRuteEvakuasi.titikAwal.nama}\n🛡️ Menuju Posko Aman: ${simulasiRuteEvakuasi.titikTujuan.nama}\nJalur: Hindari kolong jembatan! Lewat Jl. Otista Raya.\nHubungi Darurat BPBD: 112`;
    if (navigator.share) {
      navigator.share({ title: 'Rute Evakuasi Banjir', text }).catch(() => {});
    } else {
      navigator.clipboard.writeText(text);
      alert('Teks rute evakuasi berhasil disalin ke clipboard! Bagikan ke grup WhatsApp RT/RW Anda.');
    }
  };

  return (
    <section id="portal-warga" style={{ padding: '80px 0', position: 'relative' }}>
      <div className="grid-bg" style={{ position: 'absolute', inset: 0, opacity: 0.4 }} />
      <div style={{ position: 'absolute', top: '15%', right: '10%', width: 450, height: 450, borderRadius: '50%', background: 'radial-gradient(circle, rgba(16,185,129,0.06), transparent 70%)', filter: 'blur(60px)', pointerEvents: 'none' }} />

      <div style={{ position: 'relative', maxWidth: 1280, margin: '0 auto', padding: '0 20px' }}>
        
        {/* Header Section */}
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 7,
              background: 'rgba(16,185,129,0.12)',
              border: '1px solid rgba(16,185,129,0.3)',
              borderRadius: 999,
              padding: '4px 14px',
              fontSize: 11.5,
              fontWeight: 700,
              color: '#10b981',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              marginBottom: 12,
            }}
          >
            <ShieldCheck size={14} color="#10b981" />
            Portal Khusus Masyarakat & Siaga Bencana
          </div>

          <h2 style={{ fontSize: 'clamp(24px, 4vw, 40px)', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: 10 }}>
            Pusat Kesiapsiagaan <span className="grad-text">Warga Mandiri</span>
          </h2>

          <p style={{ fontSize: 14.5, color: 'var(--text-secondary)', maxWidth: 620, margin: '0 auto', lineHeight: 1.65 }}>
            Pantau prakiraan cuaca BMKG, prediksi banjir di kelurahan Anda, simulasi rute evakuasi bebas genangan, dan panduan mitigasi darurat.
          </p>
        </div>

        {/* Emergency SOS Hotlines Quick Bar */}
        <div
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            borderRadius: 12,
            padding: '10px 16px',
            marginBottom: 24,
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 12,
            backdropFilter: 'blur(16px)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <PhoneCall size={16} color="#ef4444" className="blink" />
            <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-heading)' }}>
              Panggilan Darurat Gratis:
            </span>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 10 }}>
            {kontakDarurat.map(k => (
              <a
                key={k.nama}
                href={`tel:${k.nomor}`}
                style={{
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  background: 'var(--bg-input)',
                  border: `1px solid ${k.warna}35`,
                  borderRadius: 8,
                  padding: '4px 10px',
                  fontSize: 11,
                  color: 'var(--text-primary)',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = k.warna; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = `${k.warna}35`; }}
              >
                <span style={{ fontWeight: 800, color: k.warna }}>{k.nomor}</span>
                <span style={{ color: 'var(--text-secondary)' }}>({k.nama.split(' ')[0]})</span>
              </a>
            ))}
          </div>
        </div>

        {/* Main Tab Navigation */}
        <div
          style={{
            display: 'flex',
            gap: 8,
            overflowX: 'auto',
            paddingBottom: 6,
            marginBottom: 20,
            borderBottom: '1px solid var(--border-subtle)',
          }}
        >
          {[
            { id: 'evakuasi', label: 'Simulasi Rute Evakuasi', icon: Navigation, badge: 'Interaktif' },
            { id: 'wilayah', label: 'Prediksi Risiko Kelurahan', icon: ShieldAlert, badge: `${daftarWilayahWarga.length} Wilayah` },
            { id: 'cuaca', label: 'Prakiraan Cuaca BMKG', icon: CloudLightning, badge: 'Live' },
            { id: 'mitigasi', label: 'Panduan Mitigasi & Checklist', icon: CheckSquare, badge: 'Siaga 1' },
          ].map(tab => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  background: active ? 'var(--accent)' : 'var(--bg-card)',
                  color: active ? '#ffffff' : 'var(--text-secondary)',
                  border: `1px solid ${active ? 'var(--accent)' : 'var(--border)'}`,
                  borderRadius: 10,
                  padding: '10px 16px',
                  fontSize: 13,
                  fontWeight: active ? 700 : 500,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.2s',
                  boxShadow: active ? '0 0 18px var(--glow-blue)' : 'none',
                }}
              >
                <Icon size={16} />
                <span>{tab.label}</span>
                {tab.badge && (
                  <span
                    style={{
                      fontSize: 10,
                      fontWeight: 700,
                      background: active ? 'rgba(255,255,255,0.2)' : 'var(--bg-input)',
                      color: active ? '#ffffff' : 'var(--text-muted)',
                      padding: '2px 6px',
                      borderRadius: 999,
                    }}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Tab 1: SIMULASI RUTE EVAKUASI INTERAKTIF */}
        {activeTab === 'evakuasi' && (
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr)', gap: 16 }}>
              
              {/* Simulation Header Banner */}
              <div
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  borderRadius: 14,
                  padding: 16,
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 12,
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: '#ef4444', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      ● Simulasi Evakuasi Darurat
                    </span>
                    <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>• Kelurahan Kampung Melayu</span>
                  </div>
                  <h3 style={{ fontSize: 16, fontWeight: 800, color: 'var(--text-heading)' }}>
                    Panduan Jalur Evakuasi EvacSafe™ Menuju Posko GOR Otista
                  </h3>
                  <p style={{ fontSize: 12.5, color: 'var(--text-secondary)', marginTop: 2 }}>
                    Sistem secara otomatis memetakan rute daratan tinggi (+22m dpl) dan menghindari genangan air sedalam 150 cm di bawah flyover.
                  </p>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <button
                    type="button"
                    onClick={() => setIsPlaying(p => !p)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                      background: isPlaying ? '#f59e0b' : '#10b981',
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: 8,
                      padding: '8px 14px',
                      fontSize: 12,
                      fontWeight: 700,
                      cursor: 'pointer',
                    }}
                  >
                    {isPlaying ? <Pause size={14} /> : <Play size={14} />}
                    {isPlaying ? 'Jeda Simulasi' : 'Putar Simulasi'}
                  </button>

                  <button
                    type="button"
                    onClick={() => { setSimStep(0); setIsPlaying(false); }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 5,
                      background: 'var(--bg-input)',
                      color: 'var(--text-secondary)',
                      border: '1px solid var(--border)',
                      borderRadius: 8,
                      padding: '8px 12px',
                      fontSize: 12,
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    <RotateCcw size={14} />
                    Reset
                  </button>

                  <button
                    type="button"
                    onClick={shareEvakuasi}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 5,
                      background: 'var(--accent-dim)',
                      color: 'var(--accent)',
                      border: '1px solid var(--border)',
                      borderRadius: 8,
                      padding: '8px 12px',
                      fontSize: 12,
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    <Share2 size={14} />
                    Bagikan Rute
                  </button>
                </div>
              </div>

              {/* Map and Turn-by-Turn Guidance Side-by-side */}
              <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.4fr) minmax(0, 1fr)', gap: 16 }} className="dash-map-grid">
                
                {/* Evacuation Map */}
                <div style={{ height: 420 }}>
                  <EvakuasiMap currentStep={simStep} isSimulating={isPlaying} />
                </div>

                {/* Turn-by-Turn Instruction Card */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  
                  {/* Step Progress Bar */}
                  <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 12, padding: 14 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                      <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-heading)' }}>
                        Langkah {simStep + 1} dari {simulasiRuteEvakuasi.langkahNavigasi.length}
                      </span>
                      <span style={{ fontSize: 11, color: '#10b981', fontWeight: 600 }}>
                        {simStep === simulasiRuteEvakuasi.langkahNavigasi.length - 1 ? '🎉 Tiba di Posko Aman' : `± ${currentNav.waktu} lagi`}
                      </span>
                    </div>

                    <div style={{ display: 'flex', gap: 4, height: 6, background: 'var(--bg-input)', borderRadius: 999, overflow: 'hidden' }}>
                      {simulasiRuteEvakuasi.langkahNavigasi.map((_, idx) => (
                        <div
                          key={idx}
                          onClick={() => setSimStep(idx)}
                          style={{
                            flex: 1,
                            background: idx <= simStep ? '#10b981' : 'transparent',
                            borderRadius: 999,
                            cursor: 'pointer',
                            transition: 'background 0.3s',
                          }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Active Instruction Detail */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentNav.langkah}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.2 }}
                      style={{
                        background: 'var(--bg-card)',
                        border: currentNav.status === 'waspada' ? '1px solid #ef444455' : '1px solid var(--border)',
                        borderRadius: 14,
                        padding: 18,
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                      }}
                    >
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                          <span
                            style={{
                              padding: '3px 10px',
                              borderRadius: 999,
                              fontSize: 11,
                              fontWeight: 700,
                              background: currentNav.status === 'waspada' ? 'rgba(239,68,68,0.15)' : 'rgba(16,185,129,0.15)',
                              color: currentNav.status === 'waspada' ? '#ef4444' : '#10b981',
                            }}
                          >
                            Langkah {currentNav.langkah} • {currentNav.jarak}
                          </span>
                          <span style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'JetBrains Mono, monospace' }}>
                            Est. {currentNav.waktu}
                          </span>
                        </div>

                        <h4 style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-heading)', lineHeight: 1.5, marginBottom: 10 }}>
                          {currentNav.instruksi}
                        </h4>

                        <div
                          style={{
                            background: currentNav.status === 'waspada' ? 'rgba(239,68,68,0.08)' : 'rgba(14,165,233,0.08)',
                            border: `1px solid ${currentNav.status === 'waspada' ? '#ef444433' : '#0ea5e933'}`,
                            borderRadius: 10,
                            padding: '10px 12px',
                            fontSize: 12,
                            color: currentNav.status === 'waspada' ? '#fca5a5' : 'var(--text-secondary)',
                            lineHeight: 1.55,
                          }}
                        >
                          <strong>{currentNav.status === 'waspada' ? '⚠️ PERINGATAN BAHAYA:' : '💡 PETUNJUK KESELAMATAN:'}</strong>{' '}
                          {currentNav.peringatan}
                        </div>
                      </div>

                      {/* Step Nav Controller */}
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 16 }}>
                        <button
                          type="button"
                          disabled={simStep === 0}
                          onClick={() => setSimStep(p => Math.max(0, p - 1))}
                          style={{
                            padding: '6px 14px',
                            borderRadius: 8,
                            border: '1px solid var(--border)',
                            background: 'var(--bg-input)',
                            color: simStep === 0 ? 'var(--text-muted)' : 'var(--text-primary)',
                            fontSize: 12,
                            cursor: simStep === 0 ? 'not-allowed' : 'pointer',
                          }}
                        >
                          ← Langkah Sebelumnya
                        </button>

                        <button
                          type="button"
                          disabled={simStep === simulasiRuteEvakuasi.langkahNavigasi.length - 1}
                          onClick={() => setSimStep(p => Math.min(simulasiRuteEvakuasi.langkahNavigasi.length - 1, p + 1))}
                          style={{
                            padding: '6px 14px',
                            borderRadius: 8,
                            border: 'none',
                            background: '#10b981',
                            color: '#ffffff',
                            fontSize: 12,
                            fontWeight: 700,
                            cursor: simStep === simulasiRuteEvakuasi.langkahNavigasi.length - 1 ? 'not-allowed' : 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 4,
                          }}
                        >
                          Langkah Selanjutnya →
                        </button>
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  {/* Destination Info Box */}
                  <div
                    style={{
                      background: 'var(--bg-card)',
                      border: '1px solid rgba(16,185,129,0.3)',
                      borderRadius: 12,
                      padding: '12px 14px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 12,
                    }}
                  >
                    <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(16,185,129,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Home size={18} color="#10b981" />
                    </div>
                    <div>
                      <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Titik Akhir Posko Evakuasi:</div>
                      <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-heading)' }}>{simulasiRuteEvakuasi.titikTujuan.nama}</div>
                      <div style={{ fontSize: 11, color: '#10b981' }}>{simulasiRuteEvakuasi.titikTujuan.elevasi}</div>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </motion.div>
        )}

        {/* Tab 2: PREDIKSI BANJIR WILAYAH KELURAHAN */}
        {activeTab === 'wilayah' && (
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.4fr) minmax(0, 1fr)', gap: 16 }} className="dash-map-grid">
              
              {/* Selected Wilayah Detail Card */}
              <div
                style={{
                  background: 'var(--bg-card)',
                  border: `1px solid ${selectedWilayah.tingkatRisiko === 'Bahaya' ? '#ef444455' : selectedWilayah.tingkatRisiko === 'Waspada' ? '#f59e0b55' : '#10b98155'}`,
                  borderRadius: 16,
                  padding: 22,
                  backdropFilter: 'blur(16px)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
                  <div>
                    <span style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'JetBrains Mono, monospace' }}>
                      Kelurahan {selectedWilayah.nama} • Kec. {selectedWilayah.kecamatan}
                    </span>
                    <h3 style={{ fontSize: 22, fontWeight: 800, color: 'var(--text-heading)', marginTop: 2 }}>
                      {selectedWilayah.nama}, {selectedWilayah.kota}
                    </h3>
                  </div>

                  <span
                    style={{
                      padding: '4px 12px',
                      borderRadius: 999,
                      fontSize: 11,
                      fontWeight: 800,
                      background: selectedWilayah.tingkatRisiko === 'Bahaya' ? 'rgba(239,68,68,0.2)' : selectedWilayah.tingkatRisiko === 'Waspada' ? 'rgba(245,158,11,0.2)' : 'rgba(16,185,129,0.2)',
                      color: selectedWilayah.tingkatRisiko === 'Bahaya' ? '#ef4444' : selectedWilayah.tingkatRisiko === 'Waspada' ? '#f59e0b' : '#10b981',
                      border: `1px solid ${selectedWilayah.tingkatRisiko === 'Bahaya' ? '#ef4444' : selectedWilayah.tingkatRisiko === 'Waspada' ? '#f59e0b' : '#10b981'}44`,
                    }}
                  >
                    {selectedWilayah.statusSiaga}
                  </span>
                </div>

                {/* Metrics Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginBottom: 18 }} className="summary-grid">
                  <div style={{ background: 'var(--bg-input)', padding: '12px 14px', borderRadius: 10, border: '1px solid var(--border-subtle)' }}>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 4 }}>Probabilitas Banjir</div>
                    <div style={{ fontSize: 22, fontWeight: 800, color: selectedWilayah.probabilitasBanjir > 70 ? '#ef4444' : '#f59e0b' }}>
                      {selectedWilayah.probabilitasBanjir}%
                    </div>
                  </div>

                  <div style={{ background: 'var(--bg-input)', padding: '12px 14px', borderRadius: 10, border: '1px solid var(--border-subtle)' }}>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 4 }}>Estimasi Genangan</div>
                    <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--text-heading)' }}>
                      {selectedWilayah.estimasiGenangan}
                    </div>
                  </div>

                  <div style={{ background: 'var(--bg-input)', padding: '12px 14px', borderRadius: 10, border: '1px solid var(--border-subtle)' }}>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 4 }}>Estimasi Air Tiba (ETA)</div>
                    <div style={{ fontSize: 18, fontWeight: 800, color: '#38bdf8' }}>
                      {selectedWilayah.etaAirTiba}
                    </div>
                  </div>
                </div>

                {/* Action Recommendation */}
                <div
                  style={{
                    background: 'var(--bg-panel)',
                    border: '1px solid var(--border)',
                    borderRadius: 12,
                    padding: '14px 16px',
                    marginBottom: 16,
                  }}
                >
                  <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--accent)', textTransform: 'uppercase', marginBottom: 4 }}>
                    Instruksi & Mitigasi Khusus Warga:
                  </div>
                  <p style={{ fontSize: 13.5, color: 'var(--text-primary)', lineHeight: 1.6 }}>
                    {selectedWilayah.rekomendasi}
                  </p>
                </div>

                {/* Posko Pengungsian Info */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                  <div style={{ background: 'var(--bg-input)', padding: '10px 14px', borderRadius: 10, border: '1px solid var(--border-subtle)' }}>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Posko Rujukan Resmi:</div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-heading)', marginTop: 2 }}>{selectedWilayah.poskoRujukan}</div>
                    <div style={{ fontSize: 11, color: '#10b981', marginTop: 2 }}>Kapasitas: {selectedWilayah.kapasitasPosko}</div>
                  </div>

                  <div style={{ background: 'var(--bg-input)', padding: '10px 14px', borderRadius: 10, border: '1px solid var(--border-subtle)' }}>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Kontak Siaga Posko / RW:</div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--accent)', marginTop: 2 }}>{selectedWilayah.kontakPosko}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginTop: 2 }}>Standby 24 Jam via WhatsApp</div>
                  </div>
                </div>
              </div>

              {/* List of Other Neighborhoods */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <div style={{ fontSize: 12.5, fontWeight: 700, color: 'var(--text-heading)', marginBottom: 2 }}>
                  Pilih Kelurahan Anda untuk Cek Risiko:
                </div>

                {daftarWilayahWarga.map(w => {
                  const isSel = selectedWilayah.id === w.id;
                  const dot = w.tingkatRisiko === 'Bahaya' ? '#ef4444' : w.tingkatRisiko === 'Waspada' ? '#f59e0b' : '#10b981';
                  return (
                    <div
                      key={w.id}
                      onClick={() => setSelectedWilayah(w)}
                      style={{
                        background: isSel ? 'var(--accent-dim)' : 'var(--bg-card)',
                        border: `1px solid ${isSel ? 'var(--accent)' : 'var(--border)'}`,
                        borderRadius: 12,
                        padding: '12px 14px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        transition: 'all 0.2s',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <span style={{ width: 10, height: 10, borderRadius: '50%', background: dot }} className={w.tingkatRisiko === 'Bahaya' ? 'blink' : ''} />
                        <div>
                          <div style={{ fontSize: 13.5, fontWeight: isSel ? 700 : 600, color: 'var(--text-heading)' }}>
                            {w.nama}
                          </div>
                          <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>
                            Kec. {w.kecamatan} • {w.kota}
                          </div>
                        </div>
                      </div>

                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: 13, fontWeight: 800, color: dot }}>
                          {w.probabilitasBanjir}% Risiko
                        </div>
                        <div style={{ fontSize: 10.5, color: 'var(--text-secondary)' }}>
                          ETA: {w.etaAirTiba}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>
          </motion.div>
        )}

        {/* Tab 3: PRAKIRAAN CUACA BMKG & RADAR HUJAN */}
        {activeTab === 'cuaca' && (
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.3fr) minmax(0, 1fr)', gap: 16 }} className="dash-map-grid">
              
              {/* Main Weather Card */}
              <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 16, padding: 22 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                  <div>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'JetBrains Mono, monospace' }}>
                      BMKG Real-Time Radar
                    </div>
                    <h3 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-heading)', marginTop: 2 }}>
                      {cuacaWarga.kota}
                    </h3>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(239,68,68,0.15)', border: '1px solid #ef444455', borderRadius: 999, padding: '4px 10px', fontSize: 11, fontWeight: 700, color: '#ef4444' }}>
                    <span className="blink" style={{ width: 6, height: 6, borderRadius: '50%', background: '#ef4444' }} />
                    Awas Petir & Angin Kencang
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 20, margin: '20px 0' }}>
                  <div style={{ width: 72, height: 72, borderRadius: 18, background: 'linear-gradient(135deg,#0ea5e9,#6366f1)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 24px rgba(14,165,233,0.35)' }}>
                    <CloudLightning size={38} color="#fff" />
                  </div>
                  <div>
                    <div style={{ fontSize: 44, fontWeight: 900, color: 'var(--text-heading)', fontFamily: 'Space Grotesk, sans-serif', lineHeight: 1 }}>
                      {cuacaWarga.suhu}°<span style={{ fontSize: 24, fontWeight: 400 }}>C</span>
                    </div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--accent)', marginTop: 4 }}>
                      {cuacaWarga.kondisi}
                    </div>
                  </div>
                </div>

                {/* BMKG Warning Box */}
                <div style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)', borderRadius: 12, padding: '12px 14px', marginBottom: 20 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11.5, fontWeight: 700, color: '#ef4444', marginBottom: 4 }}>
                    <AlertTriangle size={14} /> Peringatan Resmi BMKG:
                  </div>
                  <p style={{ fontSize: 12.5, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                    {cuacaWarga.peringatanBMKG}
                  </p>
                </div>

                {/* Weather Indicators Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }} className="summary-grid">
                  <div style={{ background: 'var(--bg-input)', padding: 10, borderRadius: 10, textAlign: 'center' }}>
                    <Droplets size={14} color="var(--accent)" style={{ margin: '0 auto 4px' }} />
                    <div style={{ fontSize: 10.5, color: 'var(--text-muted)' }}>Kelembapan</div>
                    <div style={{ fontSize: 13.5, fontWeight: 700, color: 'var(--text-heading)' }}>{cuacaWarga.kelembapan}%</div>
                  </div>

                  <div style={{ background: 'var(--bg-input)', padding: 10, borderRadius: 10, textAlign: 'center' }}>
                    <Wind size={14} color="#14b8a6" style={{ margin: '0 auto 4px' }} />
                    <div style={{ fontSize: 10.5, color: 'var(--text-muted)' }}>Kecepatan Angin</div>
                    <div style={{ fontSize: 13.5, fontWeight: 700, color: 'var(--text-heading)' }}>24 km/h</div>
                  </div>

                  <div style={{ background: 'var(--bg-input)', padding: 10, borderRadius: 10, textAlign: 'center' }}>
                    <Sun size={14} color="#f59e0b" style={{ margin: '0 auto 4px' }} />
                    <div style={{ fontSize: 10.5, color: 'var(--text-muted)' }}>Indeks UV</div>
                    <div style={{ fontSize: 13.5, fontWeight: 700, color: 'var(--text-heading)' }}>{cuacaWarga.indeksUV}</div>
                  </div>

                  <div style={{ background: 'var(--bg-input)', padding: 10, borderRadius: 10, textAlign: 'center' }}>
                    <Compass size={14} color="#a855f7" style={{ margin: '0 auto 4px' }} />
                    <div style={{ fontSize: 10.5, color: 'var(--text-muted)' }}>Jarak Pandang</div>
                    <div style={{ fontSize: 13.5, fontWeight: 700, color: 'var(--text-heading)' }}>{cuacaWarga.jarakPandang}</div>
                  </div>
                </div>
              </div>

              {/* Hourly Rain Probability Forecast */}
              <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 16, padding: 18, display: 'flex', flexDirection: 'column', gap: 10 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-heading)', marginBottom: 4 }}>
                  Prakiraan Hujan 6 Jam ke Depan
                </div>

                {cuacaWarga.prakiraanJam.map(jam => (
                  <div
                    key={jam.jam}
                    style={{
                      background: 'var(--bg-input)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: 10,
                      padding: '10px 12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent)', fontFamily: 'JetBrains Mono, monospace' }}>
                        {jam.jam}
                      </span>
                      <div>
                        <div style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--text-heading)' }}>
                          {jam.cuaca}
                        </div>
                        <div style={{ fontSize: 10.5, color: 'var(--text-muted)' }}>
                          Estimasi curah: {jam.mm} mm/jam
                        </div>
                      </div>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: 13, fontWeight: 800, color: jam.peluangHujan > 80 ? '#ef4444' : '#0ea5e9' }}>
                        {jam.peluangHujan}% Hujan
                      </div>
                      <div style={{ width: 70, height: 4, background: 'rgba(255,255,255,0.08)', borderRadius: 999, overflow: 'hidden', marginTop: 4 }}>
                        <div style={{ width: `${jam.peluangHujan}%`, height: '100%', background: jam.peluangHujan > 80 ? '#ef4444' : '#0ea5e9', borderRadius: 999 }} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </motion.div>
        )}

        {/* Tab 4: PANDUAN & CHECKLIST MITIGASI */}
        {activeTab === 'mitigasi' && (
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.4fr) minmax(0, 1fr)', gap: 16 }} className="dash-map-grid">
              
              {/* Checklist Section */}
              <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 16, padding: 22 }}>
                
                {/* Phase Tabs */}
                <div style={{ display: 'flex', gap: 8, marginBottom: 18, borderBottom: '1px solid var(--border-subtle)', paddingBottom: 10 }}>
                  {[
                    { id: 'praBencana', label: '1. Sebelum Banjir', dot: '#0ea5e9' },
                    { id: 'saatBencana', label: '2. Saat Air Naik', dot: '#ef4444' },
                    { id: 'pascaBencana', label: '3. Pasca Banjir', dot: '#10b981' },
                  ].map(fase => (
                    <button
                      key={fase.id}
                      type="button"
                      onClick={() => setMitigasiFase(fase.id)}
                      style={{
                        background: mitigasiFase === fase.id ? 'var(--accent-dim)' : 'transparent',
                        color: mitigasiFase === fase.id ? 'var(--accent)' : 'var(--text-secondary)',
                        border: `1px solid ${mitigasiFase === fase.id ? 'var(--accent)' : 'transparent'}`,
                        borderRadius: 8,
                        padding: '6px 12px',
                        fontSize: 12,
                        fontWeight: 600,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 6,
                      }}
                    >
                      <span style={{ width: 7, height: 7, borderRadius: '50%', background: fase.dot }} />
                      {fase.label}
                    </button>
                  ))}
                </div>

                <div style={{ marginBottom: 14 }}>
                  <h4 style={{ fontSize: 16, fontWeight: 800, color: 'var(--text-heading)' }}>
                    {mitigasiTutorials[mitigasiFase].judul}
                  </h4>
                  <p style={{ fontSize: 12.5, color: 'var(--text-secondary)', marginTop: 2 }}>
                    {mitigasiTutorials[mitigasiFase].deskripsi}
                  </p>
                </div>

                {/* Interactive Checklist Items */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {mitigasiTutorials[mitigasiFase].checklist.map(item => {
                    const isChecked = !!completedChecklist[item.id];
                    return (
                      <div
                        key={item.id}
                        onClick={() => toggleChecklist(item.id)}
                        style={{
                          background: isChecked ? 'rgba(16,185,129,0.06)' : 'var(--bg-input)',
                          border: `1px solid ${isChecked ? '#10b98144' : 'var(--border-subtle)'}`,
                          borderRadius: 10,
                          padding: '11px 14px',
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: 12,
                          cursor: 'pointer',
                          transition: 'all 0.2s',
                        }}
                      >
                        <div style={{ marginTop: 2 }}>
                          {isChecked ? (
                            <CheckSquare size={18} color="#10b981" />
                          ) : (
                            <Square size={18} color="var(--text-muted)" />
                          )}
                        </div>
                        <span
                          style={{
                            fontSize: 13,
                            color: isChecked ? 'var(--text-primary)' : 'var(--text-secondary)',
                            textDecoration: isChecked ? 'line-through' : 'none',
                            lineHeight: 1.5,
                          }}
                        >
                          {item.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Tas Siaga Bencana (Go-Bag) Visual Card */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div
                  style={{
                    background: 'linear-gradient(135deg, rgba(14,165,233,0.12), rgba(20,184,166,0.12))',
                    border: '1px solid var(--border)',
                    borderRadius: 16,
                    padding: 20,
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                    <ShieldCheck size={20} color="#14b8a6" />
                    <h4 style={{ fontSize: 15, fontWeight: 800, color: 'var(--text-heading)' }}>
                      Isi Wajib Tas Siaga Bencana (TSB)
                    </h4>
                  </div>
                  <p style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 12 }}>
                    Siapkan 1 tas ransel anti air per keluarga yang diletakkan dekat pintu keluar rumah:
                  </p>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                    {[
                      '📑 Surat & Dokumen Penting (Plastik Kedap)',
                      '🩹 Kotak P3K & Obat Pribadi Rutin',
                      '🔦 Senter + Baterai Cadangan & Peluit',
                      '🍞 Makanan Kering/Biskuit & Air Minum 3 Hari',
                      '👕 Pakaian Ganti & Selimut Termal',
                      '🔋 Powerbank Terisi Penuh + Kabel HP',
                      '🧼 Sabun Cair & Masker Medis',
                      '💵 Uang Tunai Secukupnya',
                    ].map(item => (
                      <div key={item} style={{ background: 'var(--bg-card)', padding: '8px 10px', borderRadius: 8, fontSize: 11.5, color: 'var(--text-primary)', border: '1px solid var(--border-subtle)' }}>
                        {item}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Emergency Contact List Card */}
                <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 14, padding: 16 }}>
                  <div style={{ fontSize: 12.5, fontWeight: 700, color: 'var(--text-heading)', marginBottom: 8 }}>
                    Kontak Penting Evakuasi & Penyelamatan
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {kontakDarurat.map(k => (
                      <div
                        key={k.nama}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '6px 8px',
                          borderBottom: '1px solid var(--border-subtle)',
                        }}
                      >
                        <div>
                          <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-heading)' }}>{k.instansi}</div>
                          <div style={{ fontSize: 10.5, color: 'var(--text-muted)' }}>{k.nama}</div>
                        </div>
                        <a
                          href={`tel:${k.nomor}`}
                          style={{
                            background: `${k.warna}20`,
                            color: k.warna,
                            padding: '3px 10px',
                            borderRadius: 6,
                            textDecoration: 'none',
                            fontWeight: 800,
                            fontSize: 12,
                          }}
                        >
                          Hubungi {k.nomor}
                        </a>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>
          </motion.div>
        )}

      </div>
    </section>
  );
}
