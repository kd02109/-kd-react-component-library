import {Link, useRouterState} from '@tanstack/react-router';
import {useState} from 'react';
import {ChevronDown, ChevronRight} from 'lucide-react';

interface GnbProps {
  open: boolean;
}

type LinkType = {
  links: string | {link: string; title: string}[];
  title: string;
};

const links: LinkType[] = [
  {links: '/', title: 'Home'},
  {
    links: [
      {link: '/accordion/vanilla', title: 'Vanilla'},
      {link: '/accordion/react', title: 'React'},
    ],
    title: 'Accordion',
  },
  {
    links: [
      {link: '/tab/vanilla', title: 'Vanilla'},
      {link: '/tab/react', title: 'React'},
    ],
    title: 'Tab',
  },
];

const isRoot = (link: LinkType['links']): link is string => typeof link === 'string';

const GnbItem = ({links, title}: LinkType) => {
  const pathname = useRouterState().location.pathname;

  // 브랜치라면, 자식 중 하나가 활성화되어 있을 때 기본으로 열림
  const initiallyOpen = !isRoot(links) && links.some((c) => pathname.startsWith(c.link));

  const [open, setOpen] = useState(initiallyOpen);

  if (isRoot(links)) {
    const active = pathname === links;

    return (
      <li>
        <Link
          to={links}
          className={`
            block rounded px-3 py-2
            hover:text-slate-300 dark:hover:text-slate-700
            ${active && 'text-blue-400 dark:text-amber-500'}
          `}>
          {title}
        </Link>
      </li>
    );
  } else {
    return (
      <li className="">
        <button
          onClick={() => setOpen(!open)}
          className="
          border-none
          cursor-pointer
          w-full flex items-center justify-between
          rounded px-3 py-2
          bg-transparent
          appearance-none
        ">
          <span>{title}</span>
          {open ? (
            <ChevronDown className="h-4 w-4 transition-transform" />
          ) : (
            <ChevronRight className="h-4 w-4 transition-transform" />
          )}
        </button>

        {/* 하위 목록 */}
        <ul
          className={`
          pl-4 space-y-1 overflow-hidden
          transition-[max-height] duration-300
          ${open ? 'max-h-96' : 'max-h-0'}
        `}>
          {links.map((child) => (
            <li key={child.link}>
              <Link
                to={child.link}
                className={`
                block rounded px-3 py-2
                hover:text-slate-300 dark:hover:text-slate-700
                ${pathname.startsWith(child.link) && 'text-blue-400 dark:text-amber-500'}
              `}>
                {child.title}
              </Link>
            </li>
          ))}
        </ul>
      </li>
    );
  }
};

const Gnb = ({open}: GnbProps) => {
  return (
    <aside
      className={`
        fixed inset-y-0 left-0 z-40
        min-w-[12rem] w-56 md:w-64
        bg-slate-100 text-slate-800
        dark:bg-slate-800 dark:text-slate-200
        shadow-md flex flex-col gap-2 p-4
        transform transition-transform duration-300
        ${open ? 'translate-x-0' : '-translate-x-full'}
      `}>
      <h1 className="text-2xl font-bold mb-2 mt-12">UI Components</h1>

      <ul className="space-y-1">
        {links.map((link) => (
          <GnbItem {...link} key={link.title} />
        ))}
      </ul>
    </aside>
  );
};

export default Gnb;
