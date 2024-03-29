function error(message) {
    throw new Error(message);
  }
  
  const config = {
    environment:
      process.env.ENVIRONMENT || error("ENVIRONMENT is required in env"),
    mongo: {
      url: process.env.MONGO_URL,
      dbName: process.env.MONGO_DB_NAME,
    },
    app: {
      port: process.env.PORT,
    },
    jwt: {
      secret: process.env.JWT_SIGNATURE,
    },
  };
  
  module.exports = config;
  