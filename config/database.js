module.exports = ({ env }) => {
  const setting = {
    defaultConnection: 'default',
    connections: {
      default: {
        connector: 'bookshelf',
        settings: {
          client: 'mysql',
          database: 'places',
          username: 'root',
          password: process.env.DB_PASS,
        },
        options: {}
      },
    }
  }

  if (process.env.MODE === 'development') {
    setting.connections.default.settings.host = process.env.DB_HOST 
    setting.connections.default.settings.port = process.env.DB_PORT
  } else {
    setting.connections.default.settings.socketPath = process.env.DB_SOCKET_PATH
  }

  return setting
};
