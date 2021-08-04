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
