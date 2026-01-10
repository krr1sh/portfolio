import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://saikrishnagoli.com'),
  title: 'Sai Krishna Goli | Business Systems & Data Analyst',
  description: 'Portfolio of Sai Krishna Goli...',
  icons: {
    // ADDED ?v=2 TO FORCE BROWSER TO RELOAD IMAGE
    icon: '/logo.png?v=2', 
    shortcut: '/logo.png?v=2',
    apple: '/logo.png?v=2',
  },
  // ... rest of your openGraph settings ...
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} overflow-x-hidden bg-[#141414]`}>
        {children}
      </body>
    </html>
  );
}