'use client';

import React from 'react';
import StackOverflowIcon from './icons/stackoverflow';
import LinkedInIcon from './icons/linkedin';
import GithubIcon from './icons/github';
import LeetCodeIcon from './icons/leetcode';
import { socialLinks } from '@/data/social';
import { personalInfo } from '@/data/personal';
import { useTranslation } from '@/lib/i18n/language-provider';

const iconById = {
  linkedin: LinkedInIcon,
  stackoverflow: StackOverflowIcon,
  github: GithubIcon,
  leetcode: LeetCodeIcon,
} as const;

const labelById: Record<string, string> = {
  linkedin: 'LinkedIn profile',
  stackoverflow: 'Stack Overflow profile',
  github: 'GitHub profile',
  leetcode: 'LeetCode profile',
};

export default function Summary({ className }: { className?: string }) {
  const { t } = useTranslation();

  const downloadCV = () => {
    const link = document.createElement('a');
    link.href = '/docs/Serhii_Kholodnyi_Front-End-Dev.pdf';
    link.download = 'Serhii_Kholodnyi_CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section
      className={`bg-surface text-surface-foreground p-4 ${className || ''}`}
    >
      <h1 className="mb-4 text-3xl font-bold uppercase">{personalInfo.name}</h1>
      <span className="block">{t.summary.rolePrimary}</span>
      <span className="mb-4 block">{t.summary.roleSecondary}</span>

      <ul className="flex list-none flex-row justify-between gap-4 p-0">
        {socialLinks.map((link) => {
          const Icon = iconById[link.id];
          return (
            <li key={link.id}>
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={labelById[link.id]}
              >
                <Icon />
              </a>
            </li>
          );
        })}
      </ul>

      <div className="py-4">
        <button
          onClick={downloadCV}
          className="bg-background text-foreground border-border-base w-full rounded border px-4 py-2 transition-colors"
        >
          {t.summary.downloadCv}
        </button>
      </div>
    </section>
  );
}
