import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Shield, Activity, Zap, Target, Bell, Users } from 'lucide-react';
import { statsData } from '../data/dummyData';

const iconMap = { shield:Shield, activity:Activity, zap:Zap, target:Target, bell:Bell, users:Users };
const colors = [['#0ea5e9','#22d3ee'],['#14b8a6','#34d399'],['#f59e0b','#fbbf24'],['#8b5cf6','#a78bfa'],['#ef4444','#f87171'],['#3b82f6','#818cf8']];

function CountUp({ target, inView }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let v = 0;
    const step = target / (1800 / 16);
    const timer = setInterval(() => {
      v += step;
      if (v >= target) { setVal(target); clearInterval(timer); }
      else setVal(Math.floor(v));
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);

  if (target >= 1000000) return <>{(val/1000000).toFixed(1)}Jt</>;
  if (target >= 1000)    return <>{val.toLocaleString('id-ID')}</>;
  return <>{val}</>;
}

export default function DampakKontribusi() {
  const ref = useRef(null);
  const inView = useInView(ref, { once:true, margin:'-80px' });

  return (
    <section id="dampak" ref={ref} style={{ padding:'96px 0', position:'relative' }}>
      <div className="grid-bg" style={{ position:'absolute', inset:0, opacity:0.45 }} />
      <div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', width:700, height:400, borderRadius:'50%', background:'radial-gradient(circle, rgba(14,165,233,0.04), transparent 70%)', pointerEvents:'none', filter:'blur(60px)' }} />

      <div style={{ position:'relative', maxWidth:1100, margin:'0 auto', padding:'0 20px' }}>

        {/* Header */}
        <motion.div initial={{ opacity:0, y:20 }} animate={inView?{opacity:1,y:0}:{}} style={{ textAlign:'center', marginBottom:52 }}>
          <div className="section-label">Dampak & Potensi</div>
          <h2 style={{ fontSize:'clamp(24px, 4vw, 42px)', fontWeight:800, marginBottom:12, letterSpacing:'-0.02em' }}>
            Angka yang <span className="grad-text">Bicara</span>
          </h2>
          <p style={{ color:'var(--text-secondary)', maxWidth:460, margin:'0 auto', fontSize:15, lineHeight:1.7 }}>
            Estimasi dampak HYDROGUARD berdasarkan studi kelayakan dan data historis bencana banjir Jabodetabek.
          </p>
        </motion.div>

        {/* Stats grid */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(155px, 1fr))', gap:14, marginBottom:52 }}>
          {statsData.map((stat, i) => {
            const Icon = iconMap[stat.ikon] || Shield;
            const [c1, c2] = colors[i % colors.length];
            return (
              <motion.div key={stat.label}
                initial={{ opacity:0, scale:0.92 }} animate={inView?{opacity:1,scale:1}:{}} transition={{ duration:0.45, delay:i*0.09 }}
                whileHover={{ scale:1.03, transition:{duration:0.2} }}
                style={{ background:'var(--bg-card)', border:'1px solid var(--border)', borderRadius:14, padding:'22px 18px', textAlign:'center', backdropFilter:'blur(14px)', transition:'border-color 0.25s, background 0.35s' }}
                onMouseEnter={e => e.currentTarget.style.borderColor = `${c1}44`}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}>
                <div style={{ width:44, height:44, borderRadius:12, background:`linear-gradient(135deg, ${c1}, ${c2})`, display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 14px', boxShadow:`0 0 16px ${c1}44` }}>
                  <Icon size={20} color="#fff" />
                </div>
                <div style={{ fontSize:'clamp(26px, 4vw, 36px)', fontWeight:900, color:'var(--text-heading)', fontFamily:'Space Grotesk,sans-serif', letterSpacing:'-0.03em', lineHeight:1 }}>
                  <CountUp target={stat.nilai} inView={inView} />
                </div>
                <div style={{ fontSize:10.5, fontWeight:700, color:c1, marginTop:6, textTransform:'uppercase', letterSpacing:'0.07em' }}>{stat.satuan}</div>
                <div style={{ fontSize:12, color:'var(--text-secondary)', marginTop:4 }}>{stat.label}</div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA Banner */}
        <motion.div initial={{ opacity:0, y:20 }} animate={inView?{opacity:1,y:0}:{}} transition={{ delay:0.5 }}
          style={{ borderRadius:18, padding:1, background:'linear-gradient(135deg, rgba(14,165,233,0.35), rgba(20,184,166,0.3), rgba(139,92,246,0.25))' }}>
          <div style={{ borderRadius:17, padding:'40px 32px', textAlign:'center', background:'var(--bg-card)', backdropFilter:'blur(20px)', transition:'background 0.35s' }}>
            <h3 style={{ fontSize:'clamp(20px, 3.5vw, 32px)', fontWeight:800, color:'var(--text-heading)', marginBottom:12, letterSpacing:'-0.02em' }}>
              Jadilah Bagian dari <span className="grad-text">Solusi</span>
            </h3>
            <p style={{ color:'var(--text-secondary)', maxWidth:500, margin:'0 auto 26px', fontSize:14.5, lineHeight:1.75 }}>
              HYDROGUARD dikembangkan sebagai proyek riset multidisiplin yang menggabungkan keahlian IoT, data science, dan manajemen bencana. Kami terbuka untuk kolaborasi dengan instansi pemerintah, akademisi, dan sektor swasta.
            </p>
            <div style={{ display:'flex', flexWrap:'wrap', gap:12, justifyContent:'center' }}>
              <a href="#dashboard" className="btn-primary">Demo Dashboard</a>
              <a href="mailto:hydroguard@example.com" className="btn-outline">Hubungi Tim</a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
