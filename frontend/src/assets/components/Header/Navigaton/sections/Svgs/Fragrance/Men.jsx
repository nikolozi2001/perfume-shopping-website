const Man = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      width="64"
      height="64"
      fill="none"
    >
      {/* Hair (short style) */}
      <path
        d="M32 4c-10 0-18 8-18 18v4c0 8 8 14 18 14s18-6 18-14v-4c0-10-8-18-18-18z"
        fill="#4A90E2"
      />
      {/* Face */}
      <circle cx="32" cy="24" r="10" fill="#FFE0BD" />
      {/* Body (shirt/jacket) */}
      <path
        d="M20 50c0-6.627 5.373-12 12-12s12 5.373 12 12v8H20v-8z"
        fill="#6FA8DC"
      />
      {/* Shoulders */}
      <path
        d="M12 58c0-8.837 7.163-16 16-16h8c8.837 0 16 7.163 16 16H12z"
        fill="#85B9E6"
      />
    </svg>
  );
};

export default Man;
