import { useRouter } from 'next/router';
import Link from 'next/link';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import Layout from '../../../components/Layout';
import Spinner from '../../../components/Spinner';
import { useQuery, useMutation } from '@apollo/client';
import { ACTUALIZAR_USUARIO, OBTENER_USUARIO } from '../../../graphql/dslgql';

const EditarUsuario = () => {
  const router = useRouter();

  const {
    query: { id },
  } = router;

  const {
    data,
    loading: obtenerUsuarioLoading,
    error: obtenerUsuarioError,
  } = useQuery(OBTENER_USUARIO, { variables: { id } });

  const [updateUser] = useMutation(ACTUALIZAR_USUARIO);

  const schemaValidacion = Yup.object({
    name: Yup.string().required('El nombre del usuario es requerido'),
    email: Yup.string().email('Email no es valido').required('El email es obligatorio'),
  });

  const handleSubmitUsuario = async (values) => {
    try {
      const { name, email } = values;
      const { data } = await updateUser({
        variables: {
          updateUserInput: {
            name,
            email,
          },
        },
      });

      Swal.fire(
        'Actualizado',
        `El usuario ${name} se actualizo correctamente`,
        'success'
      );
      router.push('/usuarios');
    } catch (error) {
      const { message } = error;
      Swal.fire('Error', message, 'error');
    }
  };

  // console.log(obtenerUsuarioLoading);
  // console.log(obtenerUsuarioError);
  // console.log(data);

  // const rrr = JSON.stringify(obtenerUsuariosError);
  if (obtenerUsuarioLoading)
    return (
      <Layout>
        <Spinner loading={obtenerUsuarioLoading} />
      </Layout>
    );

  if (
    obtenerUsuarioError &&
    obtenerUsuarioError.graphQLErrors[0].extensions.code == 'UNAUTHENTICATED'
  ) {
    router.push('/login');
    return <div></div>;
  }

  if (obtenerUsuarioError)
    return (
      <Layout>
        <h1>Problemas la llamada al origen de datos</h1>
      </Layout>
    );

  const { getUser } = data;
  return (
    <Layout>
      <h1 className="text-2xl text-gray-800 font-light">Editar Usuario</h1>
      <div className="flex justify-center mt-5">
        <div className="w-full max-w-lg">
          <Formik
            validationSchema={schemaValidacion}
            enableReinitialize
            initialValues={getUser}
            onSubmit={handleSubmitUsuario}
          >
            {(props) => {
              // console.log(props);
              return (
                <form
                  className="bg-white shadow-md px-8 pt-6 pb-8 mb-4"
                  onSubmit={props.handleSubmit}
                >
                  <div className="mb-6">
                    <label
                      htmlFor="name"
                      className="block text-gray-700 text-sm font-bold mb-2"
                    >
                      Nombre
                    </label>

                    <input
                      className="shadow appearance-none border border-transparent rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:shadow-outline"
                      id="name"
                      type="text"
                      placeholder="Nombre del usuario"
                      value={props.values.name}
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                    />
                    {props.touched.name && props.errors.name && (
                      <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-2">
                        <p className="text-sm">{props.errors.name}</p>
                      </div>
                    )}
                  </div>

                  <div className="mb-6">
                    <label
                      htmlFor="email"
                      className="block text-gray-700 text-sm font-bold mb-2"
                    >
                      E-mail
                    </label>

                    <input
                      className="shadow appearance-none border border-transparent rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:shadow-outline"
                      id="email"
                      type="email"
                      placeholder="Correo electronico del usuario"
                      value={props.values.email}
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                    />
                    {props.touched.email && props.errors.email && (
                      <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-2">
                        <p className="text-sm">{props.errors.email}</p>
                      </div>
                    )}
                  </div>

                  <input
                    type="submit"
                    className="bg-gray-800 w-full mt-5 p-2 text-white uppercase hover:bg-gray-900"
                    value="Editar producto"
                  />
                </form>
              );
            }}
          </Formik>
        </div>
      </div>
    </Layout>
  );
};

export default EditarUsuario;
