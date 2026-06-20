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
    <div className="mb-4 w-full lg:mb-0">
      <h2 className="border-border-base mb-4 border-b text-2xl font-bold uppercase">
        {t.sections.personalInformation}
      </h2>

      <ul className="space-y-3">
        <li className="flex items-center space-x-3">
          <PersonIcon className="h-6 w-6" />
          <span>{personalInfo.name}</span>
        </li>
        <li className="flex items-center space-x-3">
          <MapMarkerIcon className="h-6 w-6" />
          <span>{personalInfo.location}</span>
        </li>
        <li className="flex items-center space-x-3">
          <PhoneIcon className="h-6 w-6" />
          <a href={personalInfo.phoneHref}>{personalInfo.phone}</a>
        </li>
        <li className="flex items-center space-x-3">
          <AtIcon className="h-6 w-6" />
          <a href={`mailto:${personalInfo.email}`}>{personalInfo.email}</a>
        </li>
        <li className="flex items-center space-x-3">
          <LinkedInIcon className="h-6 w-6" />
          <a
            href={personalInfo.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {personalInfo.linkedinLabel}
          </a>
        </li>
      </ul>
    </div>
  );
}
