import { motion } from 'framer-motion';
import { ChevronDown, Zap, Shield, Activity } from 'lucide-react';
import { useRole } from '../context/RoleContext';

const pills = [
  { icon: Activity, text: '10 Sensor Aktif', color: 'var(--accent)' },
  { icon: Shield, text: 'Akurasi 94%', color: 'var(--accent2)' },
  { icon: Zap, text: 'Deteksi 3 Menit', color: '#fbbf24' },
];

export default function HeroSection() {
  const { setActiveRole } = useRole();
  return (
    <section id="beranda" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: 80, paddingBottom: 40, position: 'relative', overflow: 'hidden' }}>

      {/* Layered backgrounds */}
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 80% 55% at 50% 0%, rgba(14,165,233,0.1) 0%, transparent 65%)' }} />
      <div className="grid-bg" style={{ position: 'absolute', inset: 0, opacity: 0.8 }} />

      {/* Animated orbs */}
      <motion.div animate={{ scale: [1, 1.18, 1], opacity: [0.1, 0.2, 0.1] }} transition={{ duration: 8, repeat: Infinity }}
        style={{ position: 'absolute', top: '10%', left: '5%', width: 380, height: 380, borderRadius: '50%', background: 'radial-gradient(circle, rgba(14,165,233,0.16), transparent 70%)', filter: 'blur(50px)', pointerEvents: 'none' }} />
      <motion.div animate={{ scale: [1, 1.22, 1], opacity: [0.07, 0.16, 0.07] }} transition={{ duration: 10, repeat: Infinity, delay: 2 }}
        style={{ position: 'absolute', bottom: '8%', right: '5%', width: 440, height: 440, borderRadius: '50%', background: 'radial-gradient(circle, rgba(20,184,166,0.14), transparent 70%)', filter: 'blur(60px)', pointerEvents: 'none' }} />

      {/* Floating particles */}
      {[...Array(22)].map((_, i) => (
        <motion.div key={i}
          animate={{ y: [0, -28, 0], opacity: [0.15, 0.6, 0.15] }}
          transition={{ duration: 3 + (i % 5), repeat: Infinity, delay: i * 0.3, ease: 'easeInOut' }}
          style={{
            position: 'absolute', borderRadius: '50%', pointerEvents: 'none',
            width: i % 4 === 0 ? 5 : i % 4 === 1 ? 3 : i % 4 === 2 ? 4 : 2,
            height: i % 4 === 0 ? 5 : i % 4 === 1 ? 3 : i % 4 === 2 ? 4 : 2,
            left: `${6 + (i * 4.4) % 88}%`,
            top: `${8 + (i * 7.7) % 78}%`,
            background: i % 3 === 0 ? '#38bdf8' : i % 3 === 1 ? '#14b8a6' : '#818cf8',
          }}
        />
      ))}

      {/* Bottom wave */}
      <svg style={{ position: 'absolute', bottom: 0, left: 0, width: '100%' }} viewBox="0 0 1440 100" preserveAspectRatio="none">
        <defs>
          <linearGradient id="wg" x1="0%" x2="100%">
            <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.2" />
            <stop offset="50%" stopColor="#14b8a6" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0.2" />
          </linearGradient>
        </defs>
        <motion.path
          animate={{ d: ['M0,50 C480,90 960,10 1440,50 L1440,100 L0,100 Z', 'M0,72 C480,15 960,90 1440,35 L1440,100 L0,100 Z', 'M0,50 C480,90 960,10 1440,50 L1440,100 L0,100 Z'] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          fill="url(#wg)"
        />
      </svg>

      {/* Content */}
      <div style={{ position: 'relative', maxWidth: 880, width: '100%', margin: '0 auto', padding: '0 20px', textAlign: 'center' }}>

        {/* Live badge */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px', borderRadius: 999, border: '1px solid rgba(34,197,94,0.3)', background: 'rgba(34,197,94,0.07)', marginBottom: 28 }}>
          <span className="blink" style={{ width: 8, height: 8, borderRadius: '50%', background: '#22c55e', display: 'inline-block' }} />
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', color: '#86efac', textTransform: 'uppercase' }}>Sistem Aktif — Live Monitoring</span>
        </motion.div>

        {/* Headline */}
        <motion.h1 initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.1 }}
          style={{ fontSize: 'clamp(34px, 6.5vw, 72px)', fontWeight: 800, lineHeight: 1.1, marginBottom: 24, letterSpacing: '-0.025em' }}>
          Prediksi Banjir{' '}
          <span className="grad-text">Sebelum</span>
          <br />
          Bencana{' '}
          <span className="grad-text">Terjadi</span>
        </motion.h1>

        {/* Subheading */}
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
          style={{ fontSize: 'clamp(15px, 2.2vw, 18px)', color: 'var(--text-secondary)', maxWidth: 560, margin: '0 auto 36px', lineHeight: 1.75 }}>
          HYDROGUARD mengintegrasikan <strong style={{ color: 'var(--accent)', fontWeight: 600 }}>sensor IoT</strong>, data cuaca real-time, dan{' '}
          <strong style={{ color: 'var(--accent)', fontWeight: 600 }}>kecerdasan buatan</strong> untuk mendeteksi risiko banjir hingga{' '}
          <strong style={{ color: 'var(--accent2)', fontWeight: 700 }}>6 jam lebih awal</strong>.
        </motion.p>

        {/* CTAs with separated Government and Citizen Dashboard access */}
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.3 }}
          style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center', marginBottom: 44 }}>
          <button
            type="button"
            onClick={() => {
              setActiveRole('warga');
              const el = document.getElementById('portal-warga');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              background: 'linear-gradient(135deg, #10b981, #059669)',
              color: '#ffffff',
              padding: '12px 22px',
              borderRadius: 10,
              fontSize: 14,
              fontWeight: 700,
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 0 24px rgba(16,185,129,0.35)',
              transition: 'transform 0.2s',
            }}
          >
            <span>👥</span>
            <span>Masuk Portal Warga & Evakuasi</span>
            <ChevronDown size={15} />
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveRole('pemerintah');
              const el = document.getElementById('dashboard');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              background: 'linear-gradient(135deg, #0ea5e9, #0284c7)',
              color: '#ffffff',
              padding: '12px 22px',
              borderRadius: 10,
              fontSize: 14,
              fontWeight: 700,
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 0 24px rgba(14,165,233,0.35)',
              transition: 'transform 0.2s',
            }}
          >
            <span>🏛️</span>
            <span>Masuk Pusat Kendali BPBD</span>
            <ChevronDown size={15} />
          </button>
        </motion.div>

        {/* Stat pills */}
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.45 }}
          style={{ display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center' }}>
          {pills.map(({ icon: Icon, text, color }) => (
            <div key={text} style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '8px 16px', borderRadius: 999, background: 'var(--bg-card)', border: '1px solid var(--border)', fontSize: 13, color: 'var(--text-secondary)', backdropFilter: 'blur(10px)' }}>
              <Icon size={14} color={color} />
              {text}
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}
        style={{ position: 'absolute', bottom: 24, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, color: 'var(--text-muted)' }}>
        <span style={{ fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase' }}>Gulir ke bawah</span>
        <motion.div animate={{ y: [0, 7, 0] }} transition={{ duration: 1.4, repeat: Infinity }}>
          <ChevronDown size={16} />
        </motion.div>
      </motion.div>
    </section>
  );
}
