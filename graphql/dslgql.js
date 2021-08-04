import { gql } from '@apollo/client';

export const AUTENTICAR_USUARIO = gql`
  mutation Mutation($authenticateUserInput: AuthenticateInput!) {
    authenticateUser(input: $authenticateUserInput) {
      token
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
