import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import './globals.css';
import Providers from '@/components/Providers';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-montserrat',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Circlechain - Save, Buy and Sell Your Blockchain Asset',
  description: 'The easy to manage and trade your cryptocurrency asset',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={montserrat.variable}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
