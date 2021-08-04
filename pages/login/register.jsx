import Layout from '../../components/Layout';
import { useRouter } from 'next/router';
import Link from 'next/link';
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

const register = ({ title = 'Registro Usuario', backHref = '/login' }) => {
  const router = useRouter();
  const [newUser] = useMutation(NUEVO_USUARIO);
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      const { name, email, password } = values;
      try {
        const { data } = await newUser({
          variables: {
            input: {
              name,
              email,
              password,
            },
          },
        });
        Swal.fire(
          'Usuario Creado',
          `Usuario ${name} se ingreso correctamente`,
          'success'
        );
        router.push(backHref);
      } catch (error) {
        const { message } = error;
        Swal.fire('Error', `${message}`, 'error');
      }
    },
  });

  return (
    <div className="min-h-screen flex justify-center sm:py-12">
      <div className="w-full md:w-2/3 xl:w-1/3">
        <h1 className="font-bold text-center text-2xl mb-5 uppercase text-gray-600">
          {title}
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
                htmlFor="email"
                className="font-semibold text-sm text-gray-600 pb-1 block"
              >
                E-mail
              </label>
              <input
                id="email"
                type="email"
                className="shadow appearance-none border border-transparent rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:shadow-outline"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.email && formik.errors.email && (
                <div className="mb-2 mt-1 bg-red-50 border-l-4 border-red-500 text-red-700 px-4 py-2">
                  <p className="text-sm">{formik.errors.email}</p>
                </div>
              )}
            </div>

            <div className="mb-6">
              <label
                htmlFor="password"
                className="font-semibold text-sm text-gray-600 pb-1 block"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                className="shadow appearance-none border border-transparent rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:shadow-outline"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.password && formik.errors.password && (
                <div className="mb-2 mt-1 bg-red-50 border-l-4 border-red-500 text-red-700 px-4 py-2">
                  <p className="text-sm">{formik.errors.password}</p>
                </div>
              )}
            </div>

            <div className="mb-6">
              <label
                htmlFor="confirmPassword"
                className="font-semibold text-sm text-gray-600 pb-1 block"
              >
                Confirmar Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                className="shadow appearance-none border border-transparent rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:shadow-outline"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                <div className="mb-2 mt-1 bg-red-50 border-l-4 border-red-500 text-red-700 px-4 py-2">
                  <p className="text-sm">{formik.errors.confirmPassword}</p>
                </div>
              )}
            </div>

            <button
              type="submit"
              className="transition duration-200 bg-blue-500 hover:bg-blue-600 hover:shadows-md focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
            >
              <span className="inline-block mr-2 uppercase">{title}</span>

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
                <Link href={`${backHref}`}>
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
  );
};

export default register;
