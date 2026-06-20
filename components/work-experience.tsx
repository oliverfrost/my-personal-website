'use client';

import React from 'react';
import WorkExperienceItem from './work-experience-item';
import { workExperience } from '@/data/work-experience';
import { useTranslation } from '@/lib/i18n/language-provider';

export default function WorkExperience() {
  const { t } = useTranslation();
  return (
    <div className="w-full">
      <h2 className="mb-4 text-2xl font-bold border-b border-border-base uppercase">
        {t.sections.workExperience}
      </h2>
      <div className="mt-6">
        {workExperience.map((experience, index) => (
          <WorkExperienceItem key={index} {...experience} />
        ))}
      </div>
    </div>
  );
}
