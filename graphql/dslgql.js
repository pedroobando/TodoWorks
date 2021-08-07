import { gql } from '@apollo/client';

export const AUTENTICAR_USUARIO = gql`
  mutation Mutation($authenticateUserInput: AuthenticateInput!) {
    authenticateUser(input: $authenticateUserInput) {
      token
    }
  }
`;

export const OBTENER_USUARIO = gql`
  query getUser {
    getUser {
      id
      name
      email
    }
  }
`;

export const OBTENER_USUARIOS = gql`
  query getUsers {
    getUsers {
      id
      name
      email
      owner
      created
    }
  }
`;

export const OBTENER_PRODUCTOS = gql`
  query Query {
    getProducts {
      id
      name
      amount
      active
      owner
      user {
        name
      }
    }
  }
`;

export const NUEVO_USUARIO = gql`
  mutation newUser($input: UserInput!) {
    newUser(input: $input) {
      id
      name
      email
      created
    }
  }
`;

export const NUEVO_PRODUCTO = gql`
  mutation newProductMutation($newProductInput: ProductInput!) {
    newProduct(input: $newProductInput) {
      id
      name
      description
      marks {
        name
      }
      amount
      active
      owner
      user {
        name
      }
    }
  }
`;

export const ACTUALIZAR_USUARIO = gql`
  mutation UpdateUserMutation($updateUserInput: UserUpdateInput!) {
    updateUser(input: $updateUserInput) {
      id
      name
      email
    }
  }
`;

export const ELIMINAR_USUARIO = gql`
  mutation RemoveUserMutation {
    removeUser
  }
`;
