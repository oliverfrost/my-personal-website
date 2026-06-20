'use client';

import React from 'react';
import { useTheme } from '@/lib/theme/theme-provider';

interface SimpleSwitcherProps {
  /** Optional short label shown beside the toggle (used in the mobile header). */
  label?: string;
}

export default function SimpleSwitcher({ label }: SimpleSwitcherProps) {
  const { theme, toggleTheme } = useTheme();
  const isLight = theme === 'light';

  return (
    <label className="relative inline-flex cursor-pointer items-center gap-2">
      <input
        type="checkbox"
        checked={isLight}
        onChange={toggleTheme}
        className="sr-only"
        aria-label={isLight ? 'Switch to dark theme' : 'Switch to light theme'}
      />
      <span
        className={`relative h-8 w-14 rounded-full transition-colors duration-200 ease-in-out ${
          isLight ? 'bg-white' : 'bg-slate-600'
        }`}
      >
        <span
          className={`absolute top-1 h-6 w-6 rounded-full shadow-md transition-transform duration-200 ease-in-out ${
            isLight ? 'translate-x-6 bg-slate-600' : 'translate-x-1 bg-white'
          }`}
        />
      </span>
      {label ? <span className="text-sm">{label}</span> : null}
    </label>
  );
}
