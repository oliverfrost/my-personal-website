'use client';

import React from 'react';
import { education } from '@/data/education';
import { useTranslation } from '@/lib/i18n/language-provider';

export default function Education() {
  const { t } = useTranslation();
  return (
    <div className="w-full">
      <h2 className="mb-4 text-2xl font-bold border-b border-border-base uppercase">
        {t.sections.education}
      </h2>

      <div className="mt-6">
        {education.map((entry, index) => (
          <div key={index} className="relative flex lg:items-start">
            {/* Desktop-only left column: period badge */}
            <div className="hidden lg:flex lg:w-48 lg:flex-shrink-0 lg:pt-1">
              <span className="inline-block bg-badge text-badge-foreground text-sm px-3 py-1 rounded">
                {entry.period}
              </span>
            </div>

            {/* Timeline line + dot */}
            <div className="flex flex-col items-center mr-4">
              <span className="w-2 h-2 rounded-full bg-surface shadow-sm" />
              <span className="w-0.5 bg-border-base flex-grow mt-2 mb-2 min-h-[100px]" />
            </div>

            {/* Content */}
            <div className="flex-1 pb-8">
              <span className="lg:hidden inline-block bg-badge text-badge-foreground text-sm px-3 py-1 rounded mb-3">
                {entry.period}
              </span>
              <h3 className="text-lg font-semibold mb-2">{entry.university}</h3>
              {/* Logo slot reserved; asset to be added later by the site owner */}
              <p className="text-muted mb-1">{t.degrees[entry.degreeKey]}</p>
              <p className="font-medium uppercase text-sm">{entry.field}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
