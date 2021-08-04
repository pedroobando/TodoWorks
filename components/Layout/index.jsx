import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

const index = ({ children }) => {
  return (
    // flex w-screen h-screen
    <div className="sm:flex min-h-screen bg-gray-50">
      <Sidebar />
      {/* <div className="w-screen"> */}
      <main className="sm:w-2/3 md:w-4/5 sm:min-h-screen">
        <Header />
        {/* flex flex-col justify-center sm:py-12 */}
        <div className="p-2">{children}</div>
      </main>
    </div>
  );
};

export default index;
