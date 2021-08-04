import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const SidebarMenu = ({ menuTitle, menuList }) => {
  const router = useRouter();
  return (
    <div>
      <nav className="ml-2 mt-5 pr-2">
        <h2 className="text-gray-400 text-xl">{menuTitle}</h2>
        <div className="mt-1 list-none">
          {menuList.map((itemMenu, idx) => (
            <li
              key={idx}
              className={
                router.pathname === itemMenu.pathname
                  ? 'bg-gray-300 rounded my-2'
                  : 'my-2'
              }
            >
              <Link href={itemMenu.pathname}>
                <a className="flex p-3 text-gray-700 space-x-4 rounded hover:bg-gray-200 hover:text-blue-600 cursor-pointer">
                  {itemMenu.name}
                </a>
              </Link>
            </li>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default SidebarMenu;
