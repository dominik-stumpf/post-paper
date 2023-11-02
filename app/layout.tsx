import { LenisWrapper } from '@/components/lenis-wrapper';
import { Navbar } from '@/components/navbar';
import '@/types/validate-env-vars';
import { Metadata } from 'next';
import './globals.css';
import { GeistSans, GeistMono } from 'geist/font';
import { Footer } from '@/components/footer';

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
  themeColor: '#ffffff',
  icons: '/favicon.svg',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} font-sans min-h-full bg-bg-color text-fg-color selection:bg-fg-color selection:text-bg-color accent-primary-color`}
      >
        <Navbar />
        <LenisWrapper>{children}</LenisWrapper>
        <Footer />
      </body>
    </html>
  );
}
