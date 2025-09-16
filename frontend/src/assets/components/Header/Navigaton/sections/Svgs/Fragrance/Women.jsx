const Women = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      width="64"
      height="64"
      fill="none"
    >
      {/* Hair */}
      <path
        d="M32 4c-10 0-18 8-18 18v6c0 10 8 18 18 18s18-8 18-18v-6c0-10-8-18-18-18z"
        fill="#FFB6C1"
      />
      {/* Face */}
      <circle cx="32" cy="26" r="10" fill="#FFE0BD" />
      {/* Body */}
      <path
        d="M20 50c0-6.627 5.373-12 12-12s12 5.373 12 12v8H20v-8z"
        fill="#FF69B4"
      />
      {/* Shoulders */}
      <path
        d="M12 58c0-8.837 7.163-16 16-16h8c8.837 0 16 7.163 16 16H12z"
        fill="#FF85C1"
      />
    </svg>
  );
};

export default Women;
