/* eslint-disable no-underscore-dangle */
const { DataTypes } = require('sequelize');
const _users = require('./users');
const _webhooks = require('./webhooks');

function initModels(sequelize) {
  const users = _users(sequelize, DataTypes);
  const webhooks = _webhooks(sequelize, DataTypes);

  webhooks.belongsTo(users, { as: 'user', foreignKey: 'user_id' });
  users.hasMany(webhooks, { as: 'webhooks', foreignKey: 'user_id' });

  return {
    users,
    webhooks,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
