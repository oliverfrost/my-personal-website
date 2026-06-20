'use client';

import React from 'react';
import { languageProficiencies } from '@/data/languages';
import { useTranslation } from '@/lib/i18n/language-provider';

export default function Languages() {
  const { t } = useTranslation();
  return (
    <div className="w-full">
      <h2 className="mb-4 text-2xl font-bold border-b border-border-base uppercase">
        {t.sections.languages}
      </h2>
      <ul className="space-y-3">
        {languageProficiencies.map((lang) => (
          <li key={lang.nameKey} className="flex justify-between space-x-3">
            <span>{t.languageNames[lang.nameKey]}</span>
            <span>{lang.level}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
