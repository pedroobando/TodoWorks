import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

const index = ({ children }) => {
  return (
    <div className="flex w-screen h-screen">
      <Sidebar />
      <div className="w-screen">
        <Header />
        <div className="my-4 mx-2">{children}</div>
      </div>
    </div>
  );
};

export default index;
