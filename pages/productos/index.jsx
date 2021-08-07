import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import Layout from '../../components/Layout';
import Spinner from '../../components/Spinner';
import ProductCard from './ProductCard';
import { OBTENER_PRODUCTOS } from '../../graphql/dslgql';

const Index = () => {
  const router = useRouter();
  const {
    data: dataProductos,
    loading: obtenerProductosLoading,
    error: obtenerProductosError,
  } = useQuery(OBTENER_PRODUCTOS);

  if (obtenerProductosLoading) return <Spinner />;

  if (obtenerProductosError)
    return (
      <Layout>
        <h1>Problemas la llamada al origen de datos</h1>
      </Layout>
    );

  const editProduct = (id) => {
    console.log(id);
  };

  const removeProduct = (id) => {
    console.log(id);
  };

  const { getProducts: listaDeProductos } = dataProductos;

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
            product={product}
            handleEdit={() => editProduct(product.id)}
            handleRemove={() => removeProduct(product.id)}
          />
        ))}
      </div>
    </Layout>
  );
};

export default Index;
