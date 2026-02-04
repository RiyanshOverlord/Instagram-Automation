export const LogoSmall = () => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="group"
  >
    <defs>
      <linearGradient id="logoGradient" x1="0" y1="0" x2="40" y2="40">
        <stop stopColor="#1E3A8A" />
        <stop offset="0.5" stopColor="#2563EB" />
        <stop offset="1" stopColor="#38BDF8" />
      </linearGradient>
    </defs>

    {/* Outer container */}
    <rect
      x="2"
      y="2"
      width="36"
      height="36"
      rx="10"
      stroke="url(#logoGradient)"
      strokeWidth="2"
    />

    {/* Letter A */}
    <path
      d="M20 10L27 28H24.5L22.8 23H17.2L15.5 28H13L20 10Z"
      fill="url(#logoGradient)"
    />

    {/* Lightning bolt */}
    <path
      d="M21 16L18 21H21L19 26L25 20H22L24 16H21Z"
      fill="#ffffff"
      className="
        transition-all duration-300
        group-hover:scale-110
        group-hover:drop-shadow-[0_0_6px_rgba(56,189,248,0.9)]
        origin-center
      "
    />
  </svg>
)