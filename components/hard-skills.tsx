'use client';

import React from 'react';
import SkillSlider from './skill-slider';
import { hardSkills } from '@/data/hard-skills';
import { useTranslation } from '@/lib/i18n/language-provider';

export default function HardSkills() {
  const { t } = useTranslation();
  return (
    <div className="w-full">
      <h2 className="mb-4 text-2xl font-bold border-b border-border-base uppercase">
        {t.sections.hardSkills}
      </h2>
      <div className="mt-6 grid gap-4 grid-cols-1 lg:grid-cols-2 lg:gap-6">
        {hardSkills.map((s) => (
          <SkillSlider key={s.skill} skill={s.skill} percentage={s.percentage} />
        ))}
      </div>
    </div>
  );
}
