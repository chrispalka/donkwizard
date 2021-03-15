/* eslint-disable no-console */
const express = require('express');
const path = require('path');

const cors = require('cors');
const routes = require('./routes/index');

const app = express();
const PORT = 3000;

app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

app.listen(PORT, () => console.log(`Connected at: http://localhost:${PORT}`));
