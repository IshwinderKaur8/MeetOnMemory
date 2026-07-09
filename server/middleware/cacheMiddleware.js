import { getRedisClient } from "../services/redisService.js";
import crypto from "crypto";

// NOTE: Cache invalidation is not currently implemented for search results.
// Search queries are cached for 1 hour. If meetings or other searchable
// data are updated, users may receive slightly stale results for identical
// queries until the cache expires. This is an accepted trade-off for performance.
export const cacheSearch = async (req, res, next) => {
  try {
    const { query } = req.body;
    if (!query || typeof query !== "string") {
      return next();
    }

    const redisClient = getRedisClient();
    if (!redisClient || !redisClient.isReady) {
      return next();
    }

    const hash = crypto
      .createHash("sha256")
      .update(query.toLowerCase().trim())
      .digest("hex");
    const cacheKey = `search:${hash}`;

    const cachedData = await redisClient.get(cacheKey);

    if (cachedData) {
      console.log(`⚡ Serving from Redis cache for query: "${query}"`);
      return res.status(200).json(JSON.parse(cachedData));
    }

    // Attach cacheKey to req so controller can save it
    req.cacheKey = cacheKey;
    next();
  } catch (error) {
    console.error("Redis cache error:", error);
    next();
  }
};
