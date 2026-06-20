'use client';

import React from 'react';
import ComputerNetworksIcon from './icons/computer-networks-icon';
import EducationIcon from './icons/education-icon';
import FinanceIcon from './icons/finance';
import HealthcareIcon from './icons/healthcare-icon';
import InsuranceIcon from './icons/insurance';
import SeoIcon from './icons/seo-icon';
import SocialNetworksIcon from './icons/social-networks-icon';
import { domainExpertise, type DomainId } from '@/data/domain-expertise';
import { useTranslation } from '@/lib/i18n/language-provider';

const iconByDomain: Record<DomainId, React.ComponentType<{ variant?: 'light' | 'dark' }>> = {
  finance: FinanceIcon,
  insurance: InsuranceIcon,
  healthcare: HealthcareIcon,
  socialNetworks: SocialNetworksIcon,
  education: EducationIcon,
  seo: SeoIcon,
  computerNetworks: ComputerNetworksIcon,
};

export default function DomainExpertise() {
  const { t } = useTranslation();
  return (
    <div className="w-full">
      <h2 className="mb-4 text-2xl font-bold border-b border-border-base">
        {t.sections.domainExpertise}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        {domainExpertise.map((id) => {
          const Icon = iconByDomain[id];
          return (
            <div key={id} className="flex items-center space-x-3">
              <span className="w-8 h-8 flex-shrink-0">
                <Icon variant="dark" />
              </span>
              <span className="font-medium">{t.domains[id]}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
