const routes = require('express').Router();
const token = require('./token');

routes.use('/token', token);

module.exports = routes;