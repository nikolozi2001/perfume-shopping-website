const FragranceSets = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      width="64"
      height="64"
      fill="none"
    >
      {/* Tall Perfume Bottle */}
      <rect x="12" y="20" width="14" height="28" rx="2" fill="#FFD6E7" />
      <rect x="15" y="12" width="8" height="8" fill="#FF85C1" />

      {/* Round Perfume Bottle */}
      <circle cx="44" cy="36" r="12" fill="#FFB6C1" />
      <rect x="40" y="18" width="8" height="8" fill="#FF69B4" />

      {/* Decorative Sparkles */}
      <path
        d="M8 8 L10 10 M10 8 L8 10"
        stroke="#FF69B4"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M54 10 L58 14 M58 10 L54 14"
        stroke="#FF85C1"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default FragranceSets;
