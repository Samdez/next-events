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
    <div className='flex h-32 w-full items-center justify-around border-b border-gray-200 bg-secondary text-primary backdrop-blur-lg backdrop-filter '>
      <Link href={'/'} onClick={() => setActivePage('/')}>
        <div
          className={cn(
            'flex h-8 w-32 items-center justify-center rounded-full px-8 transition-colors hover:bg-primary hover:text-secondary',
            {
              'bg-primary text-secondary': activePage === '/',
            }
          )}
        >
          <HomeIcon />
        </div>
      </Link>
      <Link href={'/favorites'} onClick={() => setActivePage('favorites')}>
        <div
          className={cn(
            'flex h-8 w-64 items-center justify-center rounded-xl px-8 transition-colors hover:bg-primary hover:text-secondary',
            {
              'bg-primary text-secondary': activePage === 'favorites',
            }
          )}
        >
          <p>Mes favoris</p>
        </div>
      </Link>
      <Link href={'/'} onClick={() => setActivePage('/')}>
        <h1 className='w-10/12 text-center text-5xl font-bold'>Goazen!</h1>
      </Link>
      <div className='flex w-64 items-center justify-center px-8'>
        {isSignedIn ? (
          <UserButton afterSignOutUrl='/' />
        ) : (
          <div>
            <SignInButton>
              <Button>Me connecter</Button>
            </SignInButton>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
