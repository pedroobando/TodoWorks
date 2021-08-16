/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import Spinner from '../../components/Spinner';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { useFormik } from 'formik';
import { useMutation, useQuery } from '@apollo/client';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import Select from 'react-select';

import TodoContext from '../../context/TodoContext';

import {
  NUEVA_TAREA,
  OBTENER_TAREAS,
  OBTENER_PRODUCTOS,
  OBTENER_USUARIOS,
} from '../../graphql/dslgql';

const initialValues = {
  product: '',
  amount: 0,
  userTo: '',
  description: '',
  complete: false,
};

const validationSchema = Yup.object({
  description: Yup.string().required('La descripcion de la tarea es requerida'),
  amount: Yup.number()
    .min(0, 'Monto minimo del producto es 0')
    .max(999999999, 'Monto maximo es 999.999.999')
    .required('El monto del productos es requerido'),
});

const selectInitialState = {
  product: '',
  userTo: '',
};

const NuevaTarea = () => {
  const router = useRouter();
  const { activeUser } = useContext(TodoContext);
  const [selectState, setSelectState] = useState(selectInitialState);
  const [listUsuarios, setListUsuarios] = useState([]);

  const {
    data: dataProductos,
    loading: obtenerProductLoading,
    error: obtenerProductosError,
  } = useQuery(OBTENER_PRODUCTOS);

  const {
    data: dataUsuarios,
    loading: obtenerUsuariosLoading,
    error: obtenerUsuariosError,
  } = useQuery(OBTENER_USUARIOS);

  const [newTodo] = useMutation(NUEVA_TAREA, {
    update: (cache, { data: { newTodo } }) => {
      const { getTodos } = cache.readQuery({
        query: OBTENER_TAREAS,
      });
      cache.writeQuery({
        query: OBTENER_TAREAS,
        data: { getTodos: [...getTodos, newTodo] },
      });
    },
  });

  useEffect(() => {
    if (!obtenerUsuariosLoading) {
      setListUsuarios(
        dataUsuarios.getUsers.filter((user) => user.email !== activeUser.email)
      );
    }
  }, [obtenerUsuariosLoading]);

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      const { description, amount } = values;
      const { product, userTo } = selectState;
      try {
        const { data } = await newTodo({
          variables: {
            newTodoInput: {
              product,
              description,
              amount,
              userTo,
            },
          },
        });

        const {
          newTodo: { description: nombreTarea },
        } = data;
        Swal.fire(
          'Tarea creada',
          `${nombreTarea}, se registro correctamente `,
          'success'
        );
        router.push('/tareas');
      } catch (error) {
        const { message } = error;
        Swal.fire('Error', `${message}`, 'error');
      }
    },
  });

  if (obtenerProductLoading || obtenerUsuariosLoading) return <Spinner />;

  if (obtenerProductosError || obtenerUsuariosError)
    return (
      <Layout>
        <h1>Problemas con la conexion</h1>
      </Layout>
    );

  const handleSelectProducto = ({ id }) => {
    setSelectState((lstate) => ({ ...lstate, product: id }));
  };

  const handleSelectUsuario = ({ id }) => {
    setSelectState((lstate) => ({ ...lstate, userTo: id }));
  };

  const { getProducts: listaDeProductos } = dataProductos;

  return (
    <>
      <Head>
        <title>Tareas Nueva | TodoWork</title>
      </Head>
      <Layout>
        <div className="min-h-screen flex justify-center sm:py-12">
          <div className="w-full md:w-2/3 ">
            <h1 className="font-bold text-center text-2xl mb-5 uppercase text-gray-600">
              Nueva Tarea
            </h1>
            <div className="bg-white shadow w-full rounded-lg divide-y divide-gray-200">
              <form className="px-5 py-7" onSubmit={formik.handleSubmit}>
                <div className="mb-6">
                  <label
                    htmlFor="description"
                    className="font-semibold text-sm text-gray-600 pb-1 block"
                  >
                    Description
                  </label>
                  <input
                    id="description"
                    type="text"
                    className="shadow appearance-none border border-transparent rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:shadow-outline"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.description && formik.errors.description && (
                    <div className="mb-2 mt-1 bg-red-50 border-l-4 border-red-500 text-red-700 px-4 py-2">
                      <p className="text-sm">{formik.errors.description}</p>
                    </div>
                  )}
                </div>

                <div className="mb-6">
                  <label
                    htmlFor="selectProduct"
                    className="font-semibold text-sm text-gray-600 pb-1 block"
                  >
                    Producto
                  </label>
                  <Select
                    id="selectProducto"
                    options={listaDeProductos}
                    // value={formik.values.product}
                    // onChange={formik.handleChange}
                    onChange={(option) => handleSelectProducto(option)}
                    getOptionValue={(productos) => productos.id}
                    getOptionLabel={(productos) => productos.name}
                    placeholder="Selecciones productos"
                    noOptionsMessage={() => 'No hay resultados'}
                  />

                  {/* {formik.touched.product && formik.errors.product && (
                    <div className="mb-2 mt-1 bg-red-50 border-l-4 border-red-500 text-red-700 px-4 py-2">
                      <p className="text-sm">{formik.errors.product}</p>
                    </div>
                  )} */}
                </div>

                <div className="mb-6">
                  <label
                    htmlFor="amount"
                    className="font-semibold text-sm text-gray-600 pb-1 block"
                  >
                    Monto
                  </label>
                  <input
                    id="amount"
                    type="number"
                    className="shadow appearance-none border border-transparent rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:shadow-outline"
                    value={formik.values.amount}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.amount && formik.errors.amount && (
                    <div className="mb-2 mt-1 bg-red-50 border-l-4 border-red-500 text-red-700 px-4 py-2">
                      <p className="text-sm">{formik.errors.amount}</p>
                    </div>
                  )}
                </div>

                <div className="mb-6">
                  <label
                    htmlFor="selectUser"
                    className="font-semibold text-sm text-gray-600 pb-1 block"
                  >
                    Asignado a:
                  </label>
                  <Select
                    id="selectUser"
                    options={listUsuarios}
                    onChange={(option) => handleSelectUsuario(option)}
                    getOptionValue={(usuario) => usuario.id}
                    getOptionLabel={(usuario) => usuario.name}
                    placeholder="Seleccione el usuario"
                    noOptionsMessage={() => 'No hay resultados'}
                  />
                </div>

                <button
                  type="submit"
                  className="transition duration-200 bg-blue-500 hover:bg-blue-600 hover:shadows-md focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
                >
                  <span className="inline-block mr-2 uppercase">Guardar</span>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 inline-block"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                    />
                  </svg>
                </button>
              </form>

              <div className="py-5">
                <div className="grid grid-cols-2 gap-1">
                  <div className="text-center sm:text-left whitespace-nowrap">
                    <Link href="/tareas">
                      <a className="transition duration-200 mx-5 px-4 py-2 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-100 hover:shadow-md focus:outline-none focus:bg-gray-200 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 inline-block align-text-top"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 19l-7-7m0 0l7-7m-7 7h18"
                          />
                        </svg>

                        <span className="inline-block ml-1">Volver</span>
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default NuevaTarea;
