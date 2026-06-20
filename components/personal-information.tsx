'use client';

import React from 'react';
import LinkedInIcon from './icons/linkedin';
import PersonIcon from './icons/person';
import MapMarkerIcon from './icons/map-marker';
import PhoneIcon from './icons/phone';
import AtIcon from './icons/at';
import { personalInfo } from '@/data/personal';
import { useTranslation } from '@/lib/i18n/language-provider';

export default function PersonalInformation() {
  const { t } = useTranslation();
  return (
    <div className="w-full mb-4 lg:mb-0">
      <h2 className="mb-4 text-2xl font-bold border-b border-border-base uppercase">
        {t.sections.personalInformation}
      </h2>

      <ul className="space-y-3">
        <li className="flex items-center space-x-3">
          <PersonIcon className="w-6 h-6" variant="dark" />
          <span>{personalInfo.name}</span>
        </li>
        <li className="flex items-center space-x-3">
          <MapMarkerIcon className="w-6 h-6" variant="dark" />
          <span>{personalInfo.location}</span>
        </li>
        <li className="flex items-center space-x-3">
          <PhoneIcon className="w-6 h-6" variant="dark" />
          <a href={personalInfo.phoneHref}>{personalInfo.phone}</a>
        </li>
        <li className="flex items-center space-x-3">
          <AtIcon className="w-6 h-6" variant="dark" />
          <a href={`mailto:${personalInfo.email}`}>{personalInfo.email}</a>
        </li>
        <li className="flex items-center space-x-3">
          <LinkedInIcon className="w-6 h-6" variant="dark" />
          <a href={personalInfo.linkedinUrl} target="_blank" rel="noopener noreferrer">
            {personalInfo.linkedinLabel}
          </a>
        </li>
      </ul>
    </div>
  );
}
