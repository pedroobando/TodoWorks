/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '../../../components/Layout';
import Spinner from '../../../components/Spinner';

import { useQuery, useMutation } from '@apollo/client';
import {
  OBTENER_PRODUCTO,
  ACTUALIZAR_PRODUCTO,
  OBTENER_HASHTAGSPRODUCTO,
} from '../../../graphql/dslgql';

import CreatableSelect from 'react-select/creatable';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';

const EditProduct = () => {
  const router = useRouter();
  const {
    query: { pid: productoId },
  } = router;

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

  const {
    data: dataProducto,
    loading: obtenerProductoLoading,
    error: obtenerProductoError,
  } = useQuery(OBTENER_PRODUCTO, { variables: { getProductId: productoId } });

  const [updateProduct] = useMutation(ACTUALIZAR_PRODUCTO);

  useEffect(() => {
    if (!obtenerProductoLoading) {
      const _selHashTags = dataProducto.getProduct.hashtags.map((tag) => ({
        value: tag,
        label: tag,
      }));
      setSelHashTags([..._selHashTags]);
    }
  }, [obtenerProductoLoading]);

  const schemaValidacion = Yup.object({
    name: Yup.string().required('El nombre del producto es requerido'),
    description: Yup.string().required('La descripcion del producto es requerida'),
    amount: Yup.number()
      .min(0, 'Monto minimo del producto es 0')
      .max(999999999, 'Monto maximo es 999.999.999')
      .required('El monto del productos es requerido'),
  });

  const handleSubmitProduct = async (values) => {
    try {
      const { name, description, amount } = values;
      const hashtags = selHashTags.map((tag) => tag.value.toString().trim());
      const { data } = await updateProduct({
        variables: {
          updateProductId: productoId,
          updateProductInput: {
            name,
            description,
            amount,
            hashtags,
          },
        },
      });

      Swal.fire('Actualizado', `${name} se actualizo correctamente`, 'success');
      router.push('/productos');
    } catch (error) {
      const { message } = error;
      Swal.fire('Error', message, 'error');
    }
  };

  const handleChange = (newValue, actionMeta) => {
    setSelHashTags([...newValue]);
  };

  // console.log(obtenerProductoError);
  // console.log(obtenerProductoLoading);
  // console.log(dataProducto.getProduct);

  if (obtenerProductoLoading)
    return (
      <Layout>
        <Spinner />
      </Layout>
    );

  if (
    obtenerProductoError &&
    obtenerProductoError.graphQLErrors[0].extensions.code == 'UNAUTHENTICATED'
  ) {
    router.push('/login');
    return <div></div>;
  }

  if (obtenerProductoError)
    return (
      <Layout>
        <h1>Problemas la llamada al origen de datos</h1>
      </Layout>
    );

  const { getProduct } = dataProducto;

  return (
    <Layout>
      <div className="min-h-screen flex justify-center sm:py-12">
        <div className="w-full md:w-2/3 ">
          <h1 className="font-bold text-center text-2xl mb-5 uppercase text-gray-600">
            Modificar Producto
          </h1>
          <div className="bg-white shadow w-full rounded-lg divide-y divide-gray-200">
            <Formik
              validationSchema={schemaValidacion}
              enableReinitialize
              initialValues={getProduct}
              onSubmit={handleSubmitProduct}
            >
              {(props) => {
                // console.log(props);
                return (
                  <form className="px-5 py-7" onSubmit={props.handleSubmit}>
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
                        value={props.values.name}
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                      />
                      {props.touched.name && props.errors.name && (
                        <div className="mb-2 mt-1 bg-red-50 border-l-4 border-red-500 text-red-700 px-4 py-2">
                          <p className="text-sm">{props.errors.name}</p>
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
                        value={props.values.description}
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                      />
                      {props.touched.description && props.errors.description && (
                        <div className="mb-2 mt-1 bg-red-50 border-l-4 border-red-500 text-red-700 px-4 py-2">
                          <p className="text-sm">{props.errors.description}</p>
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
                        value={props.values.amount}
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                      />
                      {props.touched.amount && props.errors.amount && (
                        <div className="mb-2 mt-1 bg-red-50 border-l-4 border-red-500 text-red-700 px-4 py-2">
                          <p className="text-sm">{props.errors.amount}</p>
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
                        value={selHashTags}
                        options={listHashTags}
                        onChange={handleChange}
                        placeholder="Caracteristicas"
                        noOptionsMessage={() => 'No hay resultados'}
                      />
                    </div>

                    <div className="flex content-between justify-between items-center">
                      <Link href="/productos">
                        <a className="transition duration-200 px-4 py-2 border uppercase text-gray-700 font-semibold shadow-sm rounded-lg inline-block hover:bg-gray-300 hover:shadows-md hover:shadow-md">
                          Cancelar
                        </a>
                      </Link>

                      <button
                        type="submit"
                        className="transition duration-200 px-4 py-2 bg-blue-500 hover:bg-blue-600 hover:shadows-md focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
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
                    </div>
                  </form>
                );
              }}
            </Formik>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EditProduct;

// <button
// className="mb-2 border border-red-400 font-bold text-base rounded px-4 py-1 m-4 uppercase"
// onClick={() => {
//   fetch('/api/login', {
//     method: 'post',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({ token: 'ABCDEFG' }),
//   });
// }}
// >
// Login
// </button>
// <button
// className="mb-2 border-2 border-blue-400 font-bold text-base rounded px-4 py-1 m-4 uppercase hover:bg-blue-100"
// onClick={() => {
//   fetch('/api/logout', {
//     method: 'post',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   });
// }}
// >
// Logout
// </button>
