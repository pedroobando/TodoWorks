import React, { useContext, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useQuery, useMutation } from '@apollo/client';
import Layout from '../../components/Layout';
import Spinner from '../../components/Spinner';
import TodoContext from '../../context/TodoContext';
import { ELIMINAR_TAREA, OBTENER_TAREAS } from '../../graphql/dslgql';
import Swal from 'sweetalert2';
import TodoDetail from './TodoDetail';

const Index = () => {
  const router = useRouter();
  const [outTodoId, setOutTodoId] = useState(null);
  const { activeUser } = useContext(TodoContext);

  const {
    data: dataTareas,
    loading: obtenerTareasLoading,
    error: obtenerTareasError,
  } = useQuery(OBTENER_TAREAS);

  const [removeTodo] = useMutation(ELIMINAR_TAREA, {
    update(cache) {
      const { getTodos } = cache.readQuery({
        query: OBTENER_TAREAS,
      });
      cache.writeQuery({
        query: OBTENER_TAREAS,
        data: {
          getTodos: getTodos.filter((ItemHere) => ItemHere.id !== outTodoId),
        },
      });
    },
  });

  const handleDeleteTarea = (todoId, todoName) => {
    Swal.fire({
      title: `Deseas eliminar - ${todoName}.?`,
      text: 'Esta accion no podra revertirse..!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'Cancelar',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          setOutTodoId(todoId);
          const { data } = await removeTodo({
            variables: {
              removeTodoId: todoId,
            },
          });
          Swal.fire(`${data.removeTodo}`, `Tarea ${todoName} fue eliminado`, 'success');
        } catch (error) {
          const { message } = error;
          Swal.fire('Error', `${message}`, 'error');
        }
      }
    });
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
