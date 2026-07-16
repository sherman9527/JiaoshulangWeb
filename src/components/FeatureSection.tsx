import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import {
  BrainCircuit24Regular,
  DocumentCheckmark24Regular,
  BookDatabase24Regular,
  DrawText24Regular,
  CloudOff24Regular,
  FolderOpen24Regular,
} from '@fluentui/react-icons';

const features = [
  {
    icon: <BrainCircuit24Regular />,
    title: 'AI 智能审稿',
    desc: '基于大语言模型的智能审校引擎，理解上下文语义，精准识别语法错误、逻辑漏洞与表达问题。',
    color: '#8B3A4A',
  },
  {
    icon: <DocumentCheckmark24Regular />,
    title: '出版标准检查',
    desc: '内置国家标准与出版行业规范，自动检查标点符号、数字用法、计量单位等出版规范问题。',
    color: '#6B2A35',
  },
  {
    icon: <BookDatabase24Regular />,
    title: '专业词库',
    desc: '涵盖医学、法律、金融、科技等领域的专业术语词库，确保专业用语的准确性与一致性。',
    color: '#B86E7A',
  },
  {
    icon: <DrawText24Regular />,
    title: 'PDF 批注',
    desc: '支持导入PDF格式稿件，审阅结果以批注形式直接标注在原文上，方便对照修改。',
    color: '#C4915E',
  },
  {
    icon: <CloudOff24Regular />,
    title: '完全离线',
    desc: '所有审稿工作在本地完成，稿件数据绝不上传至任何服务器，100%保障内容安全。',
    color: '#8B3A4A',
  },
  {
    icon: <FolderOpen24Regular />,
    title: '79+ 专业领域',
    desc: '覆盖人文社科、理工农医等79个专业领域，针对不同学科提供定制化的审稿规则。',
    color: '#6B2A35',
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
};

export default function FeatureSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      id="features"
      ref={ref}
      className="section-padding"
      style={{
        backgroundColor: '#FAF7F2',
        position: 'relative',
      }}
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
          style={{ textAlign: 'center', marginBottom: 80 }}
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
            为专业编辑而生
          </h2>
          <p
            style={{
              fontSize: 'clamp(15px, 2vw, 18px)',
              color: '#9B8A8E',
              fontWeight: 300,
              maxWidth: 500,
              margin: '0 auto',
              lineHeight: 1.7,
            }}
          >
            从语法校对到出版规范，一站式AI审稿解决方案
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="feature-grid"
        >
          {features.map((f) => (
            <motion.div
              key={f.title}
              variants={itemVariants}
              whileHover={{
                y: -6,
                boxShadow: '0 20px 60px rgba(45, 27, 30, 0.08)',
                transition: { duration: 0.3 },
              }}
              style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid rgba(217, 196, 176, 0.4)',
                borderRadius: 20,
                padding: '40px 32px',
                cursor: 'default',
                transition: 'border-color 0.3s',
                position: 'relative',
                overflow: 'hidden',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'rgba(139, 58, 74, 0.2)')}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(217, 196, 176, 0.4)')}
            >
              {/* Icon */}
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: 14,
                  backgroundColor: `${f.color}08`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: f.color,
                  fontSize: 24,
                  marginBottom: 24,
                }}
              >
                {f.icon}
              </div>

              {/* Title */}
              <h3
                style={{
                  fontSize: 20,
                  fontWeight: 400,
                  color: '#2D1B1E',
                  marginBottom: 12,
                  letterSpacing: '0.02em',
                }}
              >
                {f.title}
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
                {f.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
