const redis = require("redis");
const { getConfig } = require("../config");
const utils = require("../utils");
const config = getConfig("redis");
const url = config?.url || "localhost:6379";
const redisClient = redis.createClient({
    url: `redis://${url}`,
});
class RedisService {
    async initRedis() {
        await redisClient
            .connect()
            .then(() => console.log("Redis connection established " + url))
            .catch((error) => console.log("Redis Client Error", error));
    }
    setRedis(key, value, seconds) {
        console.log(key, value);
        // 1 minutes expired
        redisClient.setEx(
            key,
            seconds || config.expiresRedis || 60,
            value
        );
    }
    async getAllRedis() {
        // get all keys in redis server
        const keys = await redisClient.keys("*");
        const arrPromise = keys.map(async (k) => {
            const value = await redisClient.get(k);
            return {
                key: k,
                value: utils.IsJsonString(value) ? JSON.parse(value) : value,
            };
        });
        return Promise.all(arrPromise);
    }
    async getRedis(key) {
        const data = await redisClient.get(key);
        return utils.IsJsonString(data) ? JSON.parse(data) : data;
    }
    async deleteCache(key) {
        if (key) {
            redisClient.del(key);
        } else {
            const data = await this.getAllRedis();
            const promises = data.map(item => {
                return redisClient.del(item.key);
            });
            return Promise.all(promises);
        }
    }
}
module.exports = new RedisService();