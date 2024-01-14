'use client';
import Link from 'next/link';
import HomeIcon from './ui/icons/home';
import { SignInButton, UserButton, useUser } from '@clerk/nextjs';
import { Button } from './ui/button';
import { useState } from 'react';
import { cn } from '@/lib/utils';

function Navbar() {
  const { isSignedIn } = useUser();
  const [activePage, setActivePage] = useState('/');

  return (
    <div className='fixed top-0 z-50 grid h-32 w-full grid-cols-6  items-center justify-end border-b-8 border-black bg-[#FFDCA8] text-black'>
      <div></div>
      <Link
        href={'/'}
        onClick={() => setActivePage('/')}
        className={cn(
          'flex h-full w-80 items-center justify-center text-4xl transition-colors hover:bg-black hover:text-[#FFDCA8]',
          {
            'bg-black text-[#FFDCA8]': activePage === '/',
          }
        )}
      >
        <h1 className='w-10/12 text-center text-8xl font-bold'>Goazen!</h1>
      </Link>
      <div></div>
      <Link
        href={'/favorites'}
        onClick={() => setActivePage('favorites')}
        className={cn(
          'flex h-full  items-center justify-center text-4xl transition-colors hover:bg-black hover:text-[#FFDCA8]',
          {
            'bg-black text-[#FFDCA8]': activePage === 'favorites',
          }
        )}
      >
        <p>Mes favoris</p>
      </Link>
      <Link
        href={'/calendar'}
        onClick={() => setActivePage('calendar')}
        className={cn(
          'flex h-full  items-center justify-center text-4xl transition-colors hover:bg-black hover:text-[#FFDCA8]',
          {
            'bg-black text-[#FFDCA8]': activePage === 'calendar',
          }
        )}
      >
        <p>Calendrier</p>
      </Link>
      <div className='flex w-64 items-center justify-center'>
        {isSignedIn ? (
          <UserButton afterSignOutUrl='/' />
        ) : (
          <div>
            <SignInButton>
              <Button
                className={`hover:bg-black[#E2B748] h-14 w-44 border-4 border-black bg-[#E2B748] text-2xl text-black hover:border-none hover:bg-black hover:text-[#E2B748]`}
              >
                Me connecter
              </Button>
            </SignInButton>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
