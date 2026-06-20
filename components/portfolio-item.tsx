'use client';

import React from 'react';
import type { PortfolioProject } from '@/data/portfolio';
import { useTranslation } from '@/lib/i18n/language-provider';

export default function PortfolioItem({ project }: { project: PortfolioProject }) {
  const { t } = useTranslation();
  return (
    <article className="mb-10">
      <h3 className="text-lg font-bold uppercase mb-4">{project.title}</h3>

      {/* Image placeholder: outlined rounded square matching the mockup */}
      <div className="w-full max-w-md aspect-square rounded-3xl border border-border-base flex items-center justify-center mb-4">
        {project.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover rounded-3xl" />
        ) : (
          <span className="text-muted text-sm">Image</span>
        )}
      </div>

      <a
        href={project.linkUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-link uppercase text-sm font-medium"
      >
        {t.portfolio.linkLabel}
      </a>

      <p className="mt-4 text-sm">
        <span className="font-semibold">{t.portfolio.aboutLabel}</span> {project.about}
      </p>
      <p className="mt-4 text-sm">
        <span className="font-semibold">{t.portfolio.technologiesLabel}</span>{' '}
        {project.technologies}
      </p>
    </article>
  );
}
