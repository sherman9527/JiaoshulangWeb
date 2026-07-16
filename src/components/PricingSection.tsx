import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import { CheckmarkCircle24Regular, Copy24Regular } from '@fluentui/react-icons';
import { apiPost } from '../api';

const plan = {
  name: '订阅版',
  price: '¥29',
  unit: '/ 月',
  note: '按月订阅 · 新用户 7 天免费试用',
  features: [
    'AI 智能审稿（本地大模型）',
    '出版标准规则检查',
    '专业词库 · 79+ 专业领域',
    'PDF 批注一键导出',
    '稿件全程不出本机',
    '订阅期内持续更新',
  ],
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
};

interface RedeemResult {
  productKey: string;
  message: string;
}

export default function PricingSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const [showRedeem, setShowRedeem] = useState(false);
  const [code, setCode] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<RedeemResult | null>(null);
  const [copied, setCopied] = useState(false);

  const openRedeem = () => {
    setShowRedeem(true);
    setCode('');
    setError('');
    setResult(null);
    setCopied(false);
  };

  const redeem = async () => {
    if (!code.trim() || busy) return;
    setBusy(true);
    setError('');
    try {
      const data = await apiPost<RedeemResult>('/api/v1/referral/redeem', {
        referralCode: code.trim(),
      });
      setResult(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : '兑换失败，请稍后再试');
    } finally {
      setBusy(false);
    }
  };

  const copyKey = async () => {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(result.productKey);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  };

  return (
    <section
      id="pricing"
      ref={ref}
      className="section-padding"
      style={{ backgroundColor: '#FAF7F2', position: 'relative' }}
    >
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
          style={{ textAlign: 'center', marginBottom: 56 }}
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
            订阅方案
          </h2>
          <p
            style={{
              fontSize: 'clamp(15px, 2vw, 18px)',
              color: '#9B8A8E',
              fontWeight: 300,
              maxWidth: 520,
              margin: '0 auto',
              lineHeight: 1.7,
            }}
          >
            按月订阅，随时取消 · 新用户可免费试用 7 天
          </p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          style={{
            maxWidth: 400,
            margin: '0 auto',
            backgroundColor: '#FFFFFF',
            border: '2px solid #8B3A4A',
            borderRadius: 20,
            padding: '44px 36px',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
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
            全功能
          </div>

          <h3
            style={{
              fontSize: 20,
              fontWeight: 400,
              color: '#2D1B1E',
              marginBottom: 16,
              textAlign: 'center',
            }}
          >
            {plan.name}
          </h3>

          <div style={{ textAlign: 'center', marginBottom: 6 }}>
            <span
              style={{
                fontSize: 44,
                fontWeight: 700,
                color: '#2D1B1E',
                fontFamily: "'Noto Serif SC', serif",
              }}
            >
              {plan.price}
            </span>
            <span style={{ fontSize: 16, color: '#9B8A8E', fontWeight: 300, marginLeft: 4 }}>
              {plan.unit}
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
            {plan.note}
          </p>

          <ul
            style={{
              listStyle: 'none',
              padding: 0,
              margin: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: 14,
              marginBottom: 32,
            }}
          >
            {plan.features.map((f) => (
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
                <CheckmarkCircle24Regular style={{ fontSize: 18, color: '#2D8659', flexShrink: 0 }} />
                {f}
              </li>
            ))}
          </ul>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={openRedeem}
            style={{
              width: '100%',
              padding: '14px 0',
              backgroundColor: '#8B3A4A',
              color: '#FAF7F2',
              border: 'none',
              borderRadius: 12,
              fontSize: 15,
              fontWeight: 400,
              letterSpacing: '0.04em',
              cursor: 'pointer',
            }}
          >
            输入推荐码开通
          </motion.button>
          <p
            style={{
              fontSize: 12,
              color: '#B0A0A4',
              textAlign: 'center',
              marginTop: 12,
              fontWeight: 300,
            }}
          >
            支付功能开通中，当前可用推荐码兑换
          </p>
        </motion.div>
      </div>

      {/* Referral redeem dialog */}
      <AnimatePresence>
        {showRedeem && (
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
            onClick={() => setShowRedeem(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 20,
                padding: '36px 32px',
                maxWidth: 380,
                width: '90%',
                textAlign: 'center',
                boxShadow: '0 32px 80px rgba(45, 27, 30, 0.2)',
              }}
            >
              <h3 style={{ fontSize: 20, fontWeight: 400, color: '#2D1B1E', marginBottom: 8 }}>
                推荐码兑换
              </h3>

              {!result ? (
                <>
                  <p
                    style={{
                      fontSize: 14,
                      color: '#9B8A8E',
                      fontWeight: 300,
                      marginBottom: 24,
                      lineHeight: 1.6,
                    }}
                  >
                    输入推荐码，兑换你的产品密钥
                  </p>
                  <input
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && redeem()}
                    placeholder="请输入推荐码"
                    autoFocus
                    style={{
                      width: '100%',
                      boxSizing: 'border-box',
                      padding: '12px 16px',
                      fontSize: 15,
                      border: '1.5px solid rgba(139, 58, 74, 0.25)',
                      borderRadius: 10,
                      marginBottom: 12,
                      outline: 'none',
                      textAlign: 'center',
                      letterSpacing: '0.1em',
                    }}
                  />
                  {error && (
                    <p style={{ fontSize: 13, color: '#B83A3A', marginBottom: 12, fontWeight: 300 }}>
                      {error}
                    </p>
                  )}
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    onClick={redeem}
                    disabled={busy || !code.trim()}
                    style={{
                      width: '100%',
                      padding: '13px 0',
                      backgroundColor: busy || !code.trim() ? '#C9AEB4' : '#8B3A4A',
                      color: '#FAF7F2',
                      border: 'none',
                      borderRadius: 10,
                      fontSize: 15,
                      fontWeight: 400,
                      cursor: busy || !code.trim() ? 'default' : 'pointer',
                    }}
                  >
                    {busy ? '兑换中…' : '兑换'}
                  </motion.button>
                </>
              ) : (
                <>
                  <p
                    style={{
                      fontSize: 14,
                      color: '#2D8659',
                      fontWeight: 400,
                      marginBottom: 20,
                    }}
                  >
                    ✓ 兑换成功
                  </p>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      backgroundColor: '#FAF7F2',
                      border: '1px solid #D9C4B0',
                      borderRadius: 10,
                      padding: '12px 14px',
                      marginBottom: 16,
                    }}
                  >
                    <code
                      style={{
                        flex: 1,
                        fontSize: 13,
                        color: '#2D1B1E',
                        wordBreak: 'break-all',
                        fontFamily: 'monospace',
                      }}
                    >
                      {result.productKey}
                    </code>
                    <button
                      onClick={copyKey}
                      title="复制"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        color: copied ? '#2D8659' : '#8B3A4A',
                        flexShrink: 0,
                      }}
                    >
                      <Copy24Regular style={{ fontSize: 18 }} />
                    </button>
                  </div>
                  <p
                    style={{
                      fontSize: 13,
                      color: '#9B8A8E',
                      fontWeight: 300,
                      marginBottom: 24,
                      lineHeight: 1.6,
                    }}
                  >
                    {copied ? '已复制！' : result.message}
                  </p>
                </>
              )}

              <button
                onClick={() => setShowRedeem(false)}
                style={{
                  marginTop: 16,
                  padding: '9px 28px',
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
      </AnimatePresence>
    </section>
  );
}
