import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { AlertTriangle, CheckCircle2, Zap, Clock, TrendingDown, TrendingUp } from 'lucide-react';

const conventional = [
  { icon: Clock, text: 'Deteksi manual oleh petugas lapangan' },
  { icon: AlertTriangle, text: 'Waktu respons lambat (jam hingga hari)' },
  { icon: TrendingDown, text: 'Informasi tersebar, tidak terintegrasi' },
  { icon: AlertTriangle, text: 'Peringatan hanya saat bencana sudah terjadi' },
  { icon: TrendingDown, text: 'Evakuasi reaktif, tanpa rencana terstruktur' },
];

const hydroguard = [
  { icon: Zap, text: 'Sensor IoT otomatis memantau 24/7 tanpa henti' },
  { icon: CheckCircle2, text: 'Deteksi dini 3–6 jam sebelum banjir terjadi' },
  { icon: TrendingUp, text: 'Data terpusat, terintegrasi, dan real-time' },
  { icon: CheckCircle2, text: 'Peringatan multi-kanal otomatis & adaptif' },
  { icon: TrendingUp, text: 'Protokol mitigasi terstruktur berbasis AI' },
];

export default function ProblemStatement() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="masalah" ref={ref} style={{ padding: '96px 0', position: 'relative' }}>
      <div className="grid-bg" style={{ position: 'absolute', inset: 0, opacity: 0.6 }} />

      <div style={{ position: 'relative', maxWidth: 1100, margin: '0 auto', padding: '0 20px' }}>
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} style={{ textAlign: 'center', marginBottom: 52 }}>
          <div className="section-label">Mengapa HYDROGUARD?</div>
          <h2 style={{ fontSize: 'clamp(24px, 4vw, 42px)', fontWeight: 800, marginBottom: 12, letterSpacing: '-0.02em' }}>
            Dari Pendekatan <span className="grad-text-warm">Reaktif</span> ke <span className="grad-text">Prediktif</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: 500, margin: '0 auto', fontSize: 15, lineHeight: 1.7 }}>
            Sistem konvensional selalu selangkah di belakang bencana. HYDROGUARD hadir untuk membalikkan paradigma itu.
          </p>
        </motion.div>

        {/* Two-column comparison */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))', gap: 18 }}>

          {/* ❌ Conventional */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.55, delay: 0.1 }}
            style={{ borderRadius: 16, border: '1px solid rgba(239,68,68,0.18)', background: 'var(--bg-card)', backdropFilter: 'blur(16px)', padding: '26px 24px', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at top left, rgba(239,68,68,0.05), transparent 60%)', pointerEvents: 'none' }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <AlertTriangle size={18} color="#f87171" />
              </div>
              <div>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#f87171' }}>Pendekatan Lama</div>
                <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-heading)', marginTop: 1 }}>Sistem Konvensional</div>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {conventional.map(({ icon: Icon, text }, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.2 + i * 0.07 }}
                  style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                  <Icon size={13} color="#f87171" style={{ marginTop: 3, flexShrink: 0 }} />
                  <span style={{ fontSize: 13.5, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{text}</span>
                </motion.div>
              ))}
            </div>
            <div style={{ marginTop: 20, padding: '11px 14px', borderRadius: 10, background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.14)' }}>
              <span style={{ fontSize: 11, fontWeight: 600, color: '#fca5a5' }}>Dampak: </span>
              <span style={{ fontSize: 12.5, color: '#fca5a5' }}>Korban jiwa, kerugian material, kepanikan massal yang bisa dicegah.</span>
            </div>
          </motion.div>

          {/* ✅ HYDROGUARD */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.55, delay: 0.2 }}
            style={{ borderRadius: 16, border: '1px solid rgba(14,165,233,0.2)', background: 'var(--bg-card)', backdropFilter: 'blur(16px)', padding: '26px 24px', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at top right, rgba(14,165,233,0.06), transparent 60%)', pointerEvents: 'none' }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(14,165,233,0.1)', border: '1px solid rgba(14,165,233,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: '0 0 14px rgba(14,165,233,0.18)' }}>
                <Zap size={18} color="#38bdf8" />
              </div>
              <div>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--accent)' }}>Solusi Modern</div>
                <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-heading)', marginTop: 1 }}>HYDROGUARD AIoT</div>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {hydroguard.map(({ icon: Icon, text }, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: 10 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.3 + i * 0.07 }}
                  style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                  <Icon size={13} color="#34d399" style={{ marginTop: 3, flexShrink: 0 }} />
                  <span style={{ fontSize: 13.5, color: 'var(--text-primary)', lineHeight: 1.6 }}>{text}</span>
                </motion.div>
              ))}
            </div>
            <div style={{ marginTop: 20, padding: '11px 14px', borderRadius: 10, background: 'rgba(14,165,233,0.06)', border: '1px solid rgba(14,165,233,0.14)' }}>
              <span style={{ fontSize: 11, fontWeight: 600, color: '#7dd3fc' }}>Hasil: </span>
              <span style={{ fontSize: 12.5, color: '#7dd3fc' }}>Evakuasi terencana, kerugian minimal, respons cepat dan terkoordinasi.</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
