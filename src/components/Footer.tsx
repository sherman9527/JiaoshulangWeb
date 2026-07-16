import Logo from './Logo';

const footerLinks = {
  '产品': [
    { label: '功能介绍', href: '#features' },
    { label: '下载安装', href: '#hero' },
    { label: '更新日志', href: '#' },
    { label: '版本历史', href: '#' },
  ],
  '支持': [
    { label: '使用指南', href: '#guide' },
    { label: '常见问题', href: '#' },
    { label: '联系客服', href: '#' },
    { label: '反馈建议', href: '#' },
  ],
  '关于': [
    { label: '关于我们', href: '#' },
    { label: '隐私政策', href: '#' },
    { label: '使用条款', href: '#' },
    { label: '开源许可', href: '#' },
  ],
};

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: '#2D1B1E',
        color: '#FAF7F2',
        padding: '64px 24px 32px',
      }}
    >
      <div
        style={{
          maxWidth: 1080,
          margin: '0 auto',
        }}
      >
        {/* Top section */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 48,
            marginBottom: 48,
          }}
        >
          {/* Brand */}
          <div style={{ minWidth: 200 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
              <Logo size={28} />
              <span
                style={{
                  fontFamily: "'Noto Serif SC', 'SimSun', serif",
                  fontWeight: 400,
                  fontSize: 18,
                  color: '#FAF7F2',
                  letterSpacing: '0.08em',
                }}
              >
                校书郎
              </span>
            </div>
            <p
              style={{
                fontSize: 13,
                color: '#B86E7A',
                fontWeight: 300,
                lineHeight: 1.6,
              }}
            >
              AI审稿 · 稿件不出本机
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4
                style={{
                  fontSize: 14,
                  fontWeight: 400,
                  color: '#FAF7F2',
                  marginBottom: 16,
                  letterSpacing: '0.06em',
                }}
              >
                {category}
              </h4>
              <ul
                style={{
                  listStyle: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 10,
                }}
              >
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      style={{
                        fontSize: 13,
                        color: '#B86E7A',
                        fontWeight: 300,
                        transition: 'color 0.2s',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = '#FAF7F2')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = '#B86E7A')}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div
          style={{
            height: 1,
            backgroundColor: 'rgba(184, 110, 122, 0.2)',
            marginBottom: 24,
          }}
        />

        {/* Copyright */}
        <p
          style={{
            fontSize: 12,
            color: '#6B4A50',
            textAlign: 'center',
            fontWeight: 300,
          }}
        >
          © 2025 校书郎 Jiaoshulang. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
