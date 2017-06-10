export const server = {
  port: 3000,
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
  api: 'http://192.168.2.29:3000',
  server,
};
