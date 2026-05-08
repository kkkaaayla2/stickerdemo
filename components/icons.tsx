import React from "react";

type P = React.SVGProps<SVGSVGElement>;

export const ChevronLeft = (p: P) => (
  <svg viewBox="0 0 24 24" width={24} height={24} fill="none" {...p}>
    <path
      d="M15 5l-7 7 7 7"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const ChevronRight = (p: P) => (
  <svg viewBox="0 0 24 24" width={20} height={20} fill="none" {...p}>
    <path
      d="M9 5l7 7-7 7"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const Plus = (p: P) => (
  <svg viewBox="0 0 24 24" width={20} height={20} fill="none" {...p}>
    <path
      d="M12 5v14M5 12h14"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

export const Mic = (p: P) => (
  <svg viewBox="0 0 24 24" width={16} height={16} fill="none" {...p}>
    <rect
      x="9"
      y="3"
      width="6"
      height="12"
      rx="3"
      stroke="currentColor"
      strokeWidth="1.7"
    />
    <path
      d="M5 11a7 7 0 0 0 14 0M12 18v3"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
    />
  </svg>
);

export const Hash = (p: P) => (
  <svg viewBox="0 0 24 24" width={16} height={16} fill="none" {...p}>
    <path
      d="M9 4l-2 16M17 4l-2 16M4 9h16M3 15h16"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
  </svg>
);

export const At = (p: P) => (
  <svg viewBox="0 0 24 24" width={16} height={16} fill="none" {...p}>
    <circle cx="12" cy="12" r="3.4" stroke="currentColor" strokeWidth="1.6" />
    <path
      d="M15.5 12V8.5M15.5 12c0 2 1.4 3 3 3 2 0 3-2 3-4.5C21.5 6 17.8 3 12 3 6.5 3 2.5 7 2.5 12.5S6 21.5 12 21.5c2.3 0 4-.5 5.5-1.5"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
  </svg>
);

export const VoteIcon = (p: P) => (
  <svg viewBox="0 0 24 24" width={16} height={16} fill="none" {...p}>
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
    <path
      d="M7.5 13.5c1.2-3 2-4.5 4.5-4.5s3.3 1.5 4.5 4.5"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
  </svg>
);

export const Pin = (p: P) => (
  <svg viewBox="0 0 24 24" width={18} height={18} fill="none" {...p}>
    <path
      d="M12 22s7-7.6 7-12a7 7 0 0 0-14 0c0 4.4 7 12 7 12Z"
      stroke="currentColor"
      strokeWidth="1.7"
    />
    <circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.7" />
  </svg>
);

export const Lock = (p: P) => (
  <svg viewBox="0 0 24 24" width={18} height={18} fill="none" {...p}>
    <rect
      x="5"
      y="10"
      width="14"
      height="10"
      rx="2"
      stroke="currentColor"
      strokeWidth="1.7"
    />
    <path d="M8 10V7a4 4 0 0 1 8 0v3" stroke="currentColor" strokeWidth="1.7" />
  </svg>
);

export const Grid2x2 = (p: P) => (
  <svg viewBox="0 0 24 24" width={18} height={18} fill="none" {...p}>
    <rect x="3" y="3" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.7" />
    <rect x="13" y="3" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.7" />
    <rect x="3" y="13" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.7" />
    <rect x="13" y="13" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.7" />
  </svg>
);

export const Gear = (p: P) => (
  <svg viewBox="0 0 24 24" width={18} height={18} fill="none" {...p}>
    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.7" />
    <path
      d="M19.4 13a7.5 7.5 0 0 0 0-2l2-1.5-2-3.4-2.4 1a7.5 7.5 0 0 0-1.7-1l-.4-2.6h-4l-.4 2.6a7.5 7.5 0 0 0-1.7 1l-2.4-1-2 3.4 2 1.5a7.5 7.5 0 0 0 0 2l-2 1.5 2 3.4 2.4-1c.5.4 1.1.7 1.7 1l.4 2.6h4l.4-2.6c.6-.3 1.2-.6 1.7-1l2.4 1 2-3.4-2-1.5Z"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinejoin="round"
    />
  </svg>
);

export const Heart = (p: P) => (
  <svg viewBox="0 0 24 24" width={22} height={22} fill="none" {...p}>
    <path
      d="M12 20s-7.5-4.5-7.5-10A4.5 4.5 0 0 1 12 6.5 4.5 4.5 0 0 1 19.5 10c0 5.5-7.5 10-7.5 10Z"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
  </svg>
);

export const Star = (p: P) => (
  <svg viewBox="0 0 24 24" width={22} height={22} fill="none" {...p}>
    <path
      d="m12 3 2.7 5.7 6.3.6-4.7 4.3 1.4 6.2L12 16.7 6.3 19.8l1.4-6.2L3 9.3l6.3-.6L12 3Z"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinejoin="round"
    />
  </svg>
);

export const Comment = (p: P) => (
  <svg viewBox="0 0 24 24" width={22} height={22} fill="none" {...p}>
    <path
      d="M4 5h16v11H8.5L5 19.5V5Z"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinejoin="round"
    />
  </svg>
);

export const Share = (p: P) => (
  <svg viewBox="0 0 24 24" width={22} height={22} fill="none" {...p}>
    <path
      d="M5 13v6h14v-6M16 6l-4-4-4 4M12 2v13"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const ComponentsIcon = (p: P) => (
  <svg viewBox="0 0 24 24" width={18} height={18} fill="none" {...p}>
    <rect x="3" y="3" width="7" height="7" rx="1.2" stroke="currentColor" strokeWidth="1.7" />
    <rect x="14" y="3" width="7" height="7" rx="1.2" stroke="currentColor" strokeWidth="1.7" />
    <rect x="3" y="14" width="7" height="7" rx="1.2" stroke="currentColor" strokeWidth="1.7" />
    <rect x="14" y="14" width="7" height="7" rx="1.2" stroke="currentColor" strokeWidth="1.7" />
  </svg>
);

export const Pencil = (p: P) => (
  <svg viewBox="0 0 24 24" width={14} height={14} fill="none" {...p}>
    <path
      d="m4 20 4-1 11-11-3-3L5 16l-1 4Z"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinejoin="round"
    />
  </svg>
);

export const Close = (p: P) => (
  <svg viewBox="0 0 24 24" width={16} height={16} fill="none" {...p}>
    <path
      d="M6 6l12 12M18 6 6 18"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

export const Filter = (p: P) => (
  <svg viewBox="0 0 24 24" width={14} height={14} fill="none" {...p}>
    <path
      d="M4 7h13M4 12h9M4 17h5"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
    />
    <circle cx="19" cy="7" r="1.5" fill="currentColor" />
    <circle cx="15" cy="12" r="1.5" fill="currentColor" />
    <circle cx="11" cy="17" r="1.5" fill="currentColor" />
  </svg>
);

export const Dislike = (p: P) => (
  <svg viewBox="0 0 24 24" width={18} height={18} fill="none" {...p}>
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="9" cy="10.5" r="0.9" fill="currentColor" />
    <circle cx="15" cy="10.5" r="0.9" fill="currentColor" />
    <path
      d="M8.5 16c1-1.2 2.2-1.8 3.5-1.8s2.5.6 3.5 1.8"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

export const ImageIcon = (p: P) => (
  <svg viewBox="0 0 24 24" width={18} height={18} fill="none" {...p}>
    <rect
      x="3"
      y="5"
      width="18"
      height="14"
      rx="2"
      stroke="currentColor"
      strokeWidth="1.7"
    />
    <circle cx="9" cy="10" r="1.4" fill="currentColor" />
    <path
      d="m4 17 5-5 4 4 3-3 4 4"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinejoin="round"
    />
  </svg>
);
