import { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { useFormik } from 'formik';
import { useMutation, useQuery } from '@apollo/client';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import { NUEVA_TAREA, OBTENER_TAREAS } from '../../graphql/dslgql';

const initialValues = {
  product: '',
  amount: 0,
  userTo: '',
  description: '',
  complete: false,
};

const validationSchema = Yup.object({
  name: Yup.string().required('El nombre del producto es requerido'),
  description: Yup.string().required('La descripcion del producto es requerida'),
  amount: Yup.number()
    .min(0, 'Monto minimo del producto es 0')
    .max(999999999, 'Monto maximo es 999.999.999')
    .required('El monto del productos es requerido'),
});

const NuevaTarea = () => {
  const router = useRouter();

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
        <title>Tareas Nueva | TodoWork</title>
      </Head>
      <Layout></Layout>
    </>
  );
};

export default NuevaTarea;
