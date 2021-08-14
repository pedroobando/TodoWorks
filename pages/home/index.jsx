import React, { useContext } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useMutation, useQuery } from '@apollo/client';
import Layout from '../../components/Layout';
import Spinner from '../../components/Spinner';
import TodoContext from '../../context/TodoContext';
import { ACTUALIZAR_TAREA_COMPLETE, OBTENER_TAREAS } from '../../graphql/dslgql';
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

  const [updateTodoComplete] = useMutation(ACTUALIZAR_TAREA_COMPLETE);

  const handleCloseTodo = async (todoId, { target }) => {
    try {
      const { data } = await updateTodoComplete({
        variables: {
          upTodoCompleteId: todoId,
          upTodoComplete: target.checked,
        },
      });
    } catch (error) {
      const { message } = error;
      Swal.fire('Error', message, 'error');
    }
  };

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
        <title>Dashboard | TodoWork</title>
      </Head>
      <Layout>
        <title className="flex justify-end items-baseline">
          <h1 className="text-2xl text-gray-600 font-semibold uppercase mr-4">
            Mis Tareas
          </h1>
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
                      >
                        Terminar
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {listaDeTareas.map((todo, idx) => (
                      <TodoDetail
                        todo={todo}
                        key={idx}
                        handleCloseTodo={handleCloseTodo}
                        userActive={activeUser.email}
                      />
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
