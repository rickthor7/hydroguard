import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { BrainCircuit, BellRing, MapPin, Gauge, CloudRain, ShieldCheck } from 'lucide-react';
import { fiturUnggulan } from '../data/dummyData';

const iconMap = { 'brain-circuit':BrainCircuit, 'bell-ring':BellRing, 'map-pin':MapPin, 'gauge':Gauge, 'cloud-rain':CloudRain, 'shield-check':ShieldCheck };
const gradMap = {
  'from-blue-500 to-cyan-400':   ['#3b82f6','#22d3ee'],
  'from-amber-500 to-orange-400':['#f59e0b','#fb923c'],
  'from-teal-500 to-emerald-400':['#14b8a6','#34d399'],
  'from-purple-500 to-pink-400': ['#a855f7','#f472b6'],
  'from-sky-500 to-blue-400':    ['#0ea5e9','#60a5fa'],
  'from-green-500 to-teal-400':  ['#22c55e','#2dd4bf'],
};

export default function FiturUnggulan() {
  const ref = useRef(null);
  const inView = useInView(ref, { once:true, margin:'-60px' });

  return (
    <section id="fitur" ref={ref} style={{ padding:'96px 0', position:'relative' }}>
      <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse 70% 50% at 50% 100%, rgba(20,184,166,0.05), transparent)', pointerEvents:'none' }} />

      <div style={{ position:'relative', maxWidth:1100, margin:'0 auto', padding:'0 20px' }}>
        <motion.div initial={{ opacity:0, y:20 }} animate={inView?{opacity:1,y:0}:{}} style={{ textAlign:'center', marginBottom:50 }}>
          <div className="section-label">Keunggulan Produk</div>
          <h2 style={{ fontSize:'clamp(24px, 4vw, 42px)', fontWeight:800, marginBottom:12, letterSpacing:'-0.02em' }}>
            Fitur <span className="grad-text">Unggulan</span> HYDROGUARD
          </h2>
          <p style={{ color:'var(--text-secondary)', maxWidth:500, margin:'0 auto', fontSize:15, lineHeight:1.7 }}>
            Dirancang untuk keandalan ekstrem di kondisi darurat, dengan kapabilitas kelas enterprise untuk perlindungan banjir.
          </p>
        </motion.div>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(300px, 1fr))', gap:16 }}>
          {fiturUnggulan.map((f, i) => {
            const Icon = iconMap[f.ikon] || ShieldCheck;
            const [c1, c2] = gradMap[f.warna] || ['#0ea5e9','#14b8a6'];
            return (
              <motion.div key={f.judul}
                initial={{ opacity:0, y:22 }} animate={inView?{opacity:1,y:0}:{}} transition={{ duration:0.5, delay:i*0.09 }}
                whileHover={{ y:-4, transition:{ duration:0.2 } }}
                style={{ background:'var(--bg-card)', backdropFilter:'blur(16px)', border:'1px solid var(--border)', borderRadius:14, padding:'24px 22px', position:'relative', overflow:'hidden', cursor:'default', transition:'border-color 0.25s, box-shadow 0.25s, transform 0.25s, background 0.35s' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = `${c1}55`; e.currentTarget.style.boxShadow = `0 0 26px ${c1}12`; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.boxShadow = 'none'; }}>

                {/* Top accent line */}
                <div style={{ position:'absolute', top:0, left:0, right:0, height:2, background:`linear-gradient(90deg, ${c1}, ${c2})`, opacity:0.7, borderRadius:'14px 14px 0 0' }} />

                {/* Icon */}
                <div style={{ width:48, height:48, borderRadius:12, background:`linear-gradient(135deg, ${c1}, ${c2})`, display:'flex', alignItems:'center', justifyContent:'center', marginBottom:16, boxShadow:`0 0 20px ${c1}44` }}>
                  <Icon size={22} color="#fff" />
                </div>

                <h3 style={{ fontSize:15, fontWeight:700, color:'var(--text-heading)', marginBottom:8 }}>{f.judul}</h3>
                <p style={{ fontSize:13, color:'var(--text-secondary)', lineHeight:1.65 }}>{f.deskripsi}</p>

                <div style={{ marginTop:16, display:'flex', alignItems:'center', gap:5, fontSize:12, color:'var(--text-muted)', transition:'color 0.2s' }}>
                  <span>Pelajari lebih lanjut</span>
                  <span style={{ fontSize:13 }}>→</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
