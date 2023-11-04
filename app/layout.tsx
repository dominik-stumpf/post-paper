import { LenisWrapper } from '@/components/lenis-wrapper';
import { Navbar } from '@/components/navbar/navbar';
import '@/types/validate-env-vars';
import { Metadata, Viewport } from 'next';
import './globals.css';
import { GeistSans, GeistMono } from 'geist/font';
import { Footer } from '@/components/footer';
import { cn } from '@/lib/utils';
import { ThemeProvider } from '@/components/theme-provider';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = {
  title: 'POSTPAPER',
  description: 'Public posting webpage.',
  applicationName: 'POSTPAPER',
  manifest: '/manifest.webmanifest',
  robots: {
    follow: true,
    index: true,
  },
  icons: '/favicon.svg',
};

export const viewPort: Viewport = {
  themeColor: 'white',
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
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
