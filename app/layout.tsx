import { LenisWrapper } from '@/components/lenis-wrapper';
import { Navbar } from '@/components/navbar';
import '@/types/validate-env-vars';
import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

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
      <body className={inter.className}>
        <Navbar />
        <LenisWrapper>
          <main className="min-h-screen bg-background flex flex-col items-center text-foreground">
            {children}
          </main>
        </LenisWrapper>
      </body>
    </html>
  );
}
