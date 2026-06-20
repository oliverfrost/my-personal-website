'use client';

import React from 'react';
import { useTranslation } from '@/lib/i18n/language-provider';

export default function Greeting() {
  const { t } = useTranslation();
  return (
    <section>
      <h2 className="mb-4 text-xl font-bold uppercase">{t.greeting.heading}</h2>
      <p className="text-sm">{t.greeting.body}</p>
    </section>
  );
}
