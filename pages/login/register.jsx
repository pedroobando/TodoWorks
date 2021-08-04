import Layout from '../../components/Layout';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import { useMutation, gql } from '@apollo/client';
import * as Yup from 'yup';
import Swal from 'sweetalert2';

import { NUEVO_USUARIO } from '../../graphql/dslgql';

const initialValues = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const validationSchema = Yup.object({
  name: Yup.string().required('El nombre del usuario es requerido'),
  email: Yup.string().email('Email no es valido').required('El email es obligatorio'),
  password: Yup.string().required('El password es obligatorio'),
  confirmPassword: Yup.string()
    .required('El password de confirmacion es requerido')
    .oneOf([Yup.ref('password'), null], 'Las contraseñas deben coincidir'),
});

const register = () => {
  const router = useRouter();
  const [nuevoUsuario] = useMutation(NUEVO_USUARIO);
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      const { nombre, apellido, email, password } = values;
      try {
        const { data } = await nuevoUsuario({
          variables: {
            usuario: {
              nombre,
              apellido,
              email,
              password,
            },
          },
        });
        Swal.fire(
          'Usuario Creado',
          `Usuario ${nombre} ${apellido}, se ingreso correctamente`,
          'success'
        );
        router.push('/login');
      } catch (error) {
        const { message } = error;
        Swal.fire('Error', `${message}`, 'error');
      }
    },
  });

  return (
    <Layout>
      <div className="min-h-screen bg-gray-100 flex flex-col justify-center sm:py-12"></div>
    </Layout>
  );
};

export default register;
