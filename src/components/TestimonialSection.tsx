import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Star24Filled } from '@fluentui/react-icons';
import { apiGet } from '../api';

interface Testimonial {
  name: string;
  role: string;
  content: string;
  rating: number;
}

const fallback: Testimonial[] = [
  {
    name: '张编辑',
    role: '某出版社资深编辑',
    content: '审稿效率提升 3 倍以上，尤其是专业术语的检查非常准确，大大减轻了我的工作负担。',
    rating: 5,
  },
  {
    name: '李校对',
    role: '自由校对人',
    content: '本地运行让我放心处理机密稿件，不用担心内容泄露。AI 审稿功能帮我发现了很多人工难以察觉的问题。',
    rating: 5,
  },
  {
    name: '王主编',
    role: '某学术期刊编辑部',
    content: '专业领域词库非常实用，79+ 个领域的覆盖让我们的学术论文审校工作事半功倍。',
    rating: 5,
  },
];

function getInitial(name: string) {
  return name.charAt(0);
}

function Stars({ count }: { count: number }) {
  return (
    <div style={{ display: 'flex', gap: 2 }}>
      {Array.from({ length: count }).map((_, i) => (
        <Star24Filled
          key={i}
          style={{ fontSize: 14, color: '#C4915E' }}
        />
      ))}
    </div>
  );
}

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
};

export default function TestimonialSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [testimonials, setTestimonials] = useState<Testimonial[]>(fallback);

  useEffect(() => {
    apiGet<Testimonial[]>('/api/v1/testimonials')
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) setTestimonials(data);
      })
      .catch(() => {});
  }, []);

  return (
    <section
      ref={ref}
      className="section-padding"
      style={{ backgroundColor: '#EEF2F7', position: 'relative' }}
    >
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
            用户怎么说
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
            来自出版行业一线的真实反馈
          </p>
        </motion.div>

        <div className="testimonial-grid">
          {testimonials.map((t, i) => (
            <motion.div
              key={`${t.name}-${i}`}
              variants={itemVariants}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              whileHover={{
                y: -4,
                boxShadow: '0 16px 48px rgba(45, 27, 30, 0.08)',
                transition: { duration: 0.3 },
              }}
              style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid rgba(217, 196, 176, 0.3)',
                borderRadius: 20,
                padding: '36px 32px',
                display: 'flex',
                flexDirection: 'column',
                transition: 'border-color 0.3s',
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.borderColor = 'rgba(139, 58, 74, 0.15)')
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.borderColor = 'rgba(217, 196, 176, 0.3)')
              }
            >
              {/* Stars */}
              <Stars count={t.rating} />

              {/* Quote */}
              <p
                style={{
                  fontSize: 15,
                  lineHeight: 1.8,
                  color: '#6B4A50',
                  fontWeight: 300,
                  margin: '20px 0 28px',
                  flex: 1,
                }}
              >
                「{t.content}」
              </p>

              {/* Author */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                {/* Avatar placeholder */}
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: '50%',
                    backgroundColor: 'rgba(139, 58, 74, 0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 18,
                    fontWeight: 400,
                    color: '#8B3A4A',
                    fontFamily: "'Noto Serif SC', serif",
                  }}
                >
                  {getInitial(t.name)}
                </div>
                <div>
                  <div
                    style={{
                      fontSize: 14,
                      fontWeight: 400,
                      color: '#2D1B1E',
                    }}
                  >
                    {t.name}
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      color: '#9B8A8E',
                      fontWeight: 300,
                      marginTop: 2,
                    }}
                  >
                    {t.role}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        .testimonial-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }
        @media (max-width: 900px) {
          .testimonial-grid { grid-template-columns: 1fr; max-width: 480px; margin: 0 auto; }
        }
      `}</style>
    </section>
  );
}
