module.exports = ({ env }) => ({
  host: '0.0.0.0',
  port: process.env.PORT || 8080,
  production: true,
  admin: {
    auth: {
      secret: process.env.APP_ADMIN_JWT_SECRET
    },
  },
});
