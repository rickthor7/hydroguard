import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AreaChart, Area, LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, ReferenceLine
} from 'recharts';
import {
  BrainCircuit, Send, Radio, AlertOctagon, CheckCircle2, RefreshCw,
  Users, ShieldAlert, Cpu, BellRing, Sparkles, MessageSquare, History, Check
} from 'lucide-react';
import {
  historicalDatasets, patternComparisonData,
  aiPersonalizedTemplates, recentBroadcastLogs
} from '../data/aiAdminData';

export default function AdminAiControl() {
  const [selectedDataset, setSelectedDataset] = useState(historicalDatasets[0]);
  const [targetGroup, setTargetGroup] = useState('warga');
  const [editableMessage, setEditableMessage] = useState(aiPersonalizedTemplates.warga.pesan);
  const [selectedChannels, setSelectedChannels] = useState({
    wa: true,
    siren: true,
    appPush: true,
    sms: false,
  });

  // Broadcast state
  const [isSending, setIsSending] = useState(false);
  const [broadcastSuccess, setBroadcastSuccess] = useState(false);
  const [broadcastHistory, setBroadcastHistory] = useState(recentBroadcastLogs);

  const handleGroupChange = (groupKey) => {
    setTargetGroup(groupKey);
    setEditableMessage(aiPersonalizedTemplates[groupKey].pesan);
  };

  const handleRegenerateAI = () => {
    const base = aiPersonalizedTemplates[targetGroup].pesan;
    const timestamp = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
    setEditableMessage(base.replace('[WAKTU]', `${timestamp} WIB`));
  };

  const handleSendBroadcast = () => {
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      setBroadcastSuccess(true);

      const alertPayload = {
        id: `BC-${Math.floor(1000 + Math.random() * 9000)}`,
        waktu: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB',
        wilayah: 'DAS Ciliwung — Wilayah Siaga Kritis',
        pesan: editableMessage,
        channels: { ...selectedChannels },
        targetGroup,
      };

      // Broadcast to localStorage & CustomEvent for citizen dashboard instant sync
      try {
        localStorage.setItem('hg_live_warga_alert', JSON.stringify(alertPayload));
        window.dispatchEvent(new CustomEvent('hg_new_broadcast', { detail: alertPayload }));
      } catch (e) {}

      // Append to broadcast history
      const newLog = {
        id: alertPayload.id,
        waktu: 'Baru saja',
        wilayah: alertPayload.wilayah,
        kanal: Object.keys(selectedChannels).filter(k => selectedChannels[k]).map(k => k === 'wa' ? 'WhatsApp' : k === 'sms' ? 'SMS Blast' : k === 'appPush' ? 'Dashboard Warga' : 'Sirine').join(', '),
        penerima: targetGroup === 'warga' ? '18.420 Warga' : targetGroup === 'timSar' ? '450 Personel TRC' : '65 Operator SDA',
        status: 'Terkirim 100%',
        aiTrigger: `Matching Pola ${selectedDataset.nama} (${selectedDataset.matchScore}%)`,
      };
      setBroadcastHistory(prev => [newLog, ...prev]);
    }, 900);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      
      {/* Top AI Status & Alert Banner */}
      <div
        style={{
          background: 'linear-gradient(135deg, rgba(239,68,68,0.12), rgba(245,158,11,0.08))',
          border: '1px solid rgba(239,68,68,0.3)',
          borderRadius: 14,
          padding: '16px 20px',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 14,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(239,68,68,0.2)', border: '1px solid rgba(239,68,68,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <BrainCircuit size={24} color="#ef4444" className="blink" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 11, fontWeight: 800, color: '#ef4444', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                AI Telemetry Pattern Matcher
              </span>
              <span style={{ fontSize: 11, background: 'rgba(239,68,68,0.25)', color: '#ef4444', padding: '2px 8px', borderRadius: 999, fontWeight: 700 }}>
                CRITICAL SURGE DETECTED
              </span>
            </div>
            <h3 style={{ fontSize: 16, fontWeight: 800, color: 'var(--text-heading)', marginTop: 2 }}>
              Kesesuaian 94.8% dengan Pola Banjir 2020 — AI Merekomendasikan Broadcast Segera
            </h3>
            <p style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 2 }}>
              Laju kenaikan air sensor hulu Katulampa (28 cm/jam) identik dengan profil eskalasi tanggul kritis.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => {
            const el = document.getElementById('ai-broadcast-section');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
          style={{
            background: 'linear-gradient(135deg, #ef4444, #dc2626)',
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            padding: '9px 16px',
            fontSize: 12,
            fontWeight: 700,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            boxShadow: '0 0 16px rgba(239,68,68,0.4)',
          }}
        >
          <Send size={14} />
          Buka Dispatcher Peringatan AI
        </button>
      </div>

      {/* Grid: AI Historical Pattern Matching Engine */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.4fr) minmax(0, 1fr)', gap: 16 }} className="dash-map-grid">
        
        {/* Comparison Chart */}
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 14, padding: 18, backdropFilter: 'blur(16px)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14, flexWrap: 'wrap', gap: 8 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
              <Cpu size={16} color="var(--accent)" />
              <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-heading)' }}>
                Komparasi Pola: Telemetri IoT vs Dataset Historis
              </span>
            </div>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'JetBrains Mono, monospace' }}>
              Model: LSTM-Hydrology v4.2
            </div>
          </div>

          <div style={{ width: '100%', height: 260 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={patternComparisonData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-subtle)" />
                <XAxis dataKey="jam" stroke="var(--text-muted)" fontSize={11} />
                <YAxis stroke="var(--text-muted)" fontSize={11} domain={[0, 5]} unit="m" />
                <Tooltip
                  contentStyle={{
                    background: 'var(--bg-panel)',
                    border: '1px solid var(--border)',
                    borderRadius: 10,
                    fontSize: 12,
                  }}
                />
                <Legend wrapperStyle={{ fontSize: 11, paddingTop: 8 }} />
                <ReferenceLine y={3.5} stroke="#ef4444" strokeDasharray="4 4" label={{ value: 'Batas Siaga 1 (3.5m)', fill: '#ef4444', fontSize: 10, position: 'top' }} />
                
                <Line type="monotone" dataKey="iotAktual" name="Telemetri IoT Aktual (Real-Time)" stroke="#38bdf8" strokeWidth={3} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="pola2020" name="Dataset Banjir Jan 2020" stroke="#ef4444" strokeWidth={2} strokeDasharray="4 3" dot={false} />
                <Line type="monotone" dataKey="pola2013" name="Dataset Banjir Jan 2013" stroke="#f59e0b" strokeWidth={1.8} strokeDasharray="2 2" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Machine Learning Insight Metrics */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginTop: 14 }} className="summary-grid">
            <div style={{ background: 'var(--bg-input)', padding: '10px 12px', borderRadius: 8, border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: 10.5, color: 'var(--text-muted)' }}>Tingkat Kemiripan Pola</div>
              <div style={{ fontSize: 18, fontWeight: 800, color: '#ef4444' }}>{selectedDataset.matchScore}%</div>
              <div style={{ fontSize: 10, color: 'var(--text-secondary)' }}>Korelasi Pearson: 0.95</div>
            </div>
            <div style={{ background: 'var(--bg-input)', padding: '10px 12px', borderRadius: 8, border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: 10.5, color: 'var(--text-muted)' }}>Prediksi Puncak Luapan</div>
              <div style={{ fontSize: 18, fontWeight: 800, color: '#f59e0b' }}>18:30 WIB</div>
              <div style={{ fontSize: 10, color: 'var(--text-secondary)' }}>Ketinggian est: 4.2m</div>
            </div>
            <div style={{ background: 'var(--bg-input)', padding: '10px 12px', borderRadius: 8, border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: 10.5, color: 'var(--text-muted)' }}>Status Ambang Kritis</div>
              <div style={{ fontSize: 16, fontWeight: 800, color: '#ef4444' }}>TERLAMPAUI</div>
              <div style={{ fontSize: 10, color: 'var(--text-secondary)' }}>Toleransi aman 0%</div>
            </div>
          </div>
        </div>

        {/* Historical Dataset Selector & Matching Summary */}
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 14, padding: 18, backdropFilter: 'blur(16px)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 12 }}>
              <Sparkles size={16} color="var(--accent)" />
              <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-heading)' }}>
                Dataset Historis Rujukan AI
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 14 }}>
              {historicalDatasets.map(ds => {
                const isSel = selectedDataset.id === ds.id;
                return (
                  <div
                    key={ds.id}
                    onClick={() => setSelectedDataset(ds)}
                    style={{
                      background: isSel ? 'var(--accent-dim)' : 'var(--bg-input)',
                      border: `1px solid ${isSel ? 'var(--accent)' : 'var(--border-subtle)'}`,
                      borderRadius: 10,
                      padding: '10px 12px',
                      cursor: 'pointer',
                      transition: 'all 0.18s',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: 12.5, fontWeight: 700, color: 'var(--text-heading)' }}>
                        {ds.nama}
                      </span>
                      <span style={{ fontSize: 12, fontWeight: 800, color: ds.warna }}>
                        {ds.matchScore}% Match
                      </span>
                    </div>
                    <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginTop: 3 }}>
                      {ds.karakteristik}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div
            style={{
              background: 'var(--bg-panel)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 10,
              padding: '12px 14px',
            }}
          >
            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--accent)', marginBottom: 2 }}>
              Kesimpulan Rekomendasi AI:
            </div>
            <p style={{ fontSize: 12, color: 'var(--text-primary)', lineHeight: 1.55 }}>
              Data sensor menunjukkan kurva hidrograf naik tajam menyerupai Banjir 2020. Penanganan evakuasi dini <strong>harus disiagakan maksimal dalam 90 menit</strong> sebelum debit puncak tiba di Pintu Air Manggarai.
            </p>
          </div>
        </div>

      </div>

      {/* Bagian 2: AI Personalized Alert Dispatcher */}
      <div
        id="ai-broadcast-section"
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          borderRadius: 16,
          padding: 22,
          backdropFilter: 'blur(16px)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16, flexWrap: 'wrap', gap: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Radio size={18} color="#ef4444" className="blink" />
            <div>
              <h3 style={{ fontSize: 15, fontWeight: 800, color: 'var(--text-heading)' }}>
                Pengiriman Notifikasi Peringatan Dini Terpersonalisasi (AI Dispatcher)
              </h3>
              <p style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
                Pesan dirancang khusus oleh AI berdasarkan profil penerima dan tingkat kerawanan wilayah.
              </p>
            </div>
          </div>

          {/* Group Switcher Tabs */}
          <div style={{ display: 'flex', gap: 6 }}>
            {Object.keys(aiPersonalizedTemplates).map(gKey => {
              const item = aiPersonalizedTemplates[gKey];
              const isSel = targetGroup === gKey;
              return (
                <button
                  key={gKey}
                  type="button"
                  onClick={() => handleGroupChange(gKey)}
                  style={{
                    padding: '6px 12px',
                    borderRadius: 8,
                    fontSize: 11.5,
                    fontWeight: isSel ? 700 : 500,
                    border: `1px solid ${isSel ? 'var(--accent)' : 'var(--border)'}`,
                    background: isSel ? 'var(--accent-dim)' : 'var(--bg-input)',
                    color: isSel ? 'var(--accent)' : 'var(--text-secondary)',
                    cursor: 'pointer',
                    transition: 'all 0.18s',
                  }}
                >
                  {item.badge}
                </button>
              );
            })}
          </div>
        </div>

        {/* Message Editor Box */}
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.5fr) minmax(0, 1fr)', gap: 16 }} className="dash-map-grid">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                Draf Pesan Otomatis AI (Dapat Diedit Operator)
              </span>
              <button
                type="button"
                onClick={handleRegenerateAI}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--accent)',
                  fontSize: 11,
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4,
                }}
              >
                <RefreshCw size={11} />
                Regenerate AI
              </button>
            </div>

            <textarea
              value={editableMessage}
              onChange={e => setEditableMessage(e.target.value)}
              rows={6}
              style={{
                width: '100%',
                background: 'var(--bg-panel)',
                border: '1px solid var(--border)',
                borderRadius: 10,
                padding: 12,
                color: 'var(--text-primary)',
                fontFamily: 'Inter, sans-serif',
                fontSize: 12.5,
                lineHeight: 1.6,
                resize: 'vertical',
                outline: 'none',
              }}
            />
          </div>

          {/* Multi-Channel Distribution & Trigger Button */}
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 12 }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 8 }}>
                Pilih Kanal Distribusi Siaga:
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {[
                  { key: 'appPush', label: 'Dashboard Warga & Push Notifikasi', desc: 'Tayang langsung seketika di portal masyarakat', icon: '📱' },
                  { key: 'wa', label: 'WhatsApp Broadcast Gateway (Warga Terdaftar)', desc: 'Broadcast massal ke nomor WA warga & pengurus RT/RW', icon: '💬' },
                  { key: 'sms', label: 'SMS Cell Broadcast (Kominfo / Provider)', desc: 'Terkirim langsung via SMS broadcast ke seluruh ponsel di zona merah', icon: '✉️' },
                  { key: 'siren', label: 'Aktivasi Sirine Peringatan Lapangan (Pos Pantau)', desc: 'Radius alarm suara darurat 1.5 km di tepi sungai', icon: '🚨' },
                ].map(c => (
                  <label
                    key={c.key}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      background: 'var(--bg-input)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: 8,
                      padding: '8px 10px',
                      cursor: 'pointer',
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={selectedChannels[c.key]}
                      onChange={() => setSelectedChannels(p => ({ ...p, [c.key]: !p[c.key] }))}
                      style={{ accentColor: '#0ea5e9' }}
                    />
                    <div>
                      <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-heading)', display: 'flex', alignItems: 'center', gap: 6 }}>
                        <span>{c.icon}</span>
                        <span>{c.label}</span>
                      </div>
                      <div style={{ fontSize: 10.5, color: 'var(--text-muted)' }}>{c.desc}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Big Action Button */}
            <button
              type="button"
              disabled={isSending}
              onClick={handleSendBroadcast}
              style={{
                width: '100%',
                padding: '12px 18px',
                background: 'linear-gradient(135deg, #ef4444, #f59e0b)',
                border: 'none',
                borderRadius: 10,
                color: '#fff',
                fontSize: 13,
                fontWeight: 800,
                cursor: isSending ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                boxShadow: '0 0 20px rgba(239,68,68,0.4)',
                transition: 'opacity 0.2s',
                opacity: isSending ? 0.7 : 1,
              }}
            >
              {isSending ? (
                <>
                  <RefreshCw size={16} className="animate-spin" />
                  Mengirim Broadcast ke Seluruh Kanal...
                </>
              ) : (
                <>
                  <Send size={16} />
                  Kirim Notifikasi Peringatan AI Sekarang
                </>
              )}
            </button>
          </div>
        </div>

        {/* Broadcast Success Modal / Notification Banner */}
        <AnimatePresence>
          {broadcastSuccess && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              style={{
                background: 'rgba(16,185,129,0.12)',
                border: '1px solid rgba(16,185,129,0.3)',
                borderRadius: 12,
                padding: '14px 18px',
                marginTop: 16,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <CheckCircle2 size={22} color="#10b981" />
                <div>
                  <div style={{ fontSize: 13.5, fontWeight: 700, color: '#10b981' }}>
                    Broadcast Berhasil Dikirimkan!
                  </div>
                  <div style={{ fontSize: 11.5, color: 'var(--text-secondary)' }}>
                    Peringatan telah sampai ke {targetGroup === 'warga' ? '18.420 warga' : 'petugas siaga'} dengan tingkat keberhasilan transmisi 100%. Sirine lapangan aktif.
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setBroadcastSuccess(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-muted)',
                  fontSize: 12,
                  cursor: 'pointer',
                  padding: 4,
                }}
              >
                Tutup
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Recent Broadcast Log Table */}
        <div style={{ marginTop: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
            <History size={14} color="var(--text-muted)" />
            <span style={{ fontSize: 11.5, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              Riwayat Pengiriman Notifikasi Terakhir (Broadcast Logs)
            </span>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table className="dash-table">
              <thead>
                <tr>
                  <th>Log ID</th>
                  <th>Waktu</th>
                  <th>Wilayah Sasaran</th>
                  <th>Kanal Pengiriman</th>
                  <th>Penerima</th>
                  <th>Pemicu AI</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {broadcastHistory.map(log => (
                  <tr key={log.id}>
                    <td className="mono">{log.id}</td>
                    <td style={{ color: 'var(--text-secondary)' }}>{log.waktu}</td>
                    <td style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{log.wilayah}</td>
                    <td style={{ color: 'var(--text-secondary)', fontSize: 11 }}>{log.kanal}</td>
                    <td className="mono">{log.penerima}</td>
                    <td style={{ color: 'var(--accent)', fontSize: 11 }}>{log.aiTrigger}</td>
                    <td>
                      <span style={{ padding: '2px 8px', borderRadius: 999, fontSize: 10, fontWeight: 700, background: 'rgba(16,185,129,0.15)', color: '#10b981', border: '1px solid rgba(16,185,129,0.3)' }}>
                        {log.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

    </div>
  );
}
