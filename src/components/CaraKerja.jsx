import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Radio, CloudLightning, Database, BrainCircuit, LayoutDashboard } from 'lucide-react';

const steps = [
  { id: '01', icon: Radio,          judul: 'Sensor IoT',      deskripsi: 'Jaringan sensor ultrasonik, pluviometer, dan pressure gauge di titik-titik kritis sungai dan saluran air.', grad: ['#0ea5e9','#2563eb'], glow: 'rgba(14,165,233,0.3)', detail: ['Sensor ketinggian air','Pluviometer curah hujan','Transmisi tiap 5 mnt'] },
  { id: '02', icon: CloudLightning, judul: 'Transmisi Data',  deskripsi: 'Data dikirim via LoRaWAN & 4G ke server pusat, terenkripsi dan real-time setiap 5 menit tanpa henti.',      grad: ['#14b8a6','#0891b2'], glow: 'rgba(20,184,166,0.3)', detail: ['Protokol LoRaWAN','Enkripsi end-to-end','Failover 4G/LTE'] },
  { id: '03', icon: Database,       judul: 'Integrasi Data',  deskripsi: 'Data sensor digabungkan dengan data historis 10 tahun dan prakiraan cuaca BMKG untuk analisis holistik.',       grad: ['#8b5cf6','#6d28d9'], glow: 'rgba(139,92,246,0.3)', detail: ['10 thn data historis','API BMKG real-time','Citra satelit'] },
  { id: '04', icon: BrainCircuit,   judul: 'Model AI',        deskripsi: 'Ensemble LSTM + Random Forest memproses semua data menghasilkan prediksi level risiko dengan akurasi 94%.',        grad: ['#f59e0b','#d97706'], glow: 'rgba(245,158,11,0.3)',  detail: ['LSTM time-series','Random Forest','Update tiap minggu'] },
  { id: '05', icon: LayoutDashboard,judul: 'Output Sistem',   deskripsi: 'Prediksi ditampilkan di dashboard dan dikirim sebagai peringatan otomatis via WhatsApp, SMS, dan sirine.',         grad: ['#10b981','#059669'], glow: 'rgba(16,185,129,0.3)', detail: ['Dashboard real-time','WhatsApp & SMS','Sirine otomatis'] },
];

export default function CaraKerja() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section id="cara-kerja" ref={ref} style={{ padding: '96px 0', position: 'relative' }}>
      <div className="grid-bg" style={{ position: 'absolute', inset: 0, opacity: 0.6 }} />

      <div style={{ position: 'relative', maxWidth: 1200, margin: '0 auto', padding: '0 20px' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} style={{ textAlign: 'center', marginBottom: 56 }}>
          <div className="section-label">Arsitektur Sistem</div>
          <h2 style={{ fontSize: 'clamp(24px, 4vw, 42px)', fontWeight: 800, marginBottom: 12, letterSpacing: '-0.02em' }}>
            Bagaimana <span className="grad-text">HYDROGUARD</span> Bekerja
          </h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: 500, margin: '0 auto', fontSize: 15, lineHeight: 1.7 }}>
            Lima tahap terintegrasi yang mengubah data mentah sensor menjadi peringatan banjir yang akurat dan tepat waktu.
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(195px, 1fr))', gap: 14 }}>
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div key={step.id}
                initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                style={{ borderRadius: 14, border: '1px solid var(--border)', background: 'var(--bg-card)', backdropFilter: 'blur(16px)', padding: '22px 20px', position: 'relative', overflow: 'hidden', cursor: 'default', transition: 'border-color 0.25s, background 0.35s' }}>

                <div style={{ position: 'absolute', top: 14, right: 14, fontFamily: 'JetBrains Mono, monospace', fontSize: 10.5, fontWeight: 600, color: 'var(--text-muted)', background: 'var(--bg-input)', padding: '2px 7px', borderRadius: 5, border: '1px solid var(--border-subtle)' }}>
                  {step.id}
                </div>

                <div style={{ width: 48, height: 48, borderRadius: 12, background: `linear-gradient(135deg, ${step.grad[0]}, ${step.grad[1]})`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16, boxShadow: `0 0 20px ${step.glow}` }}>
                  <Icon size={22} color="#fff" />
                </div>

                <h3 style={{ fontSize: 14.5, fontWeight: 700, color: 'var(--text-heading)', marginBottom: 8 }}>{step.judul}</h3>
                <p style={{ fontSize: 12.5, color: 'var(--text-secondary)', lineHeight: 1.65, marginBottom: 14 }}>{step.deskripsi}</p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                  {step.detail.map((d, j) => (
                    <div key={j} style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 11.5, color: 'var(--text-muted)' }}>
                      <div style={{ width: 5, height: 5, borderRadius: '50%', background: step.grad[0], flexShrink: 0 }} />
                      {d}
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
