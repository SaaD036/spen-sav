const express = require('express');

const {
    getUsers,
    createUser,
    getOneUser,
    updateUser,
    deleteUser,
} = require('../../controllers/user');

const {
    createUserValidtor,
} = require('./userValidator');

const validtorHandler = require('./../validatorHandler');

const router = express.Router();

router.get('/', getUsers);
router.post('/', createUserValidtor, validtorHandler, createUser);
router.get('/:id', getOneUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;
