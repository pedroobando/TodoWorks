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
          <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
            <input
              type="checkbox"
              name="toggle"
              id="toggle"
              checked={complete}
              onChange={() => handleCloseTodo(todoId, !complete)}
              className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
            />
            <label
              htmlFor="toggle"
              className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
            ></label>
          </div>
        )}
      </td>
    </tr>
  );
};

export default TodoDetail;
