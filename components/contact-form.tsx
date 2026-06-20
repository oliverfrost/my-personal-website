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
      <div className="bg-card border-border-base rounded-3xl border p-8">
        {/* Header: badge top-center on mobile, title + badge row on desktop */}
        <div className="mb-8 flex flex-col items-center gap-4 lg:flex-row lg:justify-between">
          <h2 className="order-2 text-3xl font-light lg:order-1">
            {t.contact.title}
          </h2>
          {isOpenForNewOpportunities && (
            <span className="bg-background border-success order-1 inline-flex items-center rounded-full border-2 px-6 py-2 lg:order-2">
              <span className="text-success mr-2">✓</span>
              <span className="text-success font-medium">
                {t.contact.openForOpportunities}
              </span>
            </span>
          )}
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="fullName" className="mb-2 block font-medium">
              {t.contact.fullName}
            </label>
            <input
              type="text"
              id="fullName"
              name="name"
              required
              className="bg-background border-border-base focus:border-link w-full rounded-2xl border-2 px-4 py-3 transition-colors focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="email" className="mb-2 block font-medium">
              {t.contact.email}
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="bg-background border-border-base focus:border-link w-full rounded-2xl border-2 px-4 py-3 transition-colors focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="message" className="mb-2 block font-medium">
              {t.contact.message}
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              required
              className="bg-background border-border-base focus:border-link w-full resize-none rounded-2xl border-2 px-4 py-3 transition-colors focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={status === 'submitting'}
            className="bg-surface text-surface-foreground w-full rounded-2xl py-3 text-lg font-medium transition-colors disabled:opacity-60"
          >
            {status === 'submitting' ? t.contact.submitting : t.contact.submit}
          </button>

          {status === 'success' && (
            <p className="text-success text-center">{t.contact.success}</p>
          )}
          {status === 'error' && (
            <p className="text-center text-red-600 dark:text-red-400">
              {t.contact.error}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
