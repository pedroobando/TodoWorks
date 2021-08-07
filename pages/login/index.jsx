/* eslint-disable react-hooks/rules-of-hooks */
import { useContext } from 'react';
import TodoContext from '../../context/TodoContext';

import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { useMutation } from '@apollo/client';
import { AUTENTICAR_USUARIO } from '../../graphql/dslgql';

import Swal from 'sweetalert2';

const index = () => {
  const router = useRouter();
  const [authenticateUser] = useMutation(AUTENTICAR_USUARIO);

  const { loginUser } = useContext(TodoContext);

  const handleRegister = () => {
    router.push('/login/register');
  };

  const handleLostPassword = () => {
    router.push('/login/lostpassword');
  };

  const handleBack = () => {
    router.replace('/');
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('El email no es valido')
        .required('El email es requerido'),
      password: Yup.string().required('El password es obligatorio'),
    }),
    onSubmit: async (values) => {
      const { email, password } = values;
      try {
        // console.log(email, password);
        const { data } = await authenticateUser({
          variables: {
            'authenticateUserInput': {
              email,
              password,
            },
          },
        });

        const { token } = data.authenticateUser;
        loginUser(token);
        router.push('/');
      } catch (error) {
        const { message } = error;
        console.log(message);
        Swal.fire('Error', message, 'error');
      }
    },
  });

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center sm:py-12">
      <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
        <h1 className="font-bold text-center text-2xl mb-5">Your Logo</h1>
        <div className="bg-white shadow w-full rounded-lg divide-y divide-gray-200">
          <form className="px-5 py-7" onSubmit={formik.handleSubmit}>
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
            <button
              type="submit"
              className="transition duration-200 bg-blue-500 hover:bg-blue-600 hover:shadows-md focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block focus:outline-none"
            >
              <span className="inline-block mr-2 uppercase">Login</span>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 inline-block"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </form>

          <div className="py-5">
            <div className="grid grid-cols-2 gap-1">
              <div className="text-center sm:text-left whitespace-nowrap">
                <button
                  className="transition duration-200 mx-5 px-4 py-2 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-100 hover:shadow-md focus:outline-none focus:bg-gray-200 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset"
                  onClick={handleLostPassword}
                >
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
                      d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="inline-block ml-1">Forgot Password</span>
                </button>
              </div>
              <div className="text-center sm:text-right whitespace-nowrap">
                <button
                  onClick={handleRegister}
                  className="transition duration-200 mx-5 px-4 py-2 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-100 hover:shadow-md focus:outline-none focus:bg-gray-200 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 inline-block align-text-top "
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"
                    />
                  </svg>

                  <span className="inline-block ml-1">Register</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="py-5">
          <div className="grid grid-cols-2 gap-1">
            <div className="text-center sm:text-left whitespace-nowrap">
              <button
                className="transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-200 focus:outline-none focus:bg-gray-300 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset"
                onClick={handleBack}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-4 h-4 inline-block align-text-top"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                <span className="inline-block ml-1">Back to your-app.com</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default index;
