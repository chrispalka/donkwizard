const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool();

pool.connect()
  .then(() => console.log('Connected to PG'))
  .catch((e) => console.log(e))
  .finally(() => pool.end());
