import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
  AreaChart, Area, LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, ReferenceLine,
} from 'recharts';
import { Activity, Shield, Droplets, Wifi, MapPin, Bell, Clock, Thermometer, BrainCircuit, Radio } from 'lucide-react';
import { sensorData, waterLevelData, rainfallData, activeAlerts } from '../data/dummyData';
import AdminAiControl from './AdminAiControl';

const dotColor = { tinggi: '#ef4444', sedang: '#f59e0b', rendah: '#22c55e' };

function Badge({ level }) {
  const cls = { tinggi: 'badge-high', sedang: 'badge-med', rendah: 'badge-low' };
  return (
    <span className={cls[level]} style={{ padding: '2px 10px', borderRadius: 999, fontSize: 10.5, fontWeight: 700, letterSpacing: '0.05em', display: 'inline-block' }}>
      {level.toUpperCase()}
    </span>
  );
}

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: 'var(--bg-panel)', border: '1px solid var(--border)', borderRadius: 10, padding: '10px 14px', minWidth: 140 }}>
      <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 6, fontFamily: 'JetBrains Mono, monospace' }}>{label}</div>
      {payload.map(p => (
        <div key={p.dataKey} style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 12, marginBottom: 3 }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: p.color, display: 'inline-block', flexShrink: 0 }} />
          <span style={{ color: 'var(--text-secondary)' }}>{p.name}:</span>
          <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{p.value}</span>
        </div>
      ))}
    </div>
  );
}

/* ── Summary Cards ── */
function SummaryCards() {
  const highRisk = sensorData.filter(s => s.level === 'tinggi').length;
  const medRisk  = sensorData.filter(s => s.level === 'sedang').length;
  const overallLevel = highRisk >= 2 ? 'TINGGI' : medRisk >= 3 ? 'SEDANG' : 'RENDAH';
  const riskColor = overallLevel === 'TINGGI' ? '#f87171' : overallLevel === 'SEDANG' ? '#fbbf24' : '#34d399';

  const cards = [
    { label:'Sensor Aktif', value:'10/10', sub:'Semua titik beroperasi', icon:Wifi, ic:'#38bdf8', bg:'rgba(14,165,233,0.1)', brd:'rgba(14,165,233,0.25)' },
    { label:'Level Risiko', value:overallLevel, sub:`${highRisk} tinggi · ${medRisk} sedang`, icon:Shield, ic:riskColor, bg:`${riskColor}18`, brd:`${riskColor}33`, vc:riskColor },
    { label:'Wilayah Dipantau', value:'248', sub:'Kelurahan · 5 Kab/Kota', icon:MapPin, ic:'#14b8a6', bg:'rgba(20,184,166,0.1)', brd:'rgba(20,184,166,0.25)' },
    { label:'Peringatan Aktif', value:String(activeAlerts.length), sub:'3 tinggi · 2 sedang', icon:Bell, ic:'#f87171', bg:'rgba(239,68,68,0.1)', brd:'rgba(239,68,68,0.25)' },
  ];

  return (
    <div className="summary-grid" style={{ display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:12 }}>
      {cards.map((c, i) => {
        const Icon = c.icon;
        return (
          <motion.div key={c.label} initial={{ opacity:0, y:14 }} animate={{ opacity:1, y:0 }} transition={{ delay:i*0.07 }}
            style={{ background:'var(--bg-card)', border:'1px solid var(--border)', borderRadius:12, padding:'15px 16px', backdropFilter:'blur(12px)', transition:'border-color 0.2s, background 0.35s' }}
            whileHover={{ borderColor:'var(--border-hover)' }}>
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:11 }}>
              <div style={{ width:32, height:32, borderRadius:8, background:c.bg, border:`1px solid ${c.brd}`, display:'flex', alignItems:'center', justifyContent:'center' }}>
                <Icon size={15} color={c.ic} />
              </div>
              <span className="blink" style={{ width:6, height:6, borderRadius:'50%', background:'#22c55e', display:'inline-block' }} />
            </div>
            <div style={{ fontSize:20, fontWeight:800, color:c.vc||'var(--text-heading)', fontFamily:'Space Grotesk,sans-serif', letterSpacing:'-0.02em' }}>{c.value}</div>
            <div style={{ fontSize:11.5, fontWeight:600, color:'var(--text-secondary)', marginTop:2 }}>{c.label}</div>
            <div style={{ fontSize:11, color:'var(--text-muted)', marginTop:3 }}>{c.sub}</div>
          </motion.div>
        );
      })}
    </div>
  );
}

import CiliwungMap from './CiliwungMap';

/* ── Sensor Map (Real OpenStreetMap) ── */
function SensorMap({ selected, setSelected }) {
  return (
    <div style={{ background:'var(--bg-card)', border:'1px solid var(--border)', borderRadius:14, padding:16, height:'100%', display:'flex', flexDirection:'column', backdropFilter:'blur(16px)', transition:'background 0.35s' }}>
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:12, flexWrap:'wrap', gap:8 }}>
        <div style={{ display:'flex', alignItems:'center', gap:7 }}>
          <Activity size={14} color="var(--accent)" />
          <span style={{ fontSize:13, fontWeight:700, color:'var(--text-heading)' }}>Peta Sensor Real-Time — OpenStreetMap</span>
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:6 }}>
          <span style={{ fontSize:10.5, color:'var(--text-muted)', fontFamily:'JetBrains Mono,monospace' }}>DAS Sungai Ciliwung</span>
          <span style={{ width:6, height:6, borderRadius:'50%', background:'#22c55e' }} className="blink" />
        </div>
      </div>

      <div style={{ flex:1, minHeight:380, borderRadius:10, overflow:'hidden' }}>
        <CiliwungMap sensors={sensorData} selected={selected} setSelected={setSelected} />
      </div>
    </div>
  );
}

/* ── Sensor Detail ── */
function SensorDetail({ sensor }) {
  if (!sensor) return (
    <div style={{ background:'var(--bg-card)', border:'1px solid var(--border)', borderRadius:12, padding:16, display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column', gap:6, minHeight:88, backdropFilter:'blur(12px)' }}>
      <MapPin size={20} color="var(--accent)" />
      <p style={{ fontSize:12, color:'var(--text-muted)', textAlign:'center' }}>
        Klik titik marker sensor pada peta atau pilih dari tabel di bawah untuk melihat telemetri real-time.
      </p>
    </div>
  );
  const color = dotColor[sensor.level];
  return (
    <motion.div key={sensor.id} initial={{ opacity:0, scale:0.97 }} animate={{ opacity:1, scale:1 }}
      style={{ background:'var(--bg-card)', border:`1px solid ${color}35`, borderRadius:12, padding:16, backdropFilter:'blur(12px)', transition:'background 0.35s' }}>
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:10, flexWrap:'wrap', gap:6 }}>
        <div>
          <div style={{ display:'flex', alignItems:'center', gap:8 }}>
            <span style={{ fontSize:10.5, color:'var(--text-muted)', fontFamily:'JetBrains Mono,monospace' }}>{sensor.id}</span>
            <span style={{ fontSize:11, color:'var(--text-muted)' }}>• {sensor.lokasi || 'Jabodetabek'} ({sensor.wilayah || 'DKI Jakarta'})</span>
          </div>
          <div style={{ fontSize:14, fontWeight:700, color:'var(--text-heading)', marginTop:2 }}>{sensor.nama}</div>
        </div>
        <Badge level={sensor.level} />
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(140px, 1fr))', gap:8, marginBottom:10 }}>
        <div style={{ background:'var(--bg-input)', borderRadius:9, padding:'10px 12px', border:'1px solid var(--border-subtle)' }}>
          <div style={{ display:'flex', alignItems:'center', gap:5, fontSize:10.5, color:'var(--text-muted)', marginBottom:4 }}>
            <Droplets size={10} /> Ketinggian Air
          </div>
          <div style={{ fontSize:20, fontWeight:800, color, fontFamily:'JetBrains Mono,monospace' }}>
            {sensor.ketinggian}<span style={{ fontSize:11, fontWeight:400, marginLeft:2 }}>m</span>
          </div>
        </div>
        <div style={{ background:'var(--bg-input)', borderRadius:9, padding:'10px 12px', border:'1px solid var(--border-subtle)' }}>
          <div style={{ display:'flex', alignItems:'center', gap:5, fontSize:10.5, color:'var(--text-muted)', marginBottom:4 }}>
            <Thermometer size={10} /> Curah Hujan
          </div>
          <div style={{ fontSize:20, fontWeight:800, color:'var(--accent)', fontFamily:'JetBrains Mono,monospace' }}>
            {sensor.curahHujan}<span style={{ fontSize:11, fontWeight:400, marginLeft:2 }}>mm/jam</span>
          </div>
        </div>
        <div style={{ background:'var(--bg-input)', borderRadius:9, padding:'10px 12px', border:'1px solid var(--border-subtle)' }}>
          <div style={{ display:'flex', alignItems:'center', gap:5, fontSize:10.5, color:'var(--text-muted)', marginBottom:4 }}>
            <MapPin size={10} /> Titik GPS
          </div>
          <div style={{ fontSize:11.5, fontWeight:600, color:'var(--text-secondary)', fontFamily:'JetBrains Mono,monospace', marginTop:2 }}>
            {sensor.lat ? `${sensor.lat.toFixed(4)}, ${sensor.lng.toFixed(4)}` : 'Tersinkronisasi'}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Alert List ── */
function AlertList() {
  const icon = { tinggi:'🔴', sedang:'🟡', rendah:'🟢' };
  return (
    <div style={{ background:'var(--bg-card)', border:'1px solid var(--border)', borderRadius:14, padding:16, display:'flex', flexDirection:'column', backdropFilter:'blur(16px)', transition:'background 0.35s' }}>
      <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:12 }}>
        <Bell size={14} color="#f87171" />
        <span style={{ fontSize:13, fontWeight:700, color:'var(--text-heading)' }}>Peringatan Aktif</span>
        <span style={{ width:19, height:19, borderRadius:'50%', background:'#ef4444', color:'#fff', fontSize:10, fontWeight:700, display:'flex', alignItems:'center', justifyContent:'center' }}>
          {activeAlerts.length}
        </span>
        <div style={{ marginLeft:'auto', display:'flex', alignItems:'center', gap:4, fontSize:11, color:'var(--text-muted)' }}>
          <Clock size={10} /> Waktu Lokal
        </div>
      </div>
      <div style={{ display:'flex', flexDirection:'column', gap:7, overflowY:'auto', flex:1 }}>
        {activeAlerts.map((a, i) => (
          <motion.div key={a.id} initial={{ opacity:0, x:12 }} animate={{ opacity:1, x:0 }} transition={{ delay:i*0.07 }}
            style={{ padding:'11px 13px', borderRadius:10, border:'1px solid var(--border-subtle)', background:'var(--bg-input)', cursor:'pointer', transition:'all 0.18s' }}
            whileHover={{ borderColor:'var(--border)', background:'var(--bg-hover)' }}>
            <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', gap:8, marginBottom:5 }}>
              <div style={{ display:'flex', alignItems:'center', gap:5 }}>
                <span style={{ fontSize:12 }}>{icon[a.level]}</span>
                <span style={{ fontSize:12.5, fontWeight:600, color:'var(--text-primary)' }}>{a.wilayah}</span>
              </div>
              <Badge level={a.level} />
            </div>
            <p style={{ fontSize:12, color:'var(--text-secondary)', lineHeight:1.55, marginBottom:5 }}>{a.pesan}</p>
            <div style={{ display:'flex', justifyContent:'space-between' }}>
              <span style={{ fontSize:10.5, color:'var(--text-muted)', fontFamily:'JetBrains Mono,monospace' }}>{a.id}</span>
              <span style={{ fontSize:10.5, color:'var(--text-muted)' }}>{a.timestamp} · {a.waktu}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ── Charts ── */
function WaterLevelChart() {
  const data = waterLevelData.filter((_,i) => i%2===0);
  return (
    <ResponsiveContainer width="100%" height={210}>
      <AreaChart data={data} margin={{ top:8, right:10, bottom:0, left:-18 }}>
        <defs>
          {[['c','#ef4444'],['a','#f59e0b'],['k','#0ea5e9']].map(([id,clr]) => (
            <linearGradient key={id} id={`g${id}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={clr} stopOpacity={0.3} />
              <stop offset="100%" stopColor={clr} stopOpacity={0} />
            </linearGradient>
          ))}
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
        <XAxis dataKey="jam" tick={{ fill:'var(--text-muted)', fontSize:10 }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fill:'var(--text-muted)', fontSize:10 }} axisLine={false} tickLine={false} />
        <Tooltip content={<CustomTooltip />} />
        <ReferenceLine y={3.5} stroke="#ef4444" strokeDasharray="4 4" strokeWidth={1} label={{ value:'Kritis', fill:'#ef4444', fontSize:9, position:'insideTopRight' }} />
        <ReferenceLine y={2.0} stroke="#f59e0b" strokeDasharray="4 4" strokeWidth={1} label={{ value:'Waspada', fill:'#f59e0b', fontSize:9, position:'insideTopRight' }} />
        <Area type="monotone" dataKey="ciliwung" name="Ciliwung" stroke="#ef4444" fill="url(#gc)" strokeWidth={2} dot={false} />
        <Area type="monotone" dataKey="angke"    name="Kali Angke" stroke="#f59e0b" fill="url(#ga)" strokeWidth={2} dot={false} />
        <Area type="monotone" dataKey="kanal"    name="BKB"        stroke="#0ea5e9" fill="url(#gk)" strokeWidth={1.5} dot={false} />
        <Legend wrapperStyle={{ fontSize:11, paddingTop:8 }} />
      </AreaChart>
    </ResponsiveContainer>
  );
}

function RainfallChart() {
  const data = rainfallData.filter((_,i) => i%2===0);
  return (
    <ResponsiveContainer width="100%" height={210}>
      <LineChart data={data} margin={{ top:8, right:10, bottom:0, left:-18 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
        <XAxis dataKey="jam" tick={{ fill:'var(--text-muted)', fontSize:10 }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fill:'var(--text-muted)', fontSize:10 }} axisLine={false} tickLine={false} />
        <Tooltip content={<CustomTooltip />} />
        <Line type="monotone" dataKey="curah"   name="Aktual"    stroke="#14b8a6" strokeWidth={2.5} dot={false} />
        <Line type="monotone" dataKey="prediksi" name="Prediksi AI" stroke="#8b5cf6" strokeWidth={2} strokeDasharray="5 3" dot={false} />
        <Legend wrapperStyle={{ fontSize:11, paddingTop:8 }} />
      </LineChart>
    </ResponsiveContainer>
  );
}

/* ── Sensor Table ── */
function SensorTable({ selected, setSelected }) {
  return (
    <div style={{ overflowX:'auto' }}>
      <table className="dash-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Lokasi Titik Pantau</th>
            <th>Wilayah</th>
            <th style={{ textAlign:'center' }}>Ketinggian</th>
            <th style={{ textAlign:'center' }}>Curah Hujan</th>
            <th style={{ textAlign:'center' }}>Status</th>
            <th style={{ textAlign:'center' }}>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {sensorData.map(s => {
            const isSel = selected?.id === s.id;
            return (
              <tr
                key={s.id}
                onClick={() => setSelected(isSel ? null : s)}
                style={{
                  cursor: 'pointer',
                  background: isSel ? 'var(--accent-dim)' : undefined,
                  transition: 'background 0.15s',
                }}
              >
                <td className="mono" style={{ fontWeight: isSel ? 700 : 500, color: isSel ? 'var(--accent)' : undefined }}>
                  {s.id}
                </td>
                <td style={{ color:'var(--text-primary)', fontWeight: isSel ? 600 : 400 }}>
                  {s.nama}
                </td>
                <td style={{ color:'var(--text-secondary)', fontSize: 12 }}>
                  {s.wilayah || 'DKI Jakarta'}
                </td>
                <td className="mono" style={{ textAlign:'center', color:dotColor[s.level], fontWeight: 700 }}>
                  {s.ketinggian}m
                </td>
                <td className="mono" style={{ textAlign:'center', color:'var(--accent)' }}>
                  {s.curahHujan}mm
                </td>
                <td style={{ textAlign:'center' }}>
                  <Badge level={s.level} />
                </td>
                <td style={{ textAlign:'center' }}>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelected(s);
                      // Smooth scroll back up to map if needed
                      document.getElementById('dashboard')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    style={{
                      background: isSel ? 'var(--accent)' : 'var(--bg-input)',
                      color: isSel ? '#ffffff' : 'var(--text-secondary)',
                      border: '1px solid var(--border)',
                      borderRadius: 6,
                      padding: '3px 8px',
                      fontSize: 10.5,
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    {isSel ? 'Terpilih' : 'Lihat Peta'}
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

/* ── Main Dashboard ── */
export default function DashboardDemo() {
  const ref = useRef(null);
  const inView = useInView(ref, { once:true, margin:'-60px' });
  const [selected, setSelected] = useState(null);
  const [tab, setTab] = useState('ketinggian');
  const [dashboardView, setDashboardView] = useState('telemetri'); // 'telemetri' | 'ai-matching'

  return (
    <section id="dashboard" ref={ref} style={{ padding:'96px 0', position:'relative' }}>
      <div className="grid-bg" style={{ position:'absolute', inset:0, opacity:0.5 }} />
      <div style={{ position:'absolute', top:0, left:'20%', width:500, height:400, borderRadius:'50%', background:'radial-gradient(circle, rgba(14,165,233,0.05), transparent 70%)', filter:'blur(60px)', pointerEvents:'none' }} />

      <div style={{ position:'relative', maxWidth:1280, margin:'0 auto', padding:'0 20px' }}>

        {/* Header Fokus Pemantauan */}
        <motion.div initial={{ opacity:0, y:20 }} animate={inView?{opacity:1,y:0}:{}} style={{ textAlign:'center', marginBottom:20 }}>
          <div className="section-label">Dashboard Pemantauan & Komando</div>
          <h2 style={{ fontSize:'clamp(24px, 4vw, 38px)', fontWeight:800, margin:0, letterSpacing:'-0.02em' }}>
            Pusat Kendali & Pemantauan Banjir
          </h2>
        </motion.div>

        {/* Panel wrapper */}
        <motion.div initial={{ opacity:0, y:26 }} animate={inView?{opacity:1,y:0}:{}} transition={{ duration:0.6, delay:0.15 }}
          style={{ borderRadius:18, border:'1px solid var(--border)', background:'var(--bg-panel)', backdropFilter:'blur(24px)', overflow:'hidden', transition:'background 0.35s, border-color 0.35s' }}>

          {/* Panel topbar */}
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'11px 20px', borderBottom:'1px solid var(--border-subtle)', background:'var(--bg-topbar)', flexWrap:'wrap', gap:8 }}>
            <div style={{ display:'flex', alignItems:'center', gap:10 }}>
              <div style={{ display:'flex', gap:5 }}>
                {['#ef4444','#f59e0b','#22c55e'].map(c => <div key={c} style={{ width:10, height:10, borderRadius:'50%', background:c, opacity:0.75 }} />)}
              </div>
              <span style={{ fontSize:11.5, color:'var(--text-muted)', fontFamily:'JetBrains Mono,monospace' }}>HYDROGUARD — Pusat Kendali Banjir Jabodetabek (Level Administrator)</span>
            </div>
            <div style={{ display:'flex', alignItems:'center', gap:12 }}>
              <span style={{ fontSize:11, color:'var(--text-faint)', fontFamily:'JetBrains Mono,monospace' }}>21:25 WIB · 27 Sep 2025</span>
              <div style={{ display:'flex', alignItems:'center', gap:5, fontSize:11.5, fontWeight:600, color:'#34d399' }}>
                <span className="blink" style={{ width:7, height:7, borderRadius:'50%', background:'#22c55e', display:'inline-block' }} />
                LIVE COMMAND
              </div>
            </div>
          </div>

          {/* Body */}
          <div style={{ padding:18, display:'flex', flexDirection:'column', gap:16 }}>

            {/* Operator Sub Navigation Switcher */}
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:10, paddingBottom:12, borderBottom:'1px solid var(--border-subtle)' }}>
              <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
                <button
                  type="button"
                  onClick={() => setDashboardView('telemetri')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    padding: '8px 14px',
                    borderRadius: 8,
                    fontSize: 12.5,
                    fontWeight: dashboardView === 'telemetri' ? 700 : 500,
                    background: dashboardView === 'telemetri' ? 'var(--accent)' : 'var(--bg-input)',
                    color: dashboardView === 'telemetri' ? '#ffffff' : 'var(--text-secondary)',
                    border: `1px solid ${dashboardView === 'telemetri' ? 'var(--accent)' : 'var(--border)'}`,
                    cursor: 'pointer',
                    transition: 'all 0.18s',
                  }}
                >
                  <Activity size={14} />
                  Pemantauan Sensor & Peta Ciliwung
                </button>

                <button
                  type="button"
                  onClick={() => setDashboardView('ai-matching')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    padding: '8px 14px',
                    borderRadius: 8,
                    fontSize: 12.5,
                    fontWeight: dashboardView === 'ai-matching' ? 700 : 500,
                    background: dashboardView === 'ai-matching' ? 'linear-gradient(135deg, #ef4444, #dc2626)' : 'var(--bg-input)',
                    color: dashboardView === 'ai-matching' ? '#ffffff' : 'var(--text-secondary)',
                    border: `1px solid ${dashboardView === 'ai-matching' ? '#ef4444' : 'var(--border)'}`,
                    cursor: 'pointer',
                    transition: 'all 0.18s',
                  }}
                >
                  <Radio size={14} />
                  Kirim Notifikasi (WA, SMS & Dashboard Warga)
                  <span style={{ fontSize: 10, background: 'rgba(255,255,255,0.22)', padding: '1px 6px', borderRadius: 999, fontWeight: 800 }}>
                    SIAP BROADCAST
                  </span>
                </button>
              </div>

              <div style={{ display:'flex', alignItems:'center', gap:6, fontSize:11, color:'var(--text-muted)' }}>
                <span>Mode Akses:</span>
                <span style={{ fontWeight:700, color:'var(--text-heading)', background:'var(--bg-card)', border:'1px solid var(--border)', padding:'3px 8px', borderRadius:6 }}>
                  🛡️ Operator BPBD / Pemerintah
                </span>
              </div>
            </div>

            {dashboardView === 'telemetri' ? (
              <>
                {/* Summary cards */}
                <SummaryCards />

                {/* Map + Alerts side by side on desktop */}
                <div className="dash-map-grid" style={{ display:'grid', gridTemplateColumns:'1fr', gap:14 }}>
                  <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
                    <SensorMap selected={selected} setSelected={setSelected} />
                    <SensorDetail sensor={selected} />
                  </div>
                  <AlertList />
                </div>

                {/* Chart panel */}
                <div style={{ background:'var(--bg-card)', border:'1px solid var(--border)', borderRadius:14, padding:16, backdropFilter:'blur(12px)', transition:'background 0.35s' }}>
                  <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:14, flexWrap:'wrap', gap:10 }}>
                    <div style={{ display:'flex', alignItems:'center', gap:7 }}>
                      <Activity size={14} color="var(--accent)" />
                      <span style={{ fontSize:13, fontWeight:700, color:'var(--text-heading)' }}>
                        {tab==='ketinggian' ? 'Ketinggian Air 24 Jam (meter)' : 'Curah Hujan vs Prediksi AI (mm/jam)'}
                      </span>
                    </div>
                    <div style={{ display:'flex', gap:6 }}>
                      {[{k:'ketinggian',l:'Ketinggian'},{k:'curah',l:'Curah Hujan'}].map(t => (
                        <button key={t.k} onClick={() => setTab(t.k)}
                          style={{ padding:'5px 12px', borderRadius:7, fontSize:12, fontWeight:500, border:'1px solid', cursor:'pointer', transition:'all 0.18s', background:tab===t.k?'var(--accent-dim)':'transparent', color:tab===t.k?'var(--accent)':'var(--text-muted)', borderColor:tab===t.k?'var(--border-hover)':'transparent' }}>
                          {t.l}
                        </button>
                      ))}
                    </div>
                  </div>
                  <AnimatePresence mode="wait">
                    <motion.div key={tab} initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} transition={{ duration:0.2 }}>
                      {tab==='ketinggian' ? <WaterLevelChart /> : <RainfallChart />}
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Sensor table */}
                <div style={{ background:'var(--bg-card)', border:'1px solid var(--border)', borderRadius:14, padding:16, backdropFilter:'blur(12px)', transition:'background 0.35s' }}>
                  <div style={{ display:'flex', alignItems:'center', gap:7, marginBottom:14 }}>
                    <Wifi size={14} color="var(--accent)" />
                    <span style={{ fontSize:13, fontWeight:700, color:'var(--text-heading)' }}>Status Semua Sensor</span>
                    <span style={{ fontSize:11, color:'var(--text-muted)' }}>{sensorData.length} titik pantau aktif</span>
                  </div>
                  <SensorTable selected={selected} setSelected={setSelected} />
                </div>
              </>
            ) : (
              <AdminAiControl />
            )}

          </div>
        </motion.div>
      </div>
    </section>
  );
}
