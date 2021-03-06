import React from 'react';
import Layout from '../../components/Layout';
import Registro from '../login/register';

const Nuevo = () => {
  return (
    <Layout>
      <Registro title="Nuevo Usuario" backHref="/usuarios/" />
    </Layout>
  );
};

export default Nuevo;
