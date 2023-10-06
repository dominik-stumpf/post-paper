import { Navbar } from '@/components/navbar';
import NextAuthProvider from '@/components/next-auth-provider';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'post-paper',
  description: 'Public posting webpage.',
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
        <div className="h-full">{children}</div>
      </body>
    </html>
  );
}
