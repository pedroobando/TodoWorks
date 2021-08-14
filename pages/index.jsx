import { useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import TodoContext from '../context/TodoContext';
import Layout from '../components/Layout';

const Home = () => {
  const router = useRouter();
  const { validUser } = useContext(TodoContext);

  // useEffect(() => {
  //   if (!validUser()) {
  //     router.replace('/login');
  //     return <div></div>;
  //   }
  // }, []);

  return (
    <Layout>
      <div className="mt-10">
        <div className="ml-2">
          <button
            onClick={() => validUser()}
            className="border-2 border-blue-300 rounded px-4 py-2 text-sm hover:bg-blue-100"
          >
            Primary
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
