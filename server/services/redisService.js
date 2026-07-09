import { createClient } from "redis";
import dotenv from "dotenv";

dotenv.config();

let redisClient;

export const initRedis = async () => {
  redisClient = createClient({
    url: process.env.REDIS_URI || "redis://localhost:6379",
  });

  redisClient.on("error", (err) => console.log("Redis Client Error", err));

  try {
    await redisClient.connect();
    console.log("✅ Redis connected successfully");
  } catch (error) {
    console.error("⚠️ Redis connection failed:", error.message);
  }
};

export const getRedisClient = () => redisClient;
