/**
 * Logo — 校书郎 brand mark: vermilion 朱砂 SEAL (印章) with cream double-line
 * frame and centered cream OPEN BOOK. Mirrors the desktop app's in-app SVG logo.
 */
interface LogoProps {
  size?: number;
}

export default function Logo({ size = 36 }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      role="img"
      aria-label="校书郎"
      shapeRendering="geometricPrecision"
    >
      {/* seal body */}
      <rect x="3" y="3" width="58" height="58" rx="11" fill="#ad352a" />
      {/* cream double-line frame */}
      <rect
        x="8.5"
        y="8.5"
        width="47"
        height="47"
        rx="8"
        fill="none"
        stroke="#f5eedf"
        strokeWidth="1.8"
      />
      {/* open book — two cream pages split by a thin vermilion fold */}
      <path d="M13.4 33.9 L30.7 26.2 L30.7 42.6 L13.4 40.3 Z" fill="#f5eedf" />
      <path d="M50.6 33.9 L33.3 26.2 L33.3 42.6 L50.6 40.3 Z" fill="#f5eedf" />
    </svg>
  );
}
