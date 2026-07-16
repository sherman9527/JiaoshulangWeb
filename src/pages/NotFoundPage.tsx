import { motion } from 'framer-motion';
import { ArrowLeft24Regular } from '@fluentui/react-icons';
import Logo from '../components/Logo';

export default function NotFoundPage() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#EEF2F7',
        padding: 24,
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ textAlign: 'center' }}
      >
        <Logo size={48} />
        <h1
          style={{
            fontSize: 72,
            fontWeight: 100,
            color: '#8B3A4A',
            marginTop: 32,
            fontFamily: "'Noto Serif SC', serif",
          }}
        >
          404
        </h1>
        <p
          style={{
            fontSize: 18,
            color: '#6B4A50',
            fontWeight: 300,
            marginTop: 12,
          }}
        >
          页面不存在
        </p>
        <p
          style={{
            fontSize: 14,
            color: '#9B8A8E',
            fontWeight: 300,
            marginTop: 8,
          }}
        >
          你访问的页面已被移除或地址有误
        </p>
        <motion.a
          href={import.meta.env.BASE_URL}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            marginTop: 40,
            padding: '12px 28px',
            backgroundColor: '#8B3A4A',
            color: '#FAF7F2',
            borderRadius: 10,
            fontSize: 15,
            fontWeight: 400,
          }}
        >
          <ArrowLeft24Regular style={{ fontSize: 18 }} />
          返回首页
        </motion.a>
      </motion.div>
    </div>
  );
}
