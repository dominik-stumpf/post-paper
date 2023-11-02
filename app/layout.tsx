import { LenisWrapper } from '@/components/lenis-wrapper';
import { Navbar } from '@/components/navbar';
import '@/types/validate-env-vars';
import { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const jetbrainsMono = JetBrains_Mono({
  variable: '--mono',
  subsets: ['latin'],
});

const inter = Inter({ subsets: ['latin'], variable: '--inter' });

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
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans min-h-full bg-bg-color text-fg-color`}
      >
        <Navbar />
        <LenisWrapper>{children}</LenisWrapper>
      </body>
    </html>
  );
}
