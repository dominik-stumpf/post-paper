import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import '@/types/validate-env-vars';

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
        <main className="min-h-screen bg-background flex flex-col items-center">
          {children}
        </main>
      </body>
    </html>
  );
}
