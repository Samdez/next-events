'use client';
import Link from 'next/link';
import HomeIcon from './ui/icons/home';
import { SignInButton, SignUpButton, UserButton, useUser } from '@clerk/nextjs';
import { Button } from './ui/button';

function Navbar() {
  const { isSignedIn } = useUser();

  return (
    <div className='fixed top-0 z-10 flex h-32 w-full items-center border-b border-gray-200 bg-white bg-opacity-30 text-primary backdrop-blur-lg backdrop-filter'>
      <div className='flex w-64 items-center justify-center px-8'>
        <Link href={'/'}>
          <HomeIcon />
        </Link>
      </div>
      <h1 className='w-10/12 text-center text-5xl font-bold'>
        <Link href={'/'}>Goazen!</Link>
      </h1>
      <div className='flex w-64 items-center justify-center px-8'>
        {isSignedIn ? (
          <UserButton afterSignOutUrl='/' />
        ) : (
          <div>
            <SignInButton>
              <Button>Me connecter</Button>
            </SignInButton>
            {/* &nbsp;
            <SignUpButton>
              <Button className='w-32'>Sign Up</Button>
            </SignUpButton> */}
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
