const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();
const apis = require('./routes');
require('dotenv').config();

// Allow Cross-Origin requests
app.use(cors());

app.use(express.static(path.join(__dirname, 'build')));

app.use('/api', apis);

app.get('*', (_, res) => res.sendFile(path.join(__dirname, 'build/index.html')));

module.exports = app;
