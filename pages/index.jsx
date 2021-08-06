import { useContext } from 'react';
import TodoContext from '../context/TodoContext';
import Layout from '../components/Layout';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import { OBTENER_USUARIO } from '../graphql/dslgql';

const Home = () => {
  const router = useRouter();
  const { validUser } = useContext(TodoContext);

  const {
    data,
    loading: obtenerUsuarioLoading,
    error: obtenerUsuarioError,
  } = useQuery(OBTENER_USUARIO);

  if (obtenerUsuarioLoading) return <></>;

  if (
    obtenerUsuarioError &&
    obtenerUsuarioError.graphQLErrors[0].extensions.code == 'UNAUTHENTICATED'
  ) {
    router.push('/login');
    return <div></div>;
  }

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
