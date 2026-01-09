import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

// --- THIS IS THE NEW METADATA SECTION ---
export const metadata: Metadata = {
  title: 'Sai Krishna Goli | Business Systems & Data Analyst',
  description: 'Portfolio of Sai Krishna Goli - Experienced Analyst specializing in Data Strategy, Compliance, and Business Intelligence.',
  openGraph: {
    title: 'Sai Krishna Goli | Portfolio',
    description: 'Check out my professional journey, skills, and creative edits.',
    url: 'https://saikrishnagoli.com', // CHANGE THIS if you use a different domain later
    siteName: 'Sai Krishna Portfolio',
    images: [
      {
        url: '/images/my-profile.jpg', // Ensure this image exists in public/images/
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};
// ----------------------------------------

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      // Inside app/layout.tsx
<body className={`${inter.className} overflow-x-hidden`}>
  {children}
</body>
    </html>
  );
}