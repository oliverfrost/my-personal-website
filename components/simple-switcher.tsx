'use client';

import React from 'react';
import { useTheme } from '@/lib/theme/theme-provider';

interface SimpleSwitcherProps {
  /** Optional short label shown beside the toggle (used in the mobile header). */
  label?: string;
  /**
   * Set when rendered on top of the navy `bg-surface` card (e.g. the mobile
   * header). `bg-surface`/`bg-background` are exact opposites in both themes,
   * so swapping which token drives the track vs. the knob keeps the toggle
   * visible against whichever background it's placed on.
   */
  onSurface?: boolean;
}

export default function SimpleSwitcher({
  label,
  onSurface = false,
}: SimpleSwitcherProps) {
  const { theme, toggleTheme } = useTheme();
  const isLight = theme === 'light';
  const trackClass = onSurface ? 'bg-background' : 'bg-surface';
  const knobClass = onSurface ? 'bg-surface' : 'bg-background';

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
        className={`relative h-8 w-14 rounded-full transition-colors duration-200 ease-in-out ${trackClass}`}
      >
        <span
          className={`absolute top-1 h-6 w-6 rounded-full shadow-md transition-transform duration-200 ease-in-out ${knobClass} ${
            isLight ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </span>
      {label ? <span className="text-sm">{label}</span> : null}
    </label>
  );
}
