import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowDownload24Regular } from '@fluentui/react-icons';
import { apiGet } from '../api';

export default function CtaSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const handleDownload = async () => {
    try {
      const data = await apiGet<{ downloadUrl: string; fileName: string }>(
        '/api/v1/downloads/beta/exe'
      );
      window.location.href = data.downloadUrl;
    } catch {
      window.location.href = '#hero';
    }
  };

  return (
    <section
      ref={ref}
      className="section-padding"
      style={{
        backgroundColor: '#2D1B1E',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative radial glow */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 800,
          height: 800,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(139,58,74,0.1) 0%, transparent 60%)',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          maxWidth: 720,
          margin: '0 auto',
          textAlign: 'center',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{
            fontSize: 'clamp(28px, 5vw, 44px)',
            fontWeight: 200,
            color: '#FAF7F2',
            marginBottom: 16,
            letterSpacing: '-0.01em',
          }}
        >
          现在就开始，提升审稿效率
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          style={{
            fontSize: 'clamp(15px, 2vw, 18px)',
            color: '#B86E7A',
            fontWeight: 300,
            marginBottom: 48,
            lineHeight: 1.7,
          }}
        >
          7 天免费试用，无需绑定信用卡
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{
            display: 'flex',
            gap: 16,
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
        >
          <motion.a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              handleDownload();
            }}
            whileHover={{ scale: 1.04, boxShadow: '0 12px 48px rgba(139, 58, 74, 0.4)' }}
            whileTap={{ scale: 0.97 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              padding: '18px 40px',
              backgroundColor: '#8B3A4A',
              color: '#FAF7F2',
              borderRadius: 14,
              fontSize: 17,
              fontWeight: 400,
              letterSpacing: '0.04em',
              boxShadow: '0 4px 24px rgba(139, 58, 74, 0.3)',
              transition: 'background-color 0.2s',
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = '#6B2A35')
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = '#8B3A4A')
            }
          >
            <ArrowDownload24Regular style={{ fontSize: 20 }} />
            免费下载
          </motion.a>

          <motion.a
            href="#pricing"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              padding: '18px 40px',
              backgroundColor: 'transparent',
              color: '#FAF7F2',
              borderRadius: 14,
              fontSize: 17,
              fontWeight: 400,
              letterSpacing: '0.04em',
              border: '1.5px solid rgba(250, 247, 242, 0.2)',
              transition: 'all 0.2s',
            }}
          >
            查看价格
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
