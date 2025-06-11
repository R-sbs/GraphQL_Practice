import dotenv from "dotenv";

dotenv.config();

const NODE_ENV = process.env.NODE_ENV || "";
const PORT = process.env.PORT || 8000;
const MONGO_CONNECTION_STRING = process.env.MONGO_URI;

export { NODE_ENV, PORT, MONGO_CONNECTION_STRING };
