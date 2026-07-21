'use client';

import React from 'react';
import { useTranslation } from '@/lib/i18n/language-provider';

export default function Greeting() {
  const { t } = useTranslation();
  return (
    <section>
      <h2 className="mb-4 text-xl font-bold uppercase">{t.greeting.heading}</h2>
      <div className="space-y-3 text-sm">
        {t.greeting.body.split('\n\n').map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </section>
  );
}
