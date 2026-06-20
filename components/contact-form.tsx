'use client';

import React, { useState } from 'react';
import { useTranslation } from '@/lib/i18n/language-provider';

type Status = 'idle' | 'submitting' | 'success' | 'error';

const isOpenForNewOpportunities = true;

export default function ContactForm() {
  const { t } = useTranslation();
  const [status, setStatus] = useState<Status>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');

    const form = e.currentTarget;
    const formData = new FormData(form);
    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

    if (!accessKey) {
      setStatus('error');
      return;
    }
    formData.append('access_key', accessKey);

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        setStatus('success');
        form.reset();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="w-full">
      <div className="bg-card rounded-3xl p-8 border border-border-base">
        {/* Header: badge top-center on mobile, title + badge row on desktop */}
        <div className="mb-8 flex flex-col items-center gap-4 lg:flex-row lg:justify-between">
          <h2 className="text-3xl font-light order-2 lg:order-1">{t.contact.title}</h2>
          {isOpenForNewOpportunities && (
            <span className="order-1 lg:order-2 inline-flex items-center px-6 py-2 bg-background border-2 border-success rounded-full">
              <span className="text-success mr-2">✓</span>
              <span className="text-success font-medium">{t.contact.openForOpportunities}</span>
            </span>
          )}
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="fullName" className="block font-medium mb-2">
              {t.contact.fullName}
            </label>
            <input
              type="text"
              id="fullName"
              name="name"
              required
              className="w-full px-4 py-3 bg-background border-2 border-border-base rounded-2xl focus:outline-none focus:border-link transition-colors"
            />
          </div>

          <div>
            <label htmlFor="email" className="block font-medium mb-2">
              {t.contact.email}
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full px-4 py-3 bg-background border-2 border-border-base rounded-2xl focus:outline-none focus:border-link transition-colors"
            />
          </div>

          <div>
            <label htmlFor="message" className="block font-medium mb-2">
              {t.contact.message}
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              required
              className="w-full px-4 py-3 bg-background border-2 border-border-base rounded-2xl focus:outline-none focus:border-link transition-colors resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={status === 'submitting'}
            className="w-full bg-surface text-surface-foreground py-3 rounded-2xl font-medium text-lg transition-colors disabled:opacity-60"
          >
            {status === 'submitting' ? t.contact.submitting : t.contact.submit}
          </button>

          {status === 'success' && <p className="text-success text-center">{t.contact.success}</p>}
          {status === 'error' && (
            <p className="text-red-600 dark:text-red-400 text-center">{t.contact.error}</p>
          )}
        </form>
      </div>
    </div>
  );
}
