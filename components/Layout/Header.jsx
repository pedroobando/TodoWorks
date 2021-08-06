import { useContext } from 'react';
import { useRouter } from 'next/router';

import TodoContext from '../../context/TodoContext';

const Header = () => {
  const router = useRouter();
  const { logoutUser, activeUser } = useContext(TodoContext);

  const handleClose = () => {
    logoutUser();
    router.replace('/login');
  };

  const { email, name } = activeUser;

  return (
    <div className="flex bg-gray-50 px-2 py-2 justify-between items-baseline border-b">
      <div className="flex space-x-3 items-baseline">
        <p className="text-gray-600 font-semibold ">{name}</p>
        <p className="text-gray-400 font-light text-sm">{email}</p>
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
