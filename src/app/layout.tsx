import Navbar from '@/components/Navbar';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import './globals.css';
import type { Metadata } from 'next';
import { Inter, Bebas_Neue, Public_Sans } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import { ReactQueryProvider } from './ReactQueryProvider';
import NextTopLoader from 'nextjs-toploader';
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({ subsets: ['latin'] });
const bebas = Bebas_Neue({ weight: '400', subsets: ['latin'] });
const publicSans = Public_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://goazen.info'),
  title: 'Goazen!',
  description:
    'Tous les concerts du Pays Basque et des Landes: retrouvez tous les concerts et DJ sets rock, rap, electro, reggae, etc... sur Biarritz, Bayonne, Anglet, Capbreton, Hossegor et bien plus encore!',
  verification: {
    google:
      'google-site-verification=6jGooaqWsLT2O6T3V0y_9X4eEoscVIdHlIGGj-7e6QM',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <ReactQueryProvider>
        <html lang='fr'>
          <body className={bebas.className}>
            <Navbar />
            <main className='mt-[14vh] min-h-screen bg-[#FFDCA8] pt-4'>
              <NextTopLoader color='#ee2244bc' showSpinner={false} />
              {children}
              <Analytics />
              <SpeedInsights />
            </main>
            <Toaster />
          </body>
        </html>
      </ReactQueryProvider>
    </ClerkProvider>
  );
}
