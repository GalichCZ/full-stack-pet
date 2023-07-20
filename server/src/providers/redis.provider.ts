import redis from "redis";
import dotenv from "dotenv";
dotenv.config();

const redisClient = redis.createClient({
  socket: {
    port: Number(process.env.REDIS_PORT || 6379),
    host: process.env.REDIS_HOST || "localhost",
  },
  password: process.env.REDIS_PASS || "galich",
});

export default redisClient;
