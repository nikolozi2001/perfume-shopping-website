export default function FragranceLogoGeo() {
  return (
    <svg
      width="77"
      height="48"
      viewBox="0 0 77 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* perfume bottle body */}
      <rect
        x="6"
        y="8"
        width="32"
        height="28"
        rx="6"
        ry="6"
        fill="#929497"
      />

      {/* inner glass highlight */}
      <rect
        x="10.5"
        y="11"
        width="23"
        height="22"
        rx="4"
        ry="4"
        fill="white"
        opacity="0.06"
      />

      {/* bottle neck */}
      <rect
        x="18.5"
        y="3.5"
        width="8"
        height="8.5"
        rx="1.5"
        ry="1.5"
        fill="#929497"
      />

      {/* cap */}
      <rect
        x="17"
        y="0.5"
        width="10"
        height="3"
        rx="0.6"
        ry="0.6"
        fill="#EC1B2E"
      />

      {/* spray arc (decorative) */}
      <path
        d="M28 6 C32 2, 38 2, 42 6"
        stroke="#EC1B2E"
        strokeWidth="1"
        fill="none"
        strokeLinecap="round"
      />

      {/* three little fragrance droplets/sparkles */}
      <circle cx="46.5" cy="6.5" r="1.8" fill="#EC1B2E" />
      <circle cx="50.5" cy="9" r="1.2" fill="#EC1B2E" />
      <circle cx="53.5" cy="5.5" r="1.2" fill="#EC1B2E" />

      {/* stylized word-block bars to the right (keeps structure like your sample) */}
      <rect x="46" y="12" width="5.6" height="19" rx="0.8" fill="#EC1B2E" />
      <rect x="53" y="8" width="5.6" height="23.5" rx="0.8" fill="#EC1B2E" />
      <rect x="60" y="15" width="5.6" height="16.5" rx="0.8" fill="#EC1B2E" />
      <rect x="67" y="10" width="5.6" height="21.5" rx="0.8" fill="#EC1B2E" />

      {/* thin baseline (subtle) */}
      <path d="M0 36.5H77" stroke="#808184" strokeWidth="0.9" />

      {/* small signature dot (echo of your original small shapes) */}
      <circle cx="39" cy="36.5" r="0.9" fill="#929497" />
    </svg>
  );
}
