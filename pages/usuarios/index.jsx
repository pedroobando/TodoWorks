import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { gql, useQuery } from '@apollo/client';
import Layout from '../../components/Layout';
import Spinner from '../../components/Spinner';
import UsuarioItem from './UsuarioItem';
import { OBTENER_USUARIOS } from '../../graphql/dslgql';

const index = () => {
  const router = useRouter();

  const {
    data,
    loading: obtenerUsuariosLoading,
    error: obtenerUsuariosError,
  } = useQuery(OBTENER_USUARIOS);

  // console.log(obtenerUsuariosLoading);
  // console.log(obtenerUsuariosError);
  // console.log(data);

  // const rrr = JSON.stringify(obtenerUsuariosError);
  if (obtenerUsuariosLoading) return <Spinner loading={obtenerUsuariosLoading} />;

  if (
    obtenerUsuariosError &&
    obtenerUsuariosError.graphQLErrors[0].extensions.code == 'UNAUTHENTICATED'
  ) {
    router.push('/login');
    return <div></div>;

    // const typeError = obtenerUsuariosError.graphQLErrors[0].extensions.code;
    // if (typeError == 'UNAUTHENTICATED') router.push('/login');
  }
  if (obtenerUsuariosError) return <h1>Problemas la llamada al origen de datos</h1>;

  return (
    <Layout>
      <h1 className="text-2xl text-gray-800 font-light">Usuarios</h1>
      <Link href="/usuarios/nuevo">
        <a className="py-2 px-5 mt-3 inline-block text-blue-800 rounded text-sm border hover:bg-gray-200 mb-3 uppercase font-bold w-full lg:w-auto text-center">
          Nuevo Usuario
        </a>
      </Link>
      <div className="overflow-x-scroll">
        <table className="table-auto shadow-md mt-10 w-full w-lg">
          <thead className="bg-gray-800">
            <tr className="text-white">
              <th className="w-1/5 py-2">Nombre</th>
              <th className="w-1/5 py-2">Email</th>
              <th className="w-1/5 py-2">Creado</th>
              <th className="w-1/5 py-2"></th>
              <th className="w-1/5 py-2"></th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {data.getUsers.map((user, idx) => (
              <UsuarioItem usuario={user} key={idx} />
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default index;
