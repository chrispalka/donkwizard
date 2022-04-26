# DonkWizard

## Installation

Install dependencies

```sh
cd DonkWizard2.0
npm i
```
Set ENV variables Node-Postgres and Express Server
```
SERVER='localhost'
PGHOST='localhost'
PGUSER=usernamehere
PGDATABASE=donkwizard
PGPASSWORD=null
PGPORT=5432
PORT=3000
```
For production environments configure config/config.js respectively

```sh
module.exports = {
  "development": {
    "username": process.env.PGUSER,
    "password": null,
    "database": process.env.PGDATABASE,
    "host": process.env.PGHOST,
    "dialect": "postgres",
    "logging": false
  },
  "production": {
    "username": process.env.PGUSER,
    "password": process.env.PGPASSWORD,
    "database": process.env.PGDATABASE,
    "host": process.env.PGHOST,
    "dialect": "postgres",
    "use_env_variable": "DATABASE_URL",
    "logging": false,
    "dialectOptions": {
      "ssl": {
        "rejectUnauthorized": false
      }
    }
  }
};
```

Run migration & start application
```
sequelize db:migrate
npm run build-dev
npm run start
```
## License

MIT

[node-postgres]: <https://www.npmjs.com/package/pg>