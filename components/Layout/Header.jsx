import React from 'react';
import { useRouter } from 'next/router';

const Header = () => {
  const router = useRouter();
  const handleClose = () => {
    localStorage.removeItem('token');
    router.replace('/login');
  };

  return (
    <div className="flex shadow-sm bg-gray-50 p-2 justify-between items-baseline shadow">
      <div className="flex space-x-3">
        <p className="text-gray-400">Adress </p>
        <p>0xc14D1bdD7A28b12fa3e88FE2bE9e193Bdfdlk8bb940A6</p>
      </div>
      <div className="flex space-x-4 text-gray-400 mr-3">
        <button
          onClick={handleClose}
          className="bg-gray-light border py-2 px-4 rounded inline-flex items-center text-xs uppercase hover:bg-gray-100 hover:border-gray-400"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
          Close
        </button>
      </div>
    </div>
  );
};

export default Header;
