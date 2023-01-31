const { DataTypes } = require("sequelize");
const { sequelize } = require("../../database");

const User = sequelize.define(
    "user",
    {
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true
        },
        email: {
            type: DataTypes.STRING(190),
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        role: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        active: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        }
    },
    {
        timestamps: true,
        freezeTableName: true,
        createdAt: 'created',
        updatedAt: 'updated',
    }
);

module.exports = User;