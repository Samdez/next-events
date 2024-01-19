'use client';
import Link from 'next/link';
import { SignInButton, UserButton, useUser } from '@clerk/nextjs';
import { Button } from './ui/button';
import { MouseEventHandler, useState } from 'react';
import { cn } from '@/lib/utils';
import Burger from './ui/icons/burger';

function Navbar() {
  const { isSignedIn } = useUser();
  const [activePage, setActivePage] = useState('/');
  const [isOpen, setIsOpen] = useState(false);

  function handleClickHome() {
    setActivePage('/');
    setIsOpen(false);
  }

  return (
    <>
      {<SideBar onClick={() => setIsOpen(false)} isOpen={isOpen} />}
      <div className='fixed top-0 z-50 grid h-[14vh] w-full grid-cols-4 border-b-8 border-black bg-black text-[#FFDCA8] md:hidden'>
        <Link
          href={'/'}
          onClick={handleClickHome}
          className={cn(
            'col-span-3 flex h-full items-center justify-center text-4xl transition-colors hover:bg-black hover:text-[#FFDCA8]',
            {
              'bg-black text-[#FFDCA8]': activePage === '/',
            }
          )}
        >
          <p className='w-10/12 text-center text-8xl font-bold'>Goazen!</p>
        </Link>
        <div
          className='flex w-full items-center justify-center'
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <div className='text-4xl'>X</div> : <Burger />}
        </div>
      </div>
      <div className='fixed top-0 z-50 hidden h-[14vh] w-full grid-cols-6 items-center  justify-end border-b-8 border-black bg-[#FFDCA8] text-black md:grid'>
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
        <NavLink
          href={'/favoris'}
          onClick={() => setActivePage('favorites')}
          activePage={activePage}
          pageName='favorites'
          text='mes favoris'
        />
        <NavLink
          href={'/agenda'}
          onClick={() => setActivePage('calendar')}
          activePage={activePage}
          pageName='calendar'
          text='Calendrier'
        />
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
    </>
  );
}

function NavLink({
  href,
  onClick,
  pageName,
  activePage,
  text,
}: {
  href: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
  pageName: string;
  activePage?: string;
  text: string;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        'flex h-full  items-center justify-center text-4xl transition-colors hover:bg-black hover:text-[#FFDCA8]',
        {
          'bg-black text-[#FFDCA8]': activePage === pageName,
        }
      )}
    >
      <p>{text}</p>
    </Link>
  );
}

function SideBar({
  onClick,
  isOpen,
}: {
  onClick: MouseEventHandler<HTMLAnchorElement>;
  isOpen: boolean;
}) {
  return (
    <div
      className={cn(
        'fixed right-0 z-50 flex min-h-[86vh] w-screen flex-col items-center justify-evenly bg-[#FFDCA8] py-2 text-black duration-300 ease-in-out sm:hidden',
        {
          'translate-x-0 ': isOpen,
          'translate-x-full': !isOpen,
        }
      )}
    >
      <NavLink
        href={'/favoris'}
        pageName='favorites'
        text='mes favoris'
        onClick={onClick}
      />
      <NavLink
        href={'/agenda'}
        pageName='calendar'
        text='Calendrier'
        onClick={onClick}
      />
    </div>
  );
}

export default Navbar;
