import { useEffect, useContext, useState } from 'react';
import { useRouter } from 'next/router';
import TodoContext from '../../context/TodoContext';
import Header from './Header';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
  const router = useRouter();
  const [notShow, setNotShow] = useState(false);
  const { validUser } = useContext(TodoContext);

  useEffect(() => {
    if (!validUser()) {
      router.replace('/login');
    } else {
      setNotShow(true);
    }
  }, []);

  if (notShow) {
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
  } else {
    return <div></div>;
  }
};

export default Layout;
