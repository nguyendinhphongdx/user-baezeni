const fs = require("fs");

const checkPathExisted = path => {
    if (!path) return false;
    if (fs.existsSync(path)) {
        return true
    }
    return false;
}

const getConfig = name => {
    try {
        let pathFile = `${__dirname}/config/config-${name}.json`;
        if (process.env.NODE_ENV === 'production') {
            pathFile = `/etc/config/config-${name}.json`;
        }
        const isPathExisted = checkPathExisted(pathFile);
        if (!isPathExisted) {
            console.error(`Path config ${pathFile} is not existed`);
            process.exit(1);
        }
        const rawData = fs.readFileSync(pathFile);
        return JSON.parse(rawData);
    } catch (error) {
        console.error(`Get config config-${name} failed: ${error.message}`);
        process.exit(1);
    }
}

module.exports = {
    getConfig
};