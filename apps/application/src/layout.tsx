import {Outlet} from '@tanstack/react-router';
import {TanStackRouterDevtools} from '@tanstack/react-router-devtools';
import {useState} from 'react';
import {Gnb} from '@components';

const Layout = () => {
  const [open, setOpen] = useState(true);
  return (
    <>
      <Gnb open={open} />
      <button
        onClick={() => setOpen(!open)}
        className="
            fixed top-2 left-4 z-50
            shadow
            bg-slate-200 text-slate-800
            dark:bg-slate-700 dark:text-slate-100
            transition-colors
            rounded-md
            py-1 px-2
          ">
        {open ? '✕' : '☰'}
      </button>
      <main
        className="
          ml-[12rem]     /* 최소 폭(12 rem) */
          sm:ml-56       /* 14 rem */
          md:ml-64       /* 16 rem */
          min-h-screen p-6
        ">
        <Outlet />
      </main>
      <TanStackRouterDevtools />
    </>
  );
};

export default Layout;
