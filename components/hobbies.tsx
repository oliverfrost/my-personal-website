'use client';

import React from 'react';
import BiohackingIcon from './icons/biohacking-icon';
import BooksReadingIcon from './icons/books-reading-icon';
import BusinessStrategyIcon from './icons/business-strategy-icon';
import InvestingIcon from './icons/investing-icon';
import SoftwareArchitectureIcon from './icons/software-architecture-icon';
import StartupsIcon from './icons/startups-icon';
import TechnologiesComputersIcon from './icons/technologies-computers-icon';
import TravelIcon from './icons/travel-icon';
import TriathlonIcon from './icons/triathlon-icon';
import { hobbies, type HobbyId } from '@/data/hobbies';
import { useTranslation } from '@/lib/i18n/language-provider';

const iconByHobby: Record<
  HobbyId,
  React.ComponentType<{ className?: string }>
> = {
  technologiesComputers: TechnologiesComputersIcon,
  softwareArchitecture: SoftwareArchitectureIcon,
  booksReading: BooksReadingIcon,
  investing: InvestingIcon,
  startups: StartupsIcon,
  businessStrategy: BusinessStrategyIcon,
  travel: TravelIcon,
  triathlon: TriathlonIcon,
  biohacking: BiohackingIcon,
};

export default function Hobbies() {
  const { t } = useTranslation();
  return (
    <div className="w-full">
      <h2 className="border-border-base mb-4 border-b text-2xl font-bold">
        {t.sections.hobbies}
      </h2>
      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
        {hobbies.map((id) => {
          const Icon = iconByHobby[id];
          return (
            <div key={id} className="flex items-center space-x-3">
              <span className="h-8 w-8 flex-shrink-0">
                <Icon />
              </span>
              <span className="font-medium">{t.hobbies[id]}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
