import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/lib/theme/theme-provider';
import { themeInitScript } from '@/lib/theme/theme-script';
import { LanguageProvider } from '@/lib/i18n/language-provider';

export const metadata: Metadata = {
  title: 'Kholodnyi Serhii - Frontend Developer',
  description: '',
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
        <ThemeProvider>
          <LanguageProvider>{children}</LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
