import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { CheckmarkCircle24Regular } from '@fluentui/react-icons';

const tiers = [
  {
    id: 'standard',
    name: '标准版',
    price: '¥299',
    period: '买断',
    recommended: false,
    features: [
      '出版标准规则检查',
      '专业词库（基础版）',
      'PDF 批注导出',
      '1 年免费更新',
      '3 个设备激活',
    ],
  },
  {
    id: 'pro',
    name: '专业版',
    price: '¥599',
    period: '买断',
    recommended: true,
    features: [
      '所有标准版功能',
      'AI 智能审稿',
      '专业词库（完整版）',
      '79+ 专业领域',
      '3 年免费更新',
      '优先技术支持',
      '10 个设备激活',
    ],
  },
  {
    id: 'team',
    name: '团队版',
    price: '¥1999',
    period: '年/5人',
    recommended: false,
    features: [
      '所有专业版功能',
      '多用户管理',
      '共享词库',
      '批量审校',
      '专属部署支持',
      '无限期更新',
    ],
  },
];

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
};

export default function PricingSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [showPayment, setShowPayment] = useState(false);
  const [selectedTier, setSelectedTier] = useState('');

  const handleBuy = (tierId: string) => {
    setSelectedTier(tierId);
    setShowPayment(true);
  };

  return (
    <section
      id="pricing"
      ref={ref}
      className="section-padding"
      style={{ backgroundColor: '#FAF7F2', position: 'relative' }}
    >
      {/* Section divider */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 60,
          height: 1,
          backgroundColor: '#D9C4B0',
        }}
      />

      <div style={{ maxWidth: 1120, margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ textAlign: 'center', marginBottom: 72 }}
        >
          <h2
            style={{
              fontSize: 'clamp(28px, 5vw, 44px)',
              fontWeight: 200,
              color: '#2D1B1E',
              marginBottom: 16,
              letterSpacing: '-0.01em',
            }}
          >
            选择适合您的方案
          </h2>
          <p
            style={{
              fontSize: 'clamp(15px, 2vw, 18px)',
              color: '#9B8A8E',
              fontWeight: 300,
              maxWidth: 480,
              margin: '0 auto',
              lineHeight: 1.7,
            }}
          >
            买断制定价，一次购买终身使用
          </p>
        </motion.div>

        <div className="pricing-grid">
          {tiers.map((tier) => (
            <motion.div
              key={tier.id}
              variants={itemVariants}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              whileHover={{
                y: -6,
                boxShadow: '0 20px 60px rgba(45, 27, 30, 0.1)',
                transition: { duration: 0.3 },
              }}
              style={{
                backgroundColor: '#FFFFFF',
                border: tier.recommended
                  ? '2px solid #8B3A4A'
                  : '1px solid rgba(217, 196, 176, 0.4)',
                borderRadius: 20,
                padding: '40px 32px',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                transition: 'border-color 0.3s',
              }}
            >
              {/* Recommended badge */}
              {tier.recommended && (
                <div
                  style={{
                    position: 'absolute',
                    top: -14,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    backgroundColor: '#8B3A4A',
                    color: '#FAF7F2',
                    fontSize: 12,
                    fontWeight: 500,
                    padding: '4px 16px',
                    borderRadius: 100,
                    letterSpacing: '0.06em',
                  }}
                >
                  推荐
                </div>
              )}

              {/* Tier name */}
              <h3
                style={{
                  fontSize: 20,
                  fontWeight: 400,
                  color: '#2D1B1E',
                  marginBottom: 16,
                  textAlign: 'center',
                }}
              >
                {tier.name}
              </h3>

              {/* Price */}
              <div style={{ textAlign: 'center', marginBottom: 8 }}>
                <span
                  style={{
                    fontSize: 40,
                    fontWeight: 700,
                    color: '#2D1B1E',
                    fontFamily: "'Noto Serif SC', serif",
                  }}
                >
                  {tier.price}
                </span>
              </div>
              <p
                style={{
                  fontSize: 13,
                  color: '#9B8A8E',
                  textAlign: 'center',
                  marginBottom: 32,
                  fontWeight: 300,
                }}
              >
                {tier.period}
              </p>

              {/* Features */}
              <ul
                style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0,
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 14,
                  marginBottom: 32,
                }}
              >
                {tier.features.map((f) => (
                  <li
                    key={f}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                      fontSize: 14,
                      color: '#6B4A50',
                      fontWeight: 300,
                    }}
                  >
                    <CheckmarkCircle24Regular
                      style={{ fontSize: 18, color: '#2D8659', flexShrink: 0 }}
                    />
                    {f}
                  </li>
                ))}
              </ul>

              {/* CTA button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleBuy(tier.id)}
                style={{
                  width: '100%',
                  padding: '14px 0',
                  backgroundColor: tier.recommended ? '#8B3A4A' : 'transparent',
                  color: tier.recommended ? '#FAF7F2' : '#8B3A4A',
                  border: tier.recommended ? 'none' : '1.5px solid rgba(139, 58, 74, 0.3)',
                  borderRadius: 12,
                  fontSize: 15,
                  fontWeight: 400,
                  letterSpacing: '0.04em',
                  transition: 'all 0.2s',
                  cursor: 'pointer',
                }}
              >
                立即购买
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Payment popup */}
      {showPayment && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(45, 27, 30, 0.4)',
            backdropFilter: 'blur(8px)',
          }}
          onClick={() => setShowPayment(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 20,
              padding: '40px 32px',
              maxWidth: 360,
              width: '90%',
              textAlign: 'center',
              boxShadow: '0 32px 80px rgba(45, 27, 30, 0.2)',
            }}
          >
            <h3
              style={{
                fontSize: 20,
                fontWeight: 400,
                color: '#2D1B1E',
                marginBottom: 8,
              }}
            >
              扫码购买
            </h3>
            <p
              style={{
                fontSize: 14,
                color: '#9B8A8E',
                fontWeight: 300,
                marginBottom: 24,
              }}
            >
              {tiers.find((t) => t.id === selectedTier)?.name} ·{' '}
              {tiers.find((t) => t.id === selectedTier)?.price}
            </p>

            {/* QR code placeholder */}
            <div
              style={{
                width: 180,
                height: 180,
                border: '2px solid #8B3A4A',
                borderRadius: 16,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#FAF7F2',
                margin: '0 auto 24px',
              }}
            >
              <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
                <rect x="0" y="0" width="40" height="40" rx="3" fill="#8B3A4A" opacity="0.15" />
                <rect x="80" y="0" width="40" height="40" rx="3" fill="#8B3A4A" opacity="0.15" />
                <rect x="0" y="80" width="40" height="40" rx="3" fill="#8B3A4A" opacity="0.15" />
                <rect x="8" y="8" width="24" height="24" rx="2" fill="#8B3A4A" opacity="0.3" />
                <rect x="88" y="8" width="24" height="24" rx="2" fill="#8B3A4A" opacity="0.3" />
                <rect x="8" y="88" width="24" height="24" rx="2" fill="#8B3A4A" opacity="0.3" />
                <rect x="48" y="48" width="24" height="24" rx="3" fill="#8B3A4A" opacity="0.2" />
                {[0, 1, 2, 3, 4, 5].map((r) =>
                  [0, 1, 2, 3, 4, 5].map((c) => (
                    <rect
                      key={`${r}-${c}`}
                      x={48 + c * 8}
                      y={8 + r * 8}
                      width="5"
                      height="5"
                      rx="0.5"
                      fill="#8B3A4A"
                      opacity={Math.random() > 0.4 ? 0.15 : 0}
                    />
                  ))
                )}
              </svg>
            </div>

            <p
              style={{
                fontSize: 13,
                color: '#9B8A8E',
                fontWeight: 300,
                marginBottom: 24,
              }}
            >
              支付成功后，请在桌面端「设置 → 激活」中输入密钥
            </p>

            <button
              onClick={() => setShowPayment(false)}
              style={{
                padding: '10px 32px',
                backgroundColor: 'transparent',
                color: '#8B3A4A',
                border: '1px solid rgba(139, 58, 74, 0.2)',
                borderRadius: 8,
                fontSize: 14,
                fontWeight: 400,
                cursor: 'pointer',
              }}
            >
              关闭
            </button>
          </motion.div>
        </div>
      )}

      <style>{`
        .pricing-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          align-items: start;
        }
        @media (max-width: 900px) {
          .pricing-grid { grid-template-columns: 1fr; max-width: 400px; margin: 0 auto; }
        }
      `}</style>
    </section>
  );
}
