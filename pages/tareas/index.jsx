import React, { useContext, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useQuery, useMutation } from '@apollo/client';
import Layout from '../../components/Layout';
import Spinner from '../../components/Spinner';
import TodoContext from '../../context/TodoContext';
import { OBTENER_TAREAS } from '../../graphql/dslgql';
import Swal from 'sweetalert2';
import TodoDetail from './TodoDetail';

const Index = () => {
  const router = useRouter();
  const { activeUser } = useContext(TodoContext);

  const {
    data: dataTareas,
    loading: obtenerTareasLoading,
    error: obtenerTareasError,
  } = useQuery(OBTENER_TAREAS);

  if (obtenerTareasLoading) return <Spinner />;

  if (obtenerTareasError)
    return (
      <Layout>
        <h1>Problemas con la conexion</h1>
      </Layout>
    );

  const { getTodos: listaDeTareas } = dataTareas;

  return (
    <>
      <Head>
        <title>Tareas | TodoWork</title>
      </Head>
      <Layout>
        <title className="flex justify-between items-baseline">
          <Link href="/tareas/nueva">
            <a className="py-2 px-5 text-blue-800 rounded text-sm border hover:bg-gray-200  uppercase font-bold w-full lg:w-auto text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 inline-block mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <span className="align-bottom">Nueva Tarea</span>
            </a>
          </Link>

          <h1 className="text-2xl text-gray-600 font-semibold uppercase mr-4">Tareas</h1>
        </title>

        <div className="flex flex-col mt-4">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Usuario
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Tarea
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Status
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Creación
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      ></th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {listaDeTareas.map((todo, idx) => (
                      <TodoDetail todo={todo} key={idx} />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Index;
