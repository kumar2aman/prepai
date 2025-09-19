import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'PrepAI - Master Your Interview Skills with AI',
  description: 'Experience realistic voice and video interviews powered by advanced AI. Get instant feedback, improve your performance, and land your dream job with confidence.',
  keywords: 'AI interview, interview preparation, voice interview, video interview, job interview practice, AI interviewer',
  openGraph: {
    title: 'PrepAI - Master Your Interview Skills with AI',
    description: 'Experience realistic voice and video interviews powered by advanced AI. Get instant feedback, improve your performance, and land your dream job with confidence.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}