import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/lib/theme/theme-provider';
import { themeInitScript } from '@/lib/theme/theme-script';
import { LanguageProvider } from '@/lib/i18n/language-provider';
import PersonJsonLd from '@/components/person-json-ld';
import Analytics from '@/components/analytics';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://serhiikholodnyi.com';
const description =
  'Serhii Kholodnyi — Senior Frontend Engineer & Team Lead with 16+ years in IT, 8+ years in front-end development: Angular, TypeScript, JavaScript, NgRx, RxJs, React';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Serhii Kholodnyi — Frontend Engineer & Team Lead',
  description,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: siteUrl,
    title: 'Serhii Kholodnyi — Frontend Engineer & Team Lead',
    description,
    siteName: 'Serhii Kholodnyi',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Serhii Kholodnyi — Frontend Engineer & Team Lead',
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
        {process.env.NODE_ENV === 'production' && <Analytics />}
        <ThemeProvider>
          <LanguageProvider>{children}</LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
