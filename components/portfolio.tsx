'use client';

import React from 'react';
import PortfolioItem from './portfolio-item';
import { portfolioProjects } from '@/data/portfolio';
import { useTranslation } from '@/lib/i18n/language-provider';

export default function Portfolio() {
  const { t } = useTranslation();
  return (
    <div className="w-full">
      <h2 className="border-border-base mb-4 border-b text-2xl font-bold uppercase">
        {t.sections.portfolio}
      </h2>
      <div className="mt-6">
        {portfolioProjects.map((project) => (
          <PortfolioItem key={project.title} project={project} />
        ))}
      </div>
    </div>
  );
}
