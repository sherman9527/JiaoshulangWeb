import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDownload24Regular, Shield24Regular } from '@fluentui/react-icons';
import { useRef, useState } from 'react';
import { requestDownload } from '../download';
import Logo from './Logo';

export default function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [notice, setNotice] = useState('');

  const handleDownload = async () => {
    const r = await requestDownload('beta');
    if (!r.ok) {
      setNotice(r.message ?? '下载暂时不可用，请稍后再试');
      setTimeout(() => setNotice(''), 5000);
    }
  };
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.4], [1, 0.95]);

  return (
    <section
      ref={ref}
      id="hero"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        background: 'linear-gradient(180deg, #E2E8F0 0%, #EEF2F7 30%, #FAF7F2 100%)',
      }}
    >
      {/* Decorative floating elements */}
      <motion.div
        animate={{ y: [0, -15, 0], rotate: [0, 3, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          top: '15%',
          left: '8%',
          width: 60,
          height: 60,
          borderRadius: 16,
          backgroundColor: 'rgba(139, 58, 74, 0.04)',
          border: '1px solid rgba(139, 58, 74, 0.06)',
        }}
      />
      <motion.div
        animate={{ y: [0, 12, 0], rotate: [0, -2, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        style={{
          position: 'absolute',
          top: '20%',
          right: '12%',
          width: 40,
          height: 40,
          borderRadius: 12,
          backgroundColor: 'rgba(196, 145, 94, 0.06)',
          border: '1px solid rgba(196, 145, 94, 0.08)',
        }}
      />
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        style={{
          position: 'absolute',
          bottom: '25%',
          left: '15%',
          width: 32,
          height: 32,
          borderRadius: 8,
          backgroundColor: 'rgba(139, 58, 74, 0.03)',
          border: '1px solid rgba(139, 58, 74, 0.05)',
        }}
      />

      {/* Radial glow */}
      <div
        style={{
          position: 'absolute',
          top: '35%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 900,
          height: 900,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(139,58,74,0.05) 0%, transparent 60%)',
          pointerEvents: 'none',
        }}
      />

      <motion.div style={{ y, opacity, scale, position: 'relative', zIndex: 1, textAlign: 'center', padding: '0 24px', maxWidth: 1000 }}>
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '8px 20px',
            borderRadius: 100,
            backgroundColor: 'rgba(139, 58, 74, 0.06)',
            border: '1px solid rgba(139, 58, 74, 0.1)',
            marginBottom: 40,
          }}
        >
          <Shield24Regular style={{ fontSize: 14, color: '#8B3A4A' }} />
          <span style={{ fontSize: 13, fontWeight: 400, color: '#8B3A4A', letterSpacing: '0.06em' }}>
            稿件100%不出本机 · 本地AI审稿引擎
          </span>
        </motion.div>

        {/* Main headline — ultra large */}
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{
            fontSize: 'clamp(44px, 8vw, 96px)',
            fontWeight: 100,
            lineHeight: 1.1,
            color: '#2D1B1E',
            marginBottom: 32,
            letterSpacing: '-0.03em',
          }}
        >
          让每一个字
          <br />
          <span style={{
            fontWeight: 200,
            background: 'linear-gradient(135deg, #8B3A4A 0%, #B86E7A 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            都值得被出版
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          style={{
            fontSize: 'clamp(16px, 2.2vw, 20px)',
            fontWeight: 300,
            color: '#6B4A50',
            lineHeight: 1.9,
            marginBottom: 48,
            maxWidth: 560,
            margin: '0 auto 48px',
          }}
        >
          为出版行业量身打造的本地AI审稿工具
          <br />
          79+学科领域 · 稿件绝不离开你的电脑
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="hero-cta"
        >
          <motion.a
            href="#download"
            onClick={(e) => { e.preventDefault(); handleDownload(); }}
            whileHover={{ scale: 1.04, boxShadow: '0 12px 48px rgba(139, 58, 74, 0.35)' }}
            whileTap={{ scale: 0.97 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              padding: '20px 48px',
              backgroundColor: '#8B3A4A',
              color: '#FAF7F2',
              borderRadius: 16,
              fontSize: 19,
              fontWeight: 400,
              letterSpacing: '0.04em',
              boxShadow: '0 4px 24px rgba(139, 58, 74, 0.2)',
              transition: 'background-color 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#6B2A35')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#8B3A4A')}
          >
            <ArrowDownload24Regular style={{ fontSize: 22 }} />
            免费下载
          </motion.a>

          <motion.a
            href="#features"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              padding: '20px 48px',
              backgroundColor: 'transparent',
              color: '#8B3A4A',
              borderRadius: 16,
              fontSize: 19,
              fontWeight: 400,
              letterSpacing: '0.04em',
              border: '1.5px solid rgba(139, 58, 74, 0.2)',
              transition: 'all 0.2s',
            }}
          >
            了解更多
          </motion.a>
        </motion.div>

        {notice && (
          <motion.p
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              marginTop: 16,
              fontSize: 14,
              fontWeight: 300,
              color: '#8B3A4A',
              backgroundColor: 'rgba(139, 58, 74, 0.08)',
              border: '1px solid rgba(139, 58, 74, 0.15)',
              borderRadius: 10,
              padding: '8px 16px',
              display: 'inline-block',
            }}
          >
            {notice}
          </motion.p>
        )}

        {/* App mockup preview */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{
            marginTop: 72,
            position: 'relative',
            maxWidth: 780,
          }}
          className="hero-mockup"
        >
          {/* Browser chrome */}
          <div
            style={{
              backgroundColor: '#fff',
              borderRadius: 16,
              boxShadow: '0 32px 80px rgba(45, 27, 30, 0.12), 0 8px 24px rgba(45, 27, 30, 0.06)',
              overflow: 'hidden',
              border: '1px solid rgba(217, 196, 176, 0.3)',
            }}
          >
            {/* Title bar */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '12px 16px',
              borderBottom: '1px solid rgba(217, 196, 176, 0.2)',
              backgroundColor: '#FAF7F2',
            }}>
              <div style={{ display: 'flex', gap: 6 }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#E8D5D0' }} />
                <div style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#E8D5D0' }} />
                <div style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#E8D5D0' }} />
              </div>
              <div style={{
                flex: 1,
                textAlign: 'center',
                fontSize: 12,
                color: '#9B8A8E',
                fontWeight: 300,
              }}>
                校书郎 · AI审稿
              </div>
            </div>

            {/* App content mockup */}
            <div style={{
              padding: '40px 32px',
              display: 'flex',
              gap: 24,
              minHeight: 280,
              backgroundColor: '#fff',
            }}>
              {/* Sidebar */}
              <div style={{
                width: 180,
                flexShrink: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: 8,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px', backgroundColor: 'rgba(139, 58, 74, 0.06)', borderRadius: 8 }}>
                  <Logo size={20} />
                  <span style={{ fontSize: 13, color: '#8B3A4A', fontWeight: 400 }}>校书郎</span>
                </div>
                {['稿件管理', '审稿报告', '词库设置', '工作流'].map((item, i) => (
                  <div key={item} style={{
                    padding: '8px 12px',
                    fontSize: 13,
                    color: i === 0 ? '#8B3A4A' : '#9B8A8E',
                    backgroundColor: i === 0 ? 'rgba(139, 58, 74, 0.04)' : 'transparent',
                    borderRadius: 8,
                    fontWeight: i === 0 ? 400 : 300,
                  }}>
                    {item}
                  </div>
                ))}
              </div>

              {/* Main content */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 16 }}>
                {/* Toolbar */}
                <div style={{ display: 'flex', gap: 8 }}>
                  {['开始审稿', '导出报告', '设置'].map((btn, i) => (
                    <div key={btn} style={{
                      padding: '6px 16px',
                      fontSize: 12,
                      color: i === 0 ? '#FAF7F2' : '#6B4A50',
                      backgroundColor: i === 0 ? '#8B3A4A' : '#F5F0E8',
                      borderRadius: 6,
                      fontWeight: 400,
                    }}>
                      {btn}
                    </div>
                  ))}
                </div>

                {/* Document area */}
                <div style={{
                  flex: 1,
                  backgroundColor: '#FAF7F2',
                  borderRadius: 8,
                  padding: 20,
                  border: '1px solid rgba(217, 196, 176, 0.3)',
                }}>
                  <div style={{ fontSize: 11, color: '#9B8A8E', marginBottom: 12, fontWeight: 300 }}>审稿结果 · 3个问题</div>
                  {[
                    { type: 'error', text: '第12行：「的地得」误用', color: '#DC3545' },
                    { type: 'warn', text: '第28行：标点符号使用不规范', color: '#C4915E' },
                    { type: 'info', text: '第45行：建议使用更简洁的表达', color: '#8B3A4A' },
                  ].map((item, i) => (
                    <div key={i} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      padding: '8px 12px',
                      marginBottom: 6,
                      backgroundColor: `${item.color}08`,
                      borderRadius: 6,
                      borderLeft: `3px solid ${item.color}`,
                    }}>
                      <div style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: item.color }} />
                      <span style={{ fontSize: 12, color: '#2D1B1E', fontWeight: 300 }}>{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Glow behind mockup */}
          <div style={{
            position: 'absolute',
            bottom: -20,
            left: '10%',
            right: '10%',
            height: 60,
            background: 'radial-gradient(ellipse, rgba(139,58,74,0.08) 0%, transparent 70%)',
            filter: 'blur(20px)',
            zIndex: -1,
          }} />
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: 64,
            marginTop: 64,
            flexWrap: 'wrap',
          }}
          className="hero-stats"
        >
          {[
            { number: '79+', label: '专业领域' },
            { number: '100%', label: '离线运行' },
            { number: '0', label: '稿件外泄' },
          ].map((stat) => (
            <div key={stat.label} style={{ textAlign: 'center' }}>
              <div style={{
                fontSize: 'clamp(32px, 5vw, 48px)',
                fontWeight: 100,
                color: '#8B3A4A',
                lineHeight: 1.2,
                fontFamily: "'Noto Serif SC', serif",
              }}>
                {stat.number}
              </div>
              <div style={{
                fontSize: 13,
                color: '#9B8A8E',
                fontWeight: 300,
                marginTop: 6,
                letterSpacing: '0.1em',
              }}>
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        style={{
          position: 'absolute',
          bottom: 36,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 8,
        }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            width: 20,
            height: 32,
            borderRadius: 10,
            border: '1.5px solid rgba(139, 58, 74, 0.2)',
            display: 'flex',
            justifyContent: 'center',
            paddingTop: 6,
          }}
        >
          <motion.div
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            style={{ width: 3, height: 8, borderRadius: 2, backgroundColor: '#8B3A4A' }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
