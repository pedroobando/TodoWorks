import React, { useContext, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useQuery, useMutation } from '@apollo/client';
import Layout from '../../components/Layout';
import Spinner from '../../components/Spinner';
import ProductCard from './ProductCard';
import TodoContext from '../../context/TodoContext';
import { OBTENER_PRODUCTOS_USUARIO, ELIMINAR_PRODUCTO } from '../../graphql/dslgql';
import Swal from 'sweetalert2';

const Propios = () => {
  const router = useRouter();
  const { activeUser } = useContext(TodoContext);
  const [outProductId, setOutProductId] = useState(null);

  const {
    data: dataProductos,
    loading: obtenerProductosLoading,
    error: obtenerProductosError,
  } = useQuery(OBTENER_PRODUCTOS_USUARIO);

  const [
    removeProduct,
    { loading: eliminarProductoLoading, error: eliminarProductoError },
  ] = useMutation(ELIMINAR_PRODUCTO, {
    update(cache) {
      const { getProducts } = cache.readQuery({
        query: OBTENER_PRODUCTOS_USUARIO,
      });
      cache.writeQuery({
        query: OBTENER_PRODUCTOS_USUARIO,
        data: {
          getProducts: getProducts.filter((userHere) => userHere.id !== outProductId),
        },
      });
    },
  });

  if (obtenerProductosLoading) return <Spinner />;

  if (obtenerProductosError)
    return (
      <Layout>
        <h1>Problemas la llamada al origen de datos</h1>
      </Layout>
    );

  const editProduct = (id, name) => {
    const styleParam = name.toString().toLowerCase().replace(/\s/g, '-');
    router.push({
      pathname: '/productos/editar/[name]',
      query: { name: styleParam, pid: id },
    });
  };

  const removeProductId = (productId, productName) => {
    Swal.fire({
      title: `Deseas eliminar - ${productName}.?`,
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
          setOutProductId(productId);
          const { data } = await removeProduct({
            variables: {
              removeProductId: productId,
            },
          });
          Swal.fire(
            `${data.removeProduct}`,
            `El producto ${productName} fue eliminado`,
            'success'
          );
        } catch (error) {
          // console.log(error);
          const { message } = error;
          Swal.fire('Error', `${message}`, 'error');
        }
      }
    });
  };

  const { getProductsbyUser: listaDeProductos } = dataProductos;

  return (
    <Layout>
      <title className="flex justify-between items-baseline">
        <Link href="/productos/nuevo">
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
            <span className="align-bottom">Nuevo Producto</span>
          </a>
        </Link>
        <h1 className="text-2xl text-gray-600 font-semibold uppercase mr-4">
          Productos del Inventario
        </h1>
      </title>

      <div className="py-6 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5">
        {listaDeProductos.map((product, idx) => (
          <ProductCard
            key={idx}
            productName={product.name}
            productDescription={product.description}
            nameUser={product.user.name}
            emailUser={product.user.email}
            hashtags={product.hashtags}
            userActive={activeUser}
            product={product}
            handleEdit={() => editProduct(product.id, product.name)}
            handleRemove={() => removeProductId(product.id, product.name)}
          />
        ))}
      </div>
    </Layout>
  );
};

export default Propios;
