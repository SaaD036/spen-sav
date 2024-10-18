const { check } = require('express-validator');

const loginValidator = [
    check('email')
        .isEmail()
        .withMessage('Email is required and should be valid.'),
    check('password')
        .custom(value =>  (value || '').length > 0)
        .withMessage('Password is required.'),
];

module.exports = {
    loginValidator,
};
