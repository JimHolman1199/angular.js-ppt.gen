const { Sequelize } = require('sequelize');
module.exports.db = new Sequelize('postgres://postgres:admin@localhost:5432/presentation');
