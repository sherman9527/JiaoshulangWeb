import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { CheckmarkCircle24Regular, DismissCircle24Regular } from '@fluentui/react-icons';

const comparisons = [
  { feature: '稿件数据安全', jsl: true, online: false, note: '完全离线 vs 上传云端' },
  { feature: '无需联网', jsl: true, online: false, note: '本地模型 vs 云端API' },
  { feature: '无云端费用', jsl: true, online: false, note: '买断制 vs 按量付费' },
  { feature: '79+专业领域', jsl: true, online: true, note: '' },
  { feature: 'PDF批注导出', jsl: true, online: true, note: '' },
  { feature: '出版规范检查', jsl: true, online: false, note: '内置国标 vs 通用规则' },
  { feature: '买断制定价', jsl: true, online: false, note: '¥299起 vs 月付' },
  { feature: '无限离线使用', jsl: true, online: false, note: '无次数限制' },
];

function Check({ color }: { color: string }) {
  return <CheckmarkCircle24Regular style={{ fontSize: 20, color }} />;
}
function Cross() {
  return <DismissCircle24Regular style={{ fontSize: 20, color: '#D9C4B0' }} />;
}

export default function CompareSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      ref={ref}
      className="section-padding"
      style={{ backgroundColor: '#EEF2F7' }}
    >
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ textAlign: 'center', marginBottom: 64 }}
        >
          <h2 style={{ fontSize: 'clamp(28px, 5vw, 44px)', fontWeight: 200, color: '#2D1B1E', marginBottom: 16 }}>
            为什么选择校书郎
          </h2>
          <p style={{ fontSize: 16, color: '#9B8A8E', fontWeight: 300 }}>
            专为出版行业打造，而非通用AI工具
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            backgroundColor: '#fff',
            borderRadius: 20,
            overflow: 'hidden',
            boxShadow: '0 4px 24px rgba(45, 27, 30, 0.04)',
            border: '1px solid rgba(217, 196, 176, 0.3)',
          }}
        >
          <div className="compare-table-wrap">
            <div className="compare-table">
              {/* Header */}
              <div className="compare-header">
                <div style={{ fontSize: 13, color: '#9B8A8E', fontWeight: 300 }}>功能对比</div>
                <div style={{ fontSize: 14, color: '#8B3A4A', fontWeight: 400, textAlign: 'center' }}>校书郎</div>
                <div style={{ fontSize: 14, color: '#9B8A8E', fontWeight: 300, textAlign: 'center' }}>在线AI</div>
              </div>

              {/* Rows */}
              {comparisons.map((c, i) => (
                <div
                  key={c.feature}
                  className="compare-row"
                  style={{
                    borderBottom: i < comparisons.length - 1 ? '1px solid rgba(217, 196, 176, 0.15)' : 'none',
                  }}
                >
                  <div>
                    <span style={{ fontSize: 14, color: '#2D1B1E', fontWeight: 300 }}>{c.feature}</span>
                    {c.note && <span className="compare-note">{c.note}</span>}
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    {c.jsl ? <Check color="#8B3A4A" /> : <Cross />}
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    {c.online ? <Check color="#9B8A8E" /> : <Cross />}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
