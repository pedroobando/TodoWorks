// import Head from 'next/head'
// import Image from 'next/image'
// import styles from '../styles/Home.module.css'

import Layout from '../components/Layout';

const Home = () => {
  return (
    <Layout>
      <div className="mt-10">
        <div className="ml-2">
          <button className="border-2 border-blue-300 rounded px-4 py-2 text-sm hover:bg-blue-100">
            Primary
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
