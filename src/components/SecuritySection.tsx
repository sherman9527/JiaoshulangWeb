import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import {
  ShieldCheckmark24Regular,
  LockClosed24Regular,
  CloudOff24Regular,
  EyeOff24Regular,
} from '@fluentui/react-icons';

const promises = [
  {
    icon: <CloudOff24Regular />,
    title: '完全离线运行',
    desc: '所有审稿工作在本地完成，稿件数据绝不上传至任何服务器。无需联网，无需云端AI。',
  },
  {
    icon: <LockClosed24Regular />,
    title: '本地模型推理',
    desc: '内置大语言模型，推理过程在你的电脑上完成。不调用任何第三方API，不产生云端费用。',
  },
  {
    icon: <EyeOff24Regular />,
    title: '零数据采集',
    desc: '不收集用户行为数据，不上传稿件内容，不追踪阅读习惯。你的文稿只属于你。',
  },
  {
    icon: <ShieldCheckmark24Regular />,
    title: '出版级安全标准',
    desc: '符合出版行业数据安全要求，适用于出版社、杂志社、高校等对数据安全有严格要求的机构。',
  },
];

export default function SecuritySection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

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
      {/* Subtle texture */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at 30% 50%, rgba(139,58,74,0.08) 0%, transparent 50%)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ maxWidth: 1000, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ textAlign: 'center', marginBottom: 72 }}
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '6px 16px',
              borderRadius: 100,
              backgroundColor: 'rgba(139, 58, 74, 0.15)',
              border: '1px solid rgba(139, 58, 74, 0.2)',
              marginBottom: 24,
            }}
          >
            <ShieldCheckmark24Regular style={{ fontSize: 14, color: '#B86E7A' }} />
            <span style={{ fontSize: 12, fontWeight: 400, color: '#B86E7A', letterSpacing: '0.08em' }}>
              安全承诺
            </span>
          </div>
          <h2
            style={{
              fontSize: 'clamp(28px, 5vw, 44px)',
              fontWeight: 200,
              color: '#FAF7F2',
              marginBottom: 16,
            }}
          >
            你的稿件，只属于你
          </h2>
          <p style={{ fontSize: 16, color: '#9B8A8E', fontWeight: 300, maxWidth: 480, margin: '0 auto' }}>
            我们相信，专业审稿的前提是绝对的数据安全
          </p>
        </motion.div>

        <div className="security-grid">
          {promises.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
              whileHover={{ backgroundColor: 'rgba(139, 58, 74, 0.08)' }}
              style={{
                padding: '32px 28px',
                borderRadius: 16,
                border: '1px solid rgba(139, 58, 74, 0.12)',
                transition: 'all 0.3s',
                cursor: 'default',
              }}
            >
              <div style={{
                width: 44,
                height: 44,
                borderRadius: 12,
                backgroundColor: 'rgba(139, 58, 74, 0.12)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#B86E7A',
                fontSize: 22,
                marginBottom: 20,
              }}>
                {p.icon}
              </div>
              <h3 style={{
                fontSize: 18,
                fontWeight: 400,
                color: '#FAF7F2',
                marginBottom: 10,
              }}>
                {p.title}
              </h3>
              <p style={{
                fontSize: 14,
                lineHeight: 1.8,
                color: '#9B8A8E',
                fontWeight: 300,
              }}>
                {p.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
