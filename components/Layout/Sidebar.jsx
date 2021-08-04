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
    <aside className="bg-gray-50 md:w-3/12 w-6/12 h-screen shadow">
      <div className="border-b py-3 mt-1 flex justify-around">
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
