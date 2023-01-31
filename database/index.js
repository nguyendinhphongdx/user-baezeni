const { Sequelize } = require("sequelize");
const SQLite = require("sqlite3");

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'data/database.sqlite'
});

async function connectSQLite() {
    try {
        await sequelize.authenticate();
        await sequelize.sync({
            force: false
        });
        console.log('SQLite has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the SQLite database:', error?.message);
    }
};

module.exports = {
    sequelize,
    connectSQLite
};