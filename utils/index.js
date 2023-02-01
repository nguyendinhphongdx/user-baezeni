const { getRedis } = require("../redis");

class Utils {
    IsJsonString(str) {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    }
    async checkCacheApi(req, res, next) {
        try {
            // const result = await getRedis(req.originalUrl);
            // if (result) {
            //     res.json(result);
            // } else {
            //     next();
            // }
            next();
        } catch (error) {
            next();
        }
    }
}
module.exports = new Utils();