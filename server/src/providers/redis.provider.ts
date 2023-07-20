import redis from "redis";
import dotenv from "dotenv";
dotenv.config();

const redisClient = redis.createClient({
  socket: {
    port: Number(process.env.REDIS_PORT),
    host: process.env.REDIS_HOST,
  },
  password: process.env.REDIS_PASS,
});

export default redisClient;
