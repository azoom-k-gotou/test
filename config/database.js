module.exports = ({ env }) => ({
  defaultConnection: 'default',
  connections: {
    default: {
      connector: 'bookshelf',
      settings: {
        client: 'mysql',
        host: env('MODE') === 'production' ? env('DB_HOST') : '127.0.0.1',
        port: env('MODE') === 'production' ? env('DB_PORT') : 33088,
        database: env('DB_NAME'),
        username: env('DB_USER'),
        password: env('DB_PASS'),
        socketPath: env('MODE') === 'production' ? env('DB_SOCKET_PASS') : ''
      },
      options: {}
    },
  },
});
