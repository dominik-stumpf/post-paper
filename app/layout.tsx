import { Footer } from '@/components/footer';
import { LenisWrapper } from '@/components/lenis-wrapper';
import { Navbar } from '@/components/navbar/navbar';
import { ThemeProvider } from '@/components/theme-provider';
import { cn } from '@/lib/utils';
import '@/types/validate-env-vars';
import { GeistMono, GeistSans } from 'geist/font';
import { Metadata, Viewport } from 'next';
import './globals.css';

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
