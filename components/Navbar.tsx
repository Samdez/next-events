import Link from 'next/link';
import HomeIcon from './ui/icons/home';
import UserIcon from './ui/icons/user';

function Navbar() {
  return (
    <div className='fixed top-0 z-10 flex h-32 w-full items-center border-b border-gray-200 bg-white bg-opacity-30 text-primary backdrop-blur-lg backdrop-filter'>
      <div className='w-32 px-8'>
        <Link href={'/'}>
          <HomeIcon />
        </Link>
      </div>
      <h1 className='w-10/12 text-center text-3xl font-bold'>
        <Link href={'/'}>Goazen!</Link>
      </h1>
      <div className='w-32 px-8'>
        <UserIcon />
      </div>
    </div>
  );
}

export default Navbar;
