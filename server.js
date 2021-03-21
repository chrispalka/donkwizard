/* eslint-disable no-console */
const express = require('express');
const path = require('path');
const session = require('express-session');
const passport = require('passport');

const cors = require('cors');
const routes = require('./routes/index');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.set('view-engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));
app.use(session({ secret: 'keyboard cat' }));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', routes);

app.listen(PORT, () => console.log(`Connected at: http://localhost:${PORT}`));
