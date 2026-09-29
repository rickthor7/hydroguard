import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Droplets, Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const navItems = [
  { label: 'Beranda', href: '#beranda' },
  { label: 'Cara Kerja', href: '#cara-kerja' },
  { label: 'Pusat Kendali', href: '#dashboard' },
  { label: 'Portal Warga', href: '#portal-warga' },
  { label: 'Dampak', href: '#dampak' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { isDark, toggle } = useTheme();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <motion.nav
      initial={{ y: -70 }} animate={{ y: 0 }} transition={{ duration: 0.55, ease: 'easeOut' }}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled ? 'var(--nav-bg-scroll)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--nav-border)' : '1px solid transparent',
        transition: 'background 0.3s, border-color 0.3s',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>

        {/* Logo */}
        <a href="#beranda" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', flexShrink: 0 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg,#0ea5e9,#14b8a6)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 18px var(--glow-blue)', flexShrink: 0 }}>
            <Droplets size={18} color="#fff" />
          </div>
          <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 18, whiteSpace: 'nowrap' }}>
            <span className="grad-text">HYDRO</span>
            <span style={{ color: 'var(--text-heading)' }}>GUARD</span>
          </span>
        </a>

        {/* Desktop nav */}
        <div className="nav-desktop" style={{ alignItems: 'center', gap: 2 }}>
          {navItems.map(i => <a key={i.label} href={i.href} className="nav-link">{i.label}</a>)}
        </div>

        {/* Right side: CTA + theme toggle + hamburger */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
          <a href="#dashboard" className="btn-primary nav-desktop" style={{ padding: '8px 18px', fontSize: 13 }}>
            Lihat Demo
          </a>

          {/* Theme toggle */}
          <motion.button
            onClick={toggle}
            whileTap={{ scale: 0.9 }}
            className="theme-toggle"
            title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            <AnimatePresence mode="wait">
              {isDark ? (
                <motion.span key="sun" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <Sun size={17} />
                </motion.span>
              ) : (
                <motion.span key="moon" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <Moon size={17} />
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen(!open)}
            className="nav-mobile-btn theme-toggle"
            aria-label="Toggle menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            style={{ overflow: 'hidden', borderTop: '1px solid var(--border)', background: 'var(--nav-bg-scroll)', backdropFilter: 'blur(20px)' }}
          >
            <div style={{ padding: '14px 20px 18px', display: 'flex', flexDirection: 'column', gap: 4 }}>
              {navItems.map(i => (
                <a key={i.label} href={i.href} onClick={() => setOpen(false)} className="nav-link" style={{ fontSize: 15, padding: '10px 13px' }}>{i.label}</a>
              ))}
              <a href="#dashboard" onClick={() => setOpen(false)} className="btn-primary" style={{ marginTop: 10, justifyContent: 'center' }}>
                Lihat Demo Dashboard
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
