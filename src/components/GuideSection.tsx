import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowDown24Regular, DocumentEdit24Regular, CheckmarkCircle24Regular } from '@fluentui/react-icons';

const steps = [
  {
    step: '01',
    icon: <ArrowDown24Regular />,
    title: '下载安装',
    desc: '从官网下载校书郎安装包，一键安装至 Windows 10+ 系统。安装包仅 180MB，轻量无负担。',
  },
  {
    step: '02',
    icon: <DocumentEdit24Regular />,
    title: '导入稿件',
    desc: '支持 Word、PDF、TXT 等主流格式。拖拽文件至窗口即可开始审稿，无需复杂配置。',
  },
  {
    step: '03',
    icon: <CheckmarkCircle24Regular />,
    title: '一键审稿',
    desc: '选择对应专业领域，点击「开始审稿」。AI 引擎自动分析全文，生成详细的审校报告与批注。',
  },
];

export default function GuideSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      id="guide"
      ref={ref}
      className="section-padding"
      style={{
        backgroundColor: '#FAF7F2',
      }}
    >
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ textAlign: 'center', marginBottom: 80 }}
        >
          <h2
            style={{
              fontSize: 'clamp(28px, 5vw, 44px)',
              fontWeight: 200,
              color: '#2D1B1E',
              marginBottom: 16,
            }}
          >
            三步开始审稿
          </h2>
          <p style={{ fontSize: 16, color: '#9B8A8E', fontWeight: 300 }}>
            简洁高效的审稿工作流
          </p>
        </motion.div>

        <div className="guide-steps">
          {steps.map((s, i) => (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
              style={{
                flex: '1 1 260px',
                maxWidth: 300,
                textAlign: 'center',
              }}
            >
              {/* Step number */}
              <div
                style={{
                  fontSize: 56,
                  fontWeight: 100,
                  color: 'rgba(139, 58, 74, 0.1)',
                  fontFamily: "'Noto Serif SC', serif",
                  lineHeight: 1,
                  marginBottom: 24,
                }}
              >
                {s.step}
              </div>

              {/* Icon */}
              <div
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: 18,
                  backgroundColor: 'rgba(139, 58, 74, 0.06)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#8B3A4A',
                  fontSize: 28,
                  margin: '0 auto 28px',
                }}
              >
                {s.icon}
              </div>

              {/* Title */}
              <h3
                style={{
                  fontSize: 22,
                  fontWeight: 300,
                  color: '#2D1B1E',
                  marginBottom: 14,
                }}
              >
                {s.title}
              </h3>

              {/* Description */}
              <p
                style={{
                  fontSize: 14,
                  lineHeight: 1.8,
                  color: '#9B8A8E',
                  fontWeight: 300,
                }}
              >
                {s.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
