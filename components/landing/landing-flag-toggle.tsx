"use client";

import { useLandingLanguage } from "./landing-language-provider";

function IndonesiaFlag({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 36" className={className} aria-hidden="true">
      <rect width="60" height="18" fill="#ce1126" />
      <rect y="18" width="60" height="18" fill="#fff" />
    </svg>
  );
}

function UkFlag({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 36" className={className} aria-hidden="true">
      <defs>
        <clipPath id="gift-uk-flag-clip">
          <rect width="60" height="36" />
        </clipPath>
      </defs>
      <g clipPath="url(#gift-uk-flag-clip)">
        <rect width="60" height="36" fill="#00247d" />
        <g stroke="#fff" strokeWidth="8">
          <line x1="0" y1="0" x2="60" y2="36" />
          <line x1="60" y1="0" x2="0" y2="36" />
        </g>
        <g stroke="#cf142b" strokeWidth="3">
          <line x1="0" y1="0" x2="60" y2="36" />
          <line x1="60" y1="0" x2="0" y2="36" />
        </g>
        <rect x="24" width="12" height="36" fill="#fff" />
        <rect y="12" width="60" height="12" fill="#fff" />
        <rect x="27" width="6" height="36" fill="#cf142b" />
        <rect y="15" width="60" height="6" fill="#cf142b" />
      </g>
    </svg>
  );
}

export function LandingFlagToggle() {
  const { language, selectLanguage } = useLandingLanguage();
  const isIndonesian = language === "id";

  return (
    <button
      type="button"
      onClick={() => selectLanguage(isIndonesian ? "en" : "id")}
      aria-label={isIndonesian ? "Switch to English" : "Ganti ke Bahasa Indonesia"}
      className="gift-lang-flag-btn"
      suppressHydrationWarning
    >
      {isIndonesian ? (
        <IndonesiaFlag className="gift-lang-flag-icon" />
      ) : (
        <UkFlag className="gift-lang-flag-icon" />
      )}
    </button>
  );
}
