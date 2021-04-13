'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(path.join(__dirname, '../config/config.js'))[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = {
  db,
  getUserName: (email) => db.User.findOne({
    where: { email },
  }).then((response) => (response === null ? false : response))
    .catch((err) => console.log(err)),
  findUserByToken: (resetpasswordtoken) => db.User.findOne({
    where: { resetpasswordtoken },
  }).then((response) => response)
    .catch((err) => console.log(err)),
  addUser: (id, email, password) => db.User.create({
    id, email, password,
  }).then((response) => response)
    .catch((err) => console.log(err)),
  addRecent: (id, recents, user_id, createdAt) => db.Recent.create({
    id, recents, user_id, createdAt,
  }).then((response) => response)
    .catch((err) => console.log(err)),
  getRecent: (user_id) => db.Recent.findAll({
    where: {
      user_id,
    },
  }).then((response) => response)
    .catch((err) => console.log(err)),
  updateForgotPassword: (id, resetpasswordtoken, resetpasswordexpires) => db.User.update({
    resetpasswordtoken, resetpasswordexpires,
  },
  {
    where: {
      id,
    },
  }).then((response) => response)
    .catch((err) => console.log(err)),
  updateUserPassword: (email, password) => db.User.update({
    password,
  },
  {
    where: {
      email,
    },
  }).then((response) => response)
    .catch((err) => console.log(err)),
  getWebhook: (user_id) => db.Webhook.findOne({
    where: { user_id },
  }).then((response) => response)
    .catch((err) => console.log(err)),
  addWebHook: (id, webhook, user_id) => db.Webhook.create({
    id, webhook, user_id,
  }).then((response) => response)
    .catch((err) => console.log(err)),
  updateWebhook: (webhook, user_id) => db.Webhook.update({ webhook },
    {
      where: {
        user_id,
      },
    }).then((response) => response)
    .catch((err) => console.log(err)),
  deleteWebhook: (user_id) => db.Webhook.destroy(
    {
      where: {
        user_id,
      },
    }).then((response) => response)
    .catch((err) => console.log(err)),
};