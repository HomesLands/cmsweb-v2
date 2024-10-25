export default () => ({
  port: parseInt(process.env.PORT, 10) || 3002,
  database: {
    host: process.env.HOST_MYSQL || 'localhost',
    port: parseInt(process.env.PORT_MYSQL, 10) || 3006,
    user: process.env.USER_MYSQL || 'root',
    password: process.env.PASSWORD_MYSQL,
    schema: process.env.DATABASE_MYSQL,
  },
  broker: process.env.BROKER_URL,
});
