import dotenv from 'dotenv';
dotenv.config();

// AWS SDK
const awsKey = {
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  HostedZoneId: process.env.HOSTED_ZONE_ID,
  defaultTTL: process.env.DEFAULT_TTL,
};

// DB connection
const mongoDB = {
  mongoURI: process.env.MONGODB_URI,
  dbName: process.env.DB_NAME,
};

// server port and mode
const server = {
  serverPort: process.env.SERVER_PORT,
  serverMode: process.env.SERVER_MODE,
};

const JWT = {
  jwtSec: process.env.JWT_SECRET ,
  jwtExp: '100d',
}

// Exporting the variables
export const { accessKeyId, secretAccessKey, HostedZoneId, defaultTTL } =
  awsKey;
export const { mongoURI, dbName } = mongoDB;
export const { serverMode, serverPort } = server;
export const { jwtSec, jwtExp } = JWT;
