import React from 'react';

const CloseIcon = ({ onClick }: { onClick: () => void }) => (
  <button
    onClick={onClick}
    className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
    aria-label="Close"
  >
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 1L11 11M1 11L11 1"
        stroke="black"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </button>
);

export default CloseIcon;
