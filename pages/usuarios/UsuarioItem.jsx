import { gql, useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';
import { ELIMINAR_USUARIO, OBTENER_USUARIOS } from '../../graphql/dslgql';

const UsuarioItem = ({ usuario }) => {
  const { id, name, email, created, owner } = usuario;
  const router = useRouter();

  const [removeUser, { loading: eliminarProductoLoading, error: eliminarProductoError }] =
    useMutation(ELIMINAR_USUARIO, {
      update(cache) {
        const { getUsers } = cache.readQuery({
          query: OBTENER_USUARIOS,
        });
        cache.writeQuery({
          query: OBTENER_USUARIOS,
          data: {
            getUsers: getUsers.filter((userHere) => userHere.id !== id),
          },
        });
      },
    });

  const handleDeleteUsuario = () => {
    Swal.fire({
      title: `Deseas eliminar - ${name}.?`,
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
          const { data } = await removeUser({});

          Swal.fire(`${data.removeUser}`, `El producto ${name} fue eliminado`, 'success');
        } catch (error) {
          // console.log(error);
          const { message } = error;
          Swal.fire('Error', `${message}`, 'error');
        }
      }
    });
  };

  const handleUpdateUsuario = (id) => {
    router.push({
      pathname: '/usuarios/editar/[id]',
      query: { id },
    });
  };

  const isEditDelete = owner === 'true' ? true : false;

  return (
    <tr className="bg-blue-50 hover:bg-blue-200">
      <td className="border px-4 py-2">{name}</td>
      <td className="border px-4 ">{email}</td>
      <td className="border px-4 ">{created}</td>
      <td className="px-4">
        {isEditDelete && (
          <button
            type="button"
            onClick={() => handleUpdateUsuario(id)}
            className="flex justify-center items-center  px-4 py-1 w-2/3 rounded shadow border border-green-500 text-green-500 uppercase text-xs font-bold hover:bg-green-500 hover:text-white"
          >
            <svg
              className="w-4 h-4 inline-block align-text-top"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              ></path>
            </svg>
            <span className="inline-block ml-1">Modificar</span>
          </button>
        )}
      </td>
      <td className="px-4">
        {isEditDelete && (
          <button
            type="button"
            onClick={handleDeleteUsuario}
            className="flex justify-center items-center  px-4 py-1 w-2/3 rounded shadow border border-red-500 text-red-500 uppercase text-xs font-bold hover:bg-red-500 hover:text-white"
          >
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
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="inline-block ml-1">Eliminar</span>
          </button>
        )}
      </td>
    </tr>
  );
};

export default UsuarioItem;
