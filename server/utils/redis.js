// localhost Redis
// const redisClient = require("async-redis").createClient();

// const Redis = {
//   set: async (key, value) => {
//     await redisClient.set(key.toString(), JSON.stringify(value));
//   },
//   get: async (key) => {
//     return JSON.parse(await redisClient.get(key.toString()));
//   },
//   delete: async (key) => {
//     await redisClient.del(key.toString());
//   },
// };

// Server Redis
const { createClient } = require("redis");

const client = createClient({
  username: "default",
  password: process.env.REDIS_PASSWORD,
  socket: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT || 18238,
  },
});

client
  .on("connect", () => {
    console.log("=> Success, redis server connected");
  })
  .on("error", (err) => console.error("=> Fail, redis client error!", err.message))
  .on("close", () => {
    console.log("=> Redis connection closed!");
  });

client.connect();

const Redis = {
  set: async (key, value) => {
    await client.set(key.toString(), JSON.stringify(value));
  },
  get: async (key) => {
    return JSON.parse(await client.get(key.toString()));
  },
  delete: async (key) => {
    await client.del(key.toString());
  },
};

module.exports = Redis;
