import { Droplets, Code2, Mail, Globe, ArrowUpRight } from 'lucide-react';

const team = [
  { nama:'Tim Pengembang AIoT',   peran:'Sistem Sensor & Firmware' },
  { nama:'Tim Data Science',      peran:'Model AI & Analitik' },
  { nama:'Tim Frontend',          peran:'Dashboard & UI/UX' },
  { nama:'Tim Manajemen Bencana', peran:'Protokol & Kebijakan' },
];
const links = ['Dokumentasi', 'API Reference', 'Roadmap', 'Changelog'];
const socials = [{ href:'https://github.com', icon:Code2 }, { href:'mailto:hydroguard@example.com', icon:Mail }, { href:'#', icon:Globe }];

export default function Footer() {
  return (
    <footer style={{ borderTop:'1px solid var(--border)', background:'var(--bg-panel)', position:'relative', transition:'background 0.35s' }}>
      <div className="grid-bg" style={{ position:'absolute', inset:0, opacity:0.18, pointerEvents:'none' }} />

      <div style={{ position:'relative', maxWidth:1200, margin:'0 auto', padding:'56px 20px 28px' }}>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(200px, 1fr))', gap:36, marginBottom:44 }}>

          {/* Brand — spans 2 cols on wide screens */}
          <div className="footer-brand-col" style={{ gridColumn:'span 2' }}>
            <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:14 }}>
              <div style={{ width:34, height:34, borderRadius:9, background:'linear-gradient(135deg,#0ea5e9,#14b8a6)', display:'flex', alignItems:'center', justifyContent:'center', boxShadow:'0 0 16px rgba(14,165,233,0.3)', flexShrink:0 }}>
                <Droplets size={16} color="#fff" />
              </div>
              <span style={{ fontFamily:'Space Grotesk,sans-serif', fontWeight:700, fontSize:17 }}>
                <span className="grad-text">HYDRO</span>
                <span style={{ color:'var(--text-heading)' }}>GUARD</span>
              </span>
            </div>
            <p style={{ fontSize:13, color:'var(--text-secondary)', lineHeight:1.75, maxWidth:310, marginBottom:18 }}>
              Sistem cerdas berbasis AIoT untuk prediksi dan mitigasi risiko banjir secara real-time. Melindungi jutaan jiwa melalui teknologi yang bekerja sebelum bencana terjadi.
            </p>
            <div style={{ display:'flex', gap:8 }}>
              {socials.map(({ href, icon:Icon }, i) => (
                <a key={i} href={href} target="_blank" rel="noopener noreferrer"
                  style={{ width:34, height:34, borderRadius:8, border:'1px solid var(--border)', display:'flex', alignItems:'center', justifyContent:'center', color:'var(--text-muted)', transition:'color 0.2s, border-color 0.2s', textDecoration:'none' }}
                  onMouseEnter={e => { e.currentTarget.style.color='var(--accent)'; e.currentTarget.style.borderColor='var(--border-hover)'; }}
                  onMouseLeave={e => { e.currentTarget.style.color='var(--text-muted)'; e.currentTarget.style.borderColor='var(--border)'; }}>
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Team */}
          <div>
            <h4 style={{ fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.1em', color:'var(--text-muted)', marginBottom:16 }}>Tim Proyek</h4>
            <div style={{ display:'flex', flexDirection:'column', gap:13 }}>
              {team.map(m => (
                <div key={m.nama}>
                  <div style={{ fontSize:13, color:'var(--text-primary)', fontWeight:500 }}>{m.nama}</div>
                  <div style={{ fontSize:11.5, color:'var(--text-muted)', marginTop:2 }}>{m.peran}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 style={{ fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.1em', color:'var(--text-muted)', marginBottom:16 }}>Sumber Daya</h4>
            <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
              {links.map(l => (
                <a key={l} href="#" style={{ display:'flex', alignItems:'center', gap:4, fontSize:13, color:'var(--text-secondary)', textDecoration:'none', transition:'color 0.18s' }}
                  onMouseEnter={e => e.currentTarget.style.color='var(--accent)'}
                  onMouseLeave={e => e.currentTarget.style.color='var(--text-secondary)'}>
                  {l} <ArrowUpRight size={11} />
                </a>
              ))}
            </div>
            {/* Status pill */}
            <div style={{ marginTop:20, padding:'11px 13px', borderRadius:10, border:'1px solid rgba(34,197,94,0.2)', background:'rgba(34,197,94,0.05)' }}>
              <div style={{ display:'flex', alignItems:'center', gap:6, fontSize:12, fontWeight:600, color:'#34d399' }}>
                <span className="blink" style={{ width:7, height:7, borderRadius:'50%', background:'#22c55e', display:'inline-block' }} />
                Sistem Operasional
              </div>
              <div style={{ fontSize:11.5, color:'var(--text-muted)', marginTop:3 }}>Uptime 99.7% · Diperbarui real-time</div>
            </div>
          </div>
        </div>

        <div className="divider" style={{ marginBottom:22 }} />

        <div style={{ display:'flex', flexWrap:'wrap', alignItems:'center', justifyContent:'space-between', gap:10 }}>
          <div style={{ fontSize:12, color:'var(--text-faint)' }}>
            © 2025 HYDROGUARD Project — Dikembangkan untuk riset dan perlindungan masyarakat.
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:10, fontSize:12, color:'var(--text-faint)' }}>
            <span>Dibangun dengan ❤️ menggunakan AIoT & React</span>
            <span style={{ padding:'2px 7px', borderRadius:5, border:'1px solid var(--border-subtle)', fontFamily:'JetBrains Mono,monospace', fontSize:10.5 }}>v1.0.0-beta</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
