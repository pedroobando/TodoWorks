/**
 * @type {import('next').NextConfig}
 */

const nextConfig = {
  reactStrictMode: true,
  env: {
    secretword: 'p4l4br4s3cr3t4p4r4p4ssw0rdwsw4r10',
    xcnn_gqlp: 'https://apitodowork.herokuapp.com/graphql',
    cnn_gqld: 'http://localhost:4000/graphql',
  },
};

module.exports = nextConfig;
