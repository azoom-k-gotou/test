module.exports = ({ env }) => ({
  host: env('APP_HOST'),
  port: env.int('APP_PORT'),
  admin: {
    auth: {
      secret: env('APP_ADMIN_JWT_SECRET'),
    },
  },
});
