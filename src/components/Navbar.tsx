import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QrCode24Regular, Navigation24Regular } from '@fluentui/react-icons';
import Logo from './Logo';
import ContactAuthorModal from './ContactAuthorModal';

const navLinks = [
  { label: '功能', href: '#features' },
  { label: '价格', href: '#pricing' },
  { label: '使用指南', href: '#guide' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);

  const navLinkStyle = {
    fontSize: 14,
    fontWeight: 300,
    color: '#6B4A50',
    transition: 'color 0.2s',
    letterSpacing: '0.04em',
  } as const;

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        backgroundColor: 'rgba(238, 242, 247, 0.85)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(217, 196, 176, 0.3)',
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '0 24px',
          height: 64,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Left: Logo + Brand */}
        <a href="/" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Logo size={32} />
          <span
            style={{
              fontFamily: "'Noto Serif SC', 'SimSun', serif",
              fontWeight: 400,
              fontSize: 20,
              color: '#8B3A4A',
              letterSpacing: '0.08em',
            }}
          >
            校书郎
          </span>
        </a>

        {/* Center: Nav Links (desktop) */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 36,
          }}
          className="nav-desktop"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              style={navLinkStyle}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#8B3A4A')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#6B4A50')}
            >
              {link.label}
            </a>
          ))}
          <button
            onClick={() => setContactOpen(true)}
            style={{ ...navLinkStyle, background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#8B3A4A')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#6B4A50')}
          >
            联系作者
          </button>
        </div>

        {/* Right: Download button (desktop) */}
        <a
          href="#pricing"
          className="nav-desktop"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            padding: '8px 20px',
            backgroundColor: '#8B3A4A',
            color: '#FAF7F2',
            borderRadius: 8,
            fontSize: 14,
            fontWeight: 400,
            letterSpacing: '0.04em',
            transition: 'background-color 0.2s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#6B2A35')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#8B3A4A')}
        >
          <QrCode24Regular />
          立即订阅
        </a>

        {/* Mobile hamburger */}
        <button
          className="nav-mobile-btn"
          onClick={() => setMobileOpen(!mobileOpen)}
          style={{
            display: 'none',
            background: 'none',
            padding: 8,
            color: '#8B3A4A',
            fontSize: 24,
          }}
        >
          <Navigation24Regular />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="nav-mobile-menu"
            style={{
              backgroundColor: 'rgba(238, 242, 247, 0.95)',
              backdropFilter: 'blur(12px)',
              overflow: 'hidden',
            }}
          >
            <div style={{ padding: '12px 24px', display: 'flex', flexDirection: 'column', gap: 16 }}>
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  style={{ fontSize: 16, color: '#6B4A50', padding: '4px 0' }}
                >
                  {link.label}
                </a>
              ))}
              <button
                onClick={() => {
                  setMobileOpen(false);
                  setContactOpen(true);
                }}
                style={{
                  fontSize: 16,
                  color: '#6B4A50',
                  padding: '4px 0',
                  background: 'none',
                  border: 'none',
                  textAlign: 'left',
                  cursor: 'pointer',
                }}
              >
                联系作者
              </button>
              <a
                href="#pricing"
                onClick={() => setMobileOpen(false)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 6,
                  padding: '10px 20px',
                  backgroundColor: '#8B3A4A',
                  color: '#FAF7F2',
                  borderRadius: 8,
                  fontSize: 14,
                  marginTop: 4,
                }}
              >
                <QrCode24Regular />
                立即订阅
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-mobile-btn { display: block !important; }
        }
        @media (min-width: 769px) {
          .nav-mobile-menu { display: none !important; }
        }
      `}</style>

      <ContactAuthorModal open={contactOpen} onClose={() => setContactOpen(false)} />
    </nav>
  );
}
