import React from 'react';

const TodoDetail = ({ todo }) => {
  const {
    userTo: { name: userName },
    userTo: { email: userEmail },
    description,
    product: { name: productName },
  } = todo;

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
        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
          {todo.complete ? 'TERMINADO' : 'PENDIENTE'}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {todoDate.toDateString()}
      </td>
    </tr>
  );
};

export default TodoDetail;
