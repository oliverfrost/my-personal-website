'use client';

import React from 'react';
import { education } from '@/data/education';
import { useTranslation } from '@/lib/i18n/language-provider';

export default function Education() {
  const { t } = useTranslation();
  return (
    <div className="w-full">
      <h2 className="border-border-base mb-4 border-b text-2xl font-bold uppercase">
        {t.sections.education}
      </h2>

      <div className="mt-6">
        {education.map((entry, index) => (
          <div key={index} className="relative flex lg:items-start">
            {/* Desktop-only left column: period badge */}
            <div className="hidden lg:flex lg:w-48 lg:flex-shrink-0 lg:pt-1">
              <span className="bg-badge text-badge-foreground inline-block rounded px-3 py-1 text-sm">
                {entry.period}
              </span>
            </div>

            {/* Timeline line + dot */}
            <div className="mr-4 flex flex-col items-center">
              <span className="bg-surface h-2 w-2 rounded-full shadow-sm" />
              <span className="bg-border-base mt-2 mb-2 min-h-[100px] w-0.5 flex-grow" />
            </div>

            {/* Content */}
            <div className="flex-1 pb-8">
              <span className="bg-badge text-badge-foreground mb-3 inline-block rounded px-3 py-1 text-sm lg:hidden">
                {entry.period}
              </span>
              <h3 className="mb-2 text-lg font-semibold">{entry.university}</h3>
              {/* Logo slot reserved; asset to be added later by the site owner */}
              <p className="text-muted mb-1">{t.degrees[entry.degreeKey]}</p>
              <p className="text-sm font-medium uppercase">{entry.field}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
