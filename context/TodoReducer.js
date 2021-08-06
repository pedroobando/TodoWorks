import { TYPE_AUTH } from './types';

const TodoReducer = (state, { type, payload }) => {
  switch (type) {
    case TYPE_AUTH.LOGIN:
      return {
        ...state,
        logged: true,
        activeUser: payload,
      };

    case TYPE_AUTH.LOGOUT:
      return {
        ...state,
        logged: false,
        activeUser: {},
      };

    // case SELECCIONAR_PRODUCTO:
    //   return {
    //     ...state,
    //     productos: [...payload],
    //   };

    // case CANTIDAD_PRODUCTOS:
    //   return {
    //     ...state,
    //     productos: state.productos.map((producto) =>
    //       producto.id === payload.id ? (producto = payload) : producto
    //     ),
    //   };

    // case ACTUALIZAR_TOTAL:
    //   return {
    //     ...state,
    //   };

    default:
      return state;
  }
};

export default TodoReducer;
