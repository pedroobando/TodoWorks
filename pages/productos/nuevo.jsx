/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head';
import { useFormik } from 'formik';
import { useMutation, useQuery } from '@apollo/client';
import * as Yup from 'yup';
import Swal from 'sweetalert2';

import CreatableSelect from 'react-select/creatable';

import {
  NUEVO_PRODUCTO,
  OBTENER_HASHTAGSPRODUCTO,
  OBTENER_PRODUCTOS,
} from '../../graphql/dslgql';

const initialValues = {
  name: '',
  description: '',
  amount: 0,
  active: true,
};

const validationSchema = Yup.object({
  name: Yup.string().required('El nombre del producto es requerido'),
  description: Yup.string().required('La descripcion del producto es requerida'),
  amount: Yup.number()
    .min(0, 'Monto minimo del producto es 0')
    .max(999999999, 'Monto maximo es 999.999.999')
    .required('El monto del productos es requerido'),
});

const NuevoProducto = () => {
  const router = useRouter();
  const [selHashTags, setSelHashTags] = useState([]);
  const [listHashTags, setListHashTags] = useState([]);

  const {
    data: dataHashTags,
    loading: obtenerHashTagsLoading,
    error: obtenerHashTagsError,
  } = useQuery(OBTENER_HASHTAGSPRODUCTO);

  useEffect(() => {
    if (!obtenerHashTagsLoading) {
      const _listHashTags = dataHashTags.getProductHashTag.map((tag) => ({
        value: tag,
        label: tag,
      }));
      setListHashTags([..._listHashTags]);
    }
  }, [obtenerHashTagsLoading]);

  const [newProduct] = useMutation(NUEVO_PRODUCTO, {
    update: (cache, { data: { newProduct } }) => {
      const { getProducts } = cache.readQuery({
        query: OBTENER_PRODUCTOS,
      });
      cache.writeQuery({
        query: OBTENER_PRODUCTOS,
        data: { getProducts: [...getProducts, newProduct] },
      });
    },
  });

  const handleChange = (newValue, actionMeta) => {
    setSelHashTags([...newValue]);
    // console.log(selHashTags, actionMeta.action);
    // console.group('Value Changed');
    // console.log(newValue);
    // console.log(`action: ${actionMeta.action}`);
    // console.groupEnd();
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      const { name, description, amount } = values;
      const hashtags = selHashTags.map((tag) => tag.value.toString().trim());
      try {
        const { data } = await newProduct({
          variables: {
            newProductInput: {
              name,
              description,
              amount,
              hashtags,
            },
          },
        });
        Swal.fire('Producto Creado', `${name} se ingreso correctamente`, 'success');
        router.push('/productos');
      } catch (error) {
        console.log(error);
        const { message } = error;
        Swal.fire('Error', `${message}`, 'error');
      }
    },
  });

  return (
    <>
      <Head>
        <title>Productos Nuevo | TodoWork</title>
      </Head>
      <Layout>
        <div className="min-h-screen flex justify-center sm:py-12">
          <div className="w-full md:w-2/3 ">
            <h1 className="font-bold text-center text-2xl mb-5 uppercase text-gray-600">
              Nuevo Producto
            </h1>
            <div className="bg-white shadow w-full rounded-lg divide-y divide-gray-200">
              <form className="px-5 py-7" onSubmit={formik.handleSubmit}>
                <div className="mb-6">
                  <label
                    htmlFor="name"
                    className="font-semibold text-sm text-gray-600 pb-1 block"
                  >
                    Nombre
                  </label>
                  <input
                    id="name"
                    type="text"
                    className="shadow appearance-none border border-transparent rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:shadow-outline"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.name && formik.errors.name && (
                    <div className="mb-2 mt-1 bg-red-50 border-l-4 border-red-500 text-red-700 px-4 py-2">
                      <p className="text-sm">{formik.errors.name}</p>
                    </div>
                  )}
                </div>

                <div className="mb-6">
                  <label
                    htmlFor="description"
                    className="font-semibold text-sm text-gray-600 pb-1 block"
                  >
                    Descripcion
                  </label>
                  <textarea
                    id="description"
                    type="text"
                    className="shadow appearance-none border border-transparent rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:shadow-outline"
                    rows="3"
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
                    htmlFor="hashtag"
                    className="font-semibold text-sm text-gray-600 pb-1 block"
                  >
                    Caracteristicas
                  </label>
                  <CreatableSelect
                    id="hashtag"
                    isClearable
                    isMulti
                    options={listHashTags}
                    onChange={handleChange}
                    // value={formik.values.hashtags}
                    // onChange={formik.handleChange}
                    // onBlur={formik.handleBlur}
                    placeholder="Caracteristicas"
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

                <button
                  className=" w-full mt-4 text-blue-500 border-blue-500 border hover:bg-blue-100 text-white py-2.5 rounded-lg text-sm font-semibold text-center inline-block"
                  onClick={formik.resetForm}
                >
                  <span className="inline-block mr-2 uppercase">Limpiar datos</span>
                </button>
              </form>

              <div className="py-5">
                <div className="grid grid-cols-2 gap-1">
                  <div className="text-center sm:text-left whitespace-nowrap">
                    <Link href="/productos">
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

export default NuevoProducto;
