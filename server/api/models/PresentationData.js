const { Sequelize, DataTypes } = require('sequelize');
const {db} = require('../../config/sequelize');

module.exports.PresentationData = db.define('data', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    avg: {
        type: DataTypes.DECIMAL(23, 20)
    },
    weight: {
        type: DataTypes.INTEGER
    },
    variance: {
        type: DataTypes.DECIMAL(23, 20)
    },
    mdata: {
        type: DataTypes.STRING
    },
    type: {
        type: DataTypes.STRING
    },
    key: {
        type: DataTypes.STRING
    },
    value: {
        type: DataTypes.DECIMAL(23, 20)
    },
    battleground: {
        type: DataTypes.STRING
    },
    brand: {
        type: DataTypes.INTEGER
    },
    study_conducted_time: {
        type: DataTypes.INTEGER
    },
    count: {
        type: DataTypes.STRING
    },
    pValue: {
        type: DataTypes.DECIMAL(23, 20)
    },
    value_absolute: {
        type: DataTypes.DECIMAL(23, 20)
    },
});
