const morgan = require('morgan');
const express = require('express');
const cors = require('cors');
const env = require('dotenv');

const router = require('./src/routers');
const { connectSQLite } = require('./database');
const userService = require('./src/services/userService');
const RedisService = require('./redis');
const { getConfig } = require('./config');
env.config({ path: process.cwd() + '/.env' });

const config = getConfig('app');

const app = express();

app.use(morgan('combined'));

app.use(express.json());

app.use(express.urlencoded({
    extended: true
}));
const corsOptions = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200,
}
app.use(express.static('views'))
app.use(cors(corsOptions));



app.use(`/${config.subDomain}`, router);

app.use('/', (req, res) => {
    res.redirect('/center-user/views/login');
})

app.listen(config.port, async () => {
    console.log("Server is running on port: ", 3000);
    await connectSQLite();
    await userService.init();
    await RedisService.initRedis();

});