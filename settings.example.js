export const server = {
  port: 3000,
  SSL: {
    enabled: false,
    keyPath: '',
    certPath: '',
  },
  appKey: 'MySecretKey',
  jwt: {
    secret: 'MySecretKey',
    session: {
      session: false,
    },
  },
};

export default {
  projectName: 'Web Launch Pad',
  api: 'http://localhost:3000',
  server,
};
