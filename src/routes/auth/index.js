const express = require('express');

const { loginValidator } = require('./authValidator');
const validtorHandler = require('./../validatorHandler');

const { login } = require('../../controllers/auth');

const router = express.Router();

router.post('/login', loginValidator, validtorHandler, login);

module.exports = router;
