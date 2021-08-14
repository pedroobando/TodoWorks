import React, { useState } from 'react';

const TodoDetail = ({ todo, handleCloseTodo, userActive }) => {
  const {
    id: todoId,
    userTo: { name: userName },
    userTo: { email: userEmail },
    user: { email: userActiveEmail },
    description,
    product: { name: productName },
    complete,
  } = todo;

  console.log(todoId);
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
        {userActive === userActiveEmail && (
          <input
            type="checkbox"
            name="closeTodo"
            id="closeTodo"
            checked={complete}
            onChange={(e) => handleCloseTodo(todoId, e)}
          />
        )}
      </td>
    </tr>
  );
};

export default TodoDetail;
