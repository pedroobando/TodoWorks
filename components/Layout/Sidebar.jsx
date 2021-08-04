import React from 'react';
import SidebarMenu from './SidebarMenu';

const menuPrincipal = [
  { pathname: '/', name: 'Dasboard' },
  { pathname: '/tareas', name: 'Tareas' },
  { pathname: '/productos', name: 'Productos' },
  { pathname: '/trabajos', name: 'Trabajos' },
];

const menuSetting = [
  { pathname: '/usuarios', name: 'Usuarios' },
  { pathname: '/configuracion', name: 'Configuracion' },
];

const Sidebar = () => {
  return (
    <aside className="bg-gray-50 sm:w-1/3 md:w-1/5 sm:min-h-screen border-r">
      <div className="border-b pt-3 pb-2 flex justify-around items-baseline">
        <p className="text-xl font-bold">TodoWork</p>
        <p>|</p>
        <p className="text-gray-400 text-lg">wallet</p>
      </div>

      <SidebarMenu menuTitle={'Titulo Menu'} menuList={menuPrincipal} />
      <SidebarMenu menuTitle={'Setting'} menuList={menuSetting} />
    </aside>
  );
};

export default Sidebar;
