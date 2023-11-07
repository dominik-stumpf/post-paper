import { LenisWrapper } from '@/components/lenis-wrapper';
import { Navbar } from '@/components/navbar/navbar';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';
import '@/styles/globals.css';
import '@/types/validate-env-vars';
import { GeistMono, GeistSans } from 'geist/font';
import { Metadata, Viewport } from 'next';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = {
  title: 'PostPaper',
  description: 'Productivity-oriented posting platform.',
  applicationName: 'PostPaper',
  manifest: '/manifest.webmanifest',
  robots: {
    follow: true,
    index: true,
  },
  icons: { icon: '/favicon.svg', apple: '/assets/icons/icon-128x128.png' },
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
          'font-sans antialiased min-h-full bg-background text-foreground selection:bg-foreground selection:text-background accent-primary',
          GeistSans.variable,
          GeistMono.variable,
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
