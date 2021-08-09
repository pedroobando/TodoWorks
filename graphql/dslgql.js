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
      description
      amount
      user {
        id
        name
        email
      }
      active
      hashtags
    }
  }
`;

export const OBTENER_HASHTAGSPRODUCTO = gql`
  query Query {
    getProductHashTag
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

export const NUEVO_PRODUCTO = gql`
  mutation NewProductMutation($newProductInput: ProductInput!) {
    newProduct(input: $newProductInput) {
      id
      name
      description
      amount
      user {
        id
        name
        email
      }
      active
      hashtags
    }
  }
`;

export const ELIMINAR_PRODUCTO = gql`
  mutation RemoveProductMutation($removeProductId: ID!) {
    removeProduct(id: $removeProductId)
  }
`;
