import React from 'react';

const TodoDetail = ({ todo, handleDeleteTarea, activeUser = '' }) => {
  const {
    id: todoId,
    userTo: { name: userName },
    userTo: { email: userEmail },
    user: { email: userActiveEmail },
    description,
    product: { name: productName },
    complete,
  } = todo;

  // const completado = complete == 'true' ? true : false;
  const todoDate = new Date(parseInt(todo.created));
  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="">
            <div className="text-sm font-medium text-gray-900">{userName}</div>
            <div className="text-sm text-gray-500">{userEmail}</div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">{description}</div>
        <div className="text-sm text-gray-500">{productName}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span
          className={
            complete
              ? 'bg-green-100 text-green-800 px-2 inline-flex text-xs leading-5 font-semibold rounded-full '
              : 'bg-red-100 text-red-800 px-2 inline-flex text-xs leading-5 font-semibold rounded-full '
          }
        >
          {complete ? 'TERMINADO' : 'PENDIENTE'}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {todoDate.toDateString()}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        {!complete && activeUser === userActiveEmail && (
          <button
            onClick={() => handleDeleteTarea(todoId, description)}
            className="transition duration-300 transform border border-red-700 text-red-800 inline-flex text-xs px-2 leading-5 font-semibold rounded-full uppercase hover:bg-red-700 hover:text-white hover:-translate-y-1 hover:scale-110"
          >
            Eliminar
          </button>
        )}
      </td>
    </tr>
  );
};

export default TodoDetail;
