'use client';

import React, { useState } from 'react';
import { personalInfo } from '@/data/personal';
import { useTranslation } from '@/lib/i18n/language-provider';

export default function PhoneReveal() {
  const { t } = useTranslation();
  const [phone, setPhone] = useState<string | null>(null);

  if (phone) {
    return <a href={`tel:${phone.replace(/\s/g, '')}`}>{phone}</a>;
  }

  return (
    <button
      type="button"
      onClick={() => setPhone(atob(personalInfo.phoneEncoded))}
      className="text-link cursor-pointer underline underline-offset-2"
    >
      {t.phone.reveal}
    </button>
  );
}
