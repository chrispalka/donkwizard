/* eslint-disable no-console */
const newrelic = require('newrelic');
const express = require('express');
const path = require('path');
const session = require('express-session');
const passport = require('passport');
const cors = require('cors');
const routes = require('./routes/index');


const app = express();
const PORT = process.env.PORT || 3000;
const { SECRET } = process.env


app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(session({
  secret: SECRET,
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use('/', routes);

app.get('**', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(PORT, () => console.log(`Connected at: http://localhost:${PORT}`));
