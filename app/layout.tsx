import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/lib/theme/theme-provider';
import { themeInitScript } from '@/lib/theme/theme-script';
import { LanguageProvider } from '@/lib/i18n/language-provider';
import PersonJsonLd from '@/components/person-json-ld';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';
const description =
  'Serhii Kholodnyi — Senior Frontend Developer and Team Lead with 14+ years in IT. Vue.js, Angular, React, TypeScript, Pinia, and Docker.';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Serhii Kholodnyi — Frontend Developer & Team Lead',
  description,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: siteUrl,
    title: 'Serhii Kholodnyi — Frontend Developer & Team Lead',
    description,
    siteName: 'Serhii Kholodnyi',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Serhii Kholodnyi — Frontend Developer & Team Lead',
    description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/dlx6tqv.css" />
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>
        <PersonJsonLd />
        <ThemeProvider>
          <LanguageProvider>{children}</LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
