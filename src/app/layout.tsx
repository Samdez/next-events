import Navbar from '@/components/Navbar';
import './globals.css';
import type { Metadata } from 'next';
import { Inter, Bebas_Neue, Public_Sans } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import { ReactQueryProvider } from './ReactQueryProvider';

const inter = Inter({ subsets: ['latin'] });
const bebas = Bebas_Neue({ weight: '400', subsets: ['latin'] });
const publicSans = Public_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Goazen!',
  description: "L'agenda des concerts au Pays Basque",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <ReactQueryProvider>
        <html lang='en'>
          <body className={bebas.className}>
            <Navbar />
            <main className='mt-[14vh] min-h-screen bg-[#FFDCA8] p-4'>
              {children}
            </main>
          </body>
        </html>
      </ReactQueryProvider>
    </ClerkProvider>
  );
}
