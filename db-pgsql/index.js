/* eslint-disable no-console */
/* eslint-disable camelcase */
const Sequelize = require('sequelize');
const path = require('path');
const dotenv = require('dotenv');
const initModels = require('./models/init-models');

dotenv.config({ path: path.join(__dirname, '../.env') });

const DATABASE = process.env.PGDATABASE;
const HOST = process.env.DATABASE_URL || 'localhost';
const USER = process.env.PGUSER;
const PASSWORD = process.env.PGPASSWORD;

const db = new Sequelize(DATABASE, USER, PASSWORD, {
  host: HOST,
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  logging: false,
});

const model = initModels(db);

module.exports = {
  db,
  model,
  getUserName: (email) => model.users.findOne({
    where: { email },
  }).then((response) => (response === null ? false : response))
    .catch((err) => console.log(err)),
  findUserByToken: (resetpasswordtoken) => model.users.findOne({
    where: { resetpasswordtoken },
  }).then((response) => response)
    .catch((err) => console.log(err)),
  addUser: (id, email, password) => model.users.create({
    id, email, password,
  }).then((response) => response)
    .catch((err) => console.log(err)),
  updateForgotPassword: (id, resetpasswordtoken, resetpasswordexpires) => model.users.update({
    resetpasswordtoken, resetpasswordexpires,
  },
  {
    where: {
      id,
    },
  }).then((response) => response)
    .catch((err) => console.log(err)),
  updateUserPassword: (email, password) => model.users.update({
    password,
  },
  {
    where: {
      email,
    },
  }).then((response) => response)
    .catch((err) => console.log(err)),
  getWebhook: (user_id) => model.webhooks.findOne({
    where: { user_id },
  }).then((response) => response)
    .catch((err) => console.log(err)),
  addWebHook: (webhook_id, webhook, user_id) => model.webhooks.create({
    webhook_id, webhook, user_id,
  }).then((response) => response)
    .catch((err) => console.log(err)),
  updateWebhook: (webhook, user_id) => model.webhooks.update({ webhook },
    {
      where: {
        user_id,
      },
    }).then((response) => response)
    .catch((err) => console.log(err)),
  deleteWebhook: (user_id) => model.webhooks.destroy(
    {
      where: {
        user_id,
      },
    }).then((response) => response)
    .catch((err) => console.log(err)),
};
