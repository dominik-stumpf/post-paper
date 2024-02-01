import { LenisWrapper } from '@/components/lenis-wrapper';
import { Navbar } from '@/components/navbar/navbar';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';
import '@/styles/globals.css';
import { JetBrains_Mono } from 'next/font/google';
import { GeistSans } from 'geist/font/sans';
import type { Metadata, Viewport } from 'next';
import { getValidIconPath } from './icon';

const JetBrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'PostPaper',
  description: 'Productivity-oriented posting platform.',
  applicationName: 'PostPaper',
  icons: {
    icon: '/assets/vectors/brand-logo.svg',
    shortcut: getValidIconPath(48),
    apple: getValidIconPath(192),
  },
  creator: 'Dominik Stumpf',
  authors: [
    {
      name: 'Dominik Stumpf',
      url: 'https://dominikstumpf.com',
    },
  ],
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
  ],
  colorScheme: 'dark light',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn([
          'min-h-screen bg-background font-sans text-foreground antialiased accent-primary selection:bg-foreground selection:text-background',
          GeistSans.variable,
          JetBrainsMono.variable,
        ])}
      >
        <ThemeProvider>
          <Navbar />
          <LenisWrapper>{children}</LenisWrapper>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
