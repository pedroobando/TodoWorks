import { useReducer } from 'react';
import { TYPE_AUTH } from './types';
import TodoContext from './TodoContext';
import TodoReducer from './TodoReducer';
import jwt from 'jsonwebtoken';

const init = () => {
  // return JSON.parse(localStorage.getItem('user')) || { logged: false };
  return {
    activePage: { page: '', params: {} },
    logged: false,
    activeUser: { email: '', name: '', userid: '' },
  };
};

const TodoState = ({ children }) => {
  const initialState = {
    activeUser: {},
    logged: false,
    activePage: {},
  };

  const [state, dispatch] = useReducer(TodoReducer, initialState, init);

  const validUser = () => {
    try {
      const _token = localStorage.getItem('token') || null;
      const _verify = jwt.verify(_token, process.env.secretword);
      const { email, name } = _verify;

      dispatch({
        type: TYPE_AUTH.LOGIN,
        payload: { email, name },
      });
      return true;
    } catch (error) {
      logoutUser();
      return false;
    }
  };

  const loginUser = (token) => {
    localStorage.setItem('token', token);

    const { email, name } = jwt.decode(token);

    dispatch({
      type: TYPE_AUTH.LOGIN,
      payload: { email, name, token },
    });
  };

  const logoutUser = () => {
    localStorage.removeItem('token');
    dispatch({
      type: TYPE_AUTH.LOGOUT,
    });
  };

  // const asignarCliente = (cliente) => {
  //   dispatch({
  //     type: SELECCIONAR_CLIENTE,
  //     payload: cliente,
  //   });
  // };

  // const asignarProductos = (productoSeleccionados) => {
  //   let nuevoState;
  //   if (state.productos.length > 0) {
  //     nuevoState = productoSeleccionados.map((producto) => {
  //       const nuevoObjeto = state.productos.find(
  //         (productoState) => productoState.id === producto.id
  //       );
  //       return { ...producto, ...nuevoObjeto };
  //     });
  //   } else {
  //     nuevoState = productoSeleccionados;
  //   }

  //   dispatch({
  //     type: SELECCIONAR_PRODUCTO,
  //     payload: nuevoState,
  //   });
  // };

  // const cantidadProductos = (nuevoProducto) => {
  //   dispatch({
  //     type: CANTIDAD_PRODUCTOS,
  //     payload: nuevoProducto,
  //   });
  // };

  // const actualizarTotal = () => {
  //   dispatch({
  //     type: ACTUALIZAR_TOTAL,
  //   });
  // };

  return (
    <TodoContext.Provider
      value={{
        activeUser: state.activeUser,
        logged: state.logged,
        loginUser,
        logoutUser,
        validUser,
        // asignarCliente,
        // asignarProductos,
        // cantidadProductos,
        // actualizarTotal,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export default TodoState;
