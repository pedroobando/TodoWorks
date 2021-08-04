import { ApolloProvider } from '@apollo/client';
import client from '../graphql/apollocfg';

import '../styles/globals.css';
import 'tailwindcss/tailwind.css';

const MyApp = ({ Component, pageProps }) => {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
};

export default MyApp;
