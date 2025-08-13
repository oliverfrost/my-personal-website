import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Kholodnyi Serhii - Frontend Developer',
  description: '',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/dlx6tqv.css" />
      </head>
      <body>{children}</body>
    </html>
  );
}
