import client from '../graphql/apollocfg';
import { ApolloProvider } from '@apollo/client';
import TodoState from '../context/TodoState';

import '../styles/globals.css';
import 'tailwindcss/tailwind.css';

const AppTodo = ({ Component, pageProps }) => {
  return (
    <ApolloProvider client={client}>
      <TodoState>
        <Component {...pageProps} />
      </TodoState>
    </ApolloProvider>
  );
};

export default AppTodo;
