const express = require('express');
const UserController = require('../controllers/user');

const api = express.Router();

api.post('/signup', UserController.signup);
api.post('/signin', UserController.signin);

module.exports = api;