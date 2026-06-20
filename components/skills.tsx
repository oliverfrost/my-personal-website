'use client';

import React from 'react';
import { skills } from '@/data/skills';
import { useTranslation } from '@/lib/i18n/language-provider';

export default function Skills() {
  const { t } = useTranslation();
  return (
    <div className="w-full">
      <h2 className="border-border-base mb-4 border-b text-2xl font-bold uppercase">
        {t.sections.skills}
      </h2>
      <ul className="grid gap-1 sm:grid-cols-2 sm:gap-4">
        {skills.map((skill) => (
          <li key={skill}>{skill}</li>
        ))}
      </ul>
    </div>
  );
}
