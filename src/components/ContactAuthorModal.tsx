import { useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { apiPost } from '../api';

interface Props {
  open: boolean;
  onClose: () => void;
}

/**
 * 联系作者 —— 纯文本反馈弹窗。输入内容 → 提交到后端 /api/v1/feedback（与桌面 app 共用接口）。
 * 仅支持文本，不上传文件/图片；不在前端存储任何内容。
 */
export default function ContactAuthorModal({ open, onClose }: Props) {
  const [text, setText] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);

  const MAX = 5000;

  const reset = () => {
    setText('');
    setError('');
    setDone(false);
    setBusy(false);
  };

  const close = () => {
    onClose();
    // 关闭后清空，避免下次打开残留（也不在内存长期保留内容）
    setTimeout(reset, 200);
  };

  const submit = async () => {
    const t = text.trim();
    if (!t || busy) return;
    setBusy(true);
    setError('');
    try {
      await apiPost('/api/v1/feedback', { text: t, source: 'web' });
      setDone(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : '提交失败，请稍后再试');
    } finally {
      setBusy(false);
    }
  };

  return createPortal(
    <AnimatePresence>
      {open && (
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
          onClick={close}
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
              maxWidth: 440,
              width: '90%',
              textAlign: 'center',
              boxShadow: '0 32px 80px rgba(45, 27, 30, 0.2)',
            }}
          >
            <h3 style={{ fontSize: 20, fontWeight: 400, color: '#2D1B1E', marginBottom: 8 }}>联系作者</h3>

            {!done ? (
              <>
                <p
                  style={{
                    fontSize: 14,
                    color: '#9B8A8E',
                    fontWeight: 300,
                    marginBottom: 20,
                    lineHeight: 1.6,
                  }}
                >
                  有问题、建议或想反馈 bug？直接留言给作者（仅支持文本）。
                </p>
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value.slice(0, MAX))}
                  placeholder="请输入你想说的话…"
                  autoFocus
                  rows={6}
                  style={{
                    width: '100%',
                    boxSizing: 'border-box',
                    padding: '12px 14px',
                    fontSize: 14,
                    lineHeight: 1.6,
                    border: '1.5px solid rgba(139, 58, 74, 0.25)',
                    borderRadius: 10,
                    marginBottom: 6,
                    outline: 'none',
                    resize: 'vertical',
                    fontFamily: 'inherit',
                    color: '#2D1B1E',
                  }}
                />
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 12,
                    minHeight: 18,
                  }}
                >
                  <span style={{ fontSize: 12, color: '#B83A3A', fontWeight: 300 }}>{error}</span>
                  <span style={{ fontSize: 12, color: '#B0A0A4' }}>
                    {text.length} / {MAX}
                  </span>
                </div>
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={submit}
                  disabled={busy || !text.trim()}
                  style={{
                    width: '100%',
                    padding: '13px 0',
                    backgroundColor: busy || !text.trim() ? '#C9AEB4' : '#8B3A4A',
                    color: '#FAF7F2',
                    border: 'none',
                    borderRadius: 10,
                    fontSize: 15,
                    fontWeight: 400,
                    cursor: busy || !text.trim() ? 'default' : 'pointer',
                  }}
                >
                  {busy ? '提交中…' : '提交'}
                </motion.button>
              </>
            ) : (
              <p
                style={{
                  fontSize: 14,
                  color: '#2D8659',
                  fontWeight: 400,
                  margin: '20px 0',
                }}
              >
                ✓ 已收到你的反馈，感谢！
              </p>
            )}

            <button
              onClick={close}
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
    </AnimatePresence>,
    document.body
  );
}
