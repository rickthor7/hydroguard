import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Droplets, Menu, X, Sun, Moon, Shield, Users } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useRole } from '../context/RoleContext';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { isDark, toggle } = useTheme();
  const { activeRole, setActiveRole } = useRole();

  const navItems = activeRole === 'pemerintah'
    ? [
        { label: 'Beranda', href: '#beranda' },
        { label: 'Pusat Pemantauan BPBD', href: '#dashboard' },
        { label: 'Fitur', href: '#fitur' },
        { label: 'Dampak', href: '#dampak' },
      ]
    : [
        { label: 'Beranda', href: '#beranda' },
        { label: 'Portal Siaga Warga', href: '#portal-warga' },
        { label: 'Cara Kerja', href: '#cara-kerja' },
        { label: 'Dampak', href: '#dampak' },
      ];

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
      <div style={{ maxWidth: 1240, margin: '0 auto', padding: '0 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>

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

        {/* Prominent Instant Role Switcher (Tanpa Login) */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            borderRadius: 999,
            padding: 3,
            gap: 2,
            boxShadow: 'var(--card-shadow)',
          }}
        >
          <button
            type="button"
            onClick={() => setActiveRole('pemerintah')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 5,
              padding: '5px 12px',
              borderRadius: 999,
              fontSize: 11.5,
              fontWeight: activeRole === 'pemerintah' ? 800 : 500,
              background: activeRole === 'pemerintah' ? 'var(--accent)' : 'transparent',
              color: activeRole === 'pemerintah' ? '#ffffff' : 'var(--text-secondary)',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            <span>🏛️</span>
            <span>Pemerintah / BPBD</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveRole('warga')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 5,
              padding: '5px 12px',
              borderRadius: 999,
              fontSize: 11.5,
              fontWeight: activeRole === 'warga' ? 800 : 500,
              background: activeRole === 'warga' ? '#10b981' : 'transparent',
              color: activeRole === 'warga' ? '#ffffff' : 'var(--text-secondary)',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            <span>👥</span>
            <span>Masyarakat / Warga</span>
          </button>
        </div>

        {/* Desktop nav links */}
        <div className="nav-desktop" style={{ alignItems: 'center', gap: 2 }}>
          {navItems.map(i => <a key={i.label} href={i.href} className="nav-link">{i.label}</a>)}
        </div>

        {/* Right side: quick jump + theme toggle + hamburger */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
          <a
            href={activeRole === 'pemerintah' ? '#dashboard' : '#portal-warga'}
            className="btn-primary nav-desktop"
            style={{ padding: '8px 16px', fontSize: 12.5 }}
          >
            {activeRole === 'pemerintah' ? 'Pusat Kendali' : 'Buka Portal Warga'}
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
