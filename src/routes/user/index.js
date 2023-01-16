const express = require('express');

const {
    getUsers,
    createUser,
} = require('../../controllers/user');

const {
    createUserValidtor,
} = require('./userValidator');

const validtorHandler = require('./../validatorHandler');

const router = express.Router();

router.get('/', getUsers);
router.post('/', createUserValidtor, validtorHandler, createUser);

module.exports = router;
