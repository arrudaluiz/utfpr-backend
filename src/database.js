import mongoose from 'mongoose';

const USERNAME = process.env.MONGO_INITDB_ROOT_USERNAME || 'root';
const PASSWORD = process.env.MONGO_INITDB_ROOT_PASSWORD || 'example';
const DATABASE = process.env.MONGO_INITDB_DATABASE || 'test';
const MONGO_URL =
  process.env.MONGO_URL ||
  `mongodb://${USERNAME}:${PASSWORD}@127.0.0.1:27017/${DATABASE}`;

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URL);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

export const disconnectDB = async () => {
  try {
    await mongoose.connection.close();
    console.info('Database disconnected');
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
