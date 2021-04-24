/* eslint-disable no-console */
const express = require('express');
const path = require('path');
const session = require('express-session');
const passport = require('passport');
const cors = require('cors');
const routes = require('./routes/index');
const { db } = require('./models/index');


const app = express();
const PORT = process.env.PORT || 3000;
const { SECRET } = process.env
const SequelizeStore = require('connect-session-sequelize')(session.Store);


const myStore = new SequelizeStore({
  db: db.sequelize,
  expiration: 10 * 365 * 24 * 60 * 60,
});


app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(session({
  secret: SECRET,
  store: myStore,
  resave: false,
  saveUninitialized: true,
  proxy: true,
}));

myStore.sync();

app.use(passport.initialize());
app.use(passport.session());
app.use('/', routes);

app.get('**', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(PORT, () => console.log(`Connected at: http://localhost:${PORT}`));
