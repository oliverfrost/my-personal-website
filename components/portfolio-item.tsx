'use client';

import React from 'react';
import type { PortfolioProject } from '@/data/portfolio';
import { useTranslation } from '@/lib/i18n/language-provider';

export default function PortfolioItem({
  project,
}: {
  project: PortfolioProject;
}) {
  const { t } = useTranslation();
  return (
    <article className="mb-10">
      <h3 className="mb-4 text-lg font-bold uppercase">{project.title}</h3>

      {/* Image placeholder: outlined rounded square matching the mockup */}
      <div className="border-border-base mb-4 flex aspect-square w-full max-w-md items-center justify-center rounded-3xl border">
        {project.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={project.imageUrl}
            alt={project.title}
            className="h-full w-full rounded-3xl object-cover"
          />
        ) : (
          <span className="text-muted text-sm">Image</span>
        )}
      </div>

      <a
        href={project.linkUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-link text-sm font-medium uppercase"
      >
        {t.portfolio.linkLabel}
      </a>

      <p className="mt-4 text-sm">
        <span className="font-semibold">{t.portfolio.aboutLabel}</span>{' '}
        {project.about}
      </p>
      <p className="mt-4 text-sm">
        <span className="font-semibold">{t.portfolio.technologiesLabel}</span>{' '}
        {project.technologies}
      </p>
    </article>
  );
}
