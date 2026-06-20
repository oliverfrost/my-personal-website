'use client';

import React from 'react';
import SimpleSwitcher from './simple-switcher';
import MoonIcon from './icons/moon-icon';
import SunIcon from './icons/sun-icon';
import { useTranslation } from '@/lib/i18n/language-provider';

export default function FullSizeThemeSwitcher() {
  const { t } = useTranslation();
  return (
    <div className="flex items-center gap-3">
      <span className="flex items-center gap-1">
        <MoonIcon />
        <span>{t.theme.dark}</span>
      </span>
      <SimpleSwitcher />
      <span className="flex items-center gap-1">
        <SunIcon />
        <span>{t.theme.light}</span>
      </span>
    </div>
  );
}
