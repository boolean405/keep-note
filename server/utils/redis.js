// Server Redis
const { createClient } = require("redis");

const redisClient = createClient({
  password: process.env.REDIS_PASSWORD,
  socket: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT || 18238,
  },
});

redisClient
  .on("error", (err) =>
    console.error("=> Fail, redis client error!", err.message)
  )
  .on("close", () => {
    console.log("=> Redis connection closed!");
  });

// redisClient.connect();

const Redis = {
  set: async (key, value) => {
    await redisClient.set(key.toString(), JSON.stringify(value));
  },
  get: async (key) => {
    return JSON.parse(await redisClient.get(key.toString()));
  },
  delete: async (key) => {
    await redisClient.del(key.toString());
  },
};

module.exports = { Redis, redisClient };
