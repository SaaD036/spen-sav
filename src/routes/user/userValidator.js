const { check } = require('express-validator');
const { isEmpty } = require('lodash');

const User = require('./../../models/User');

const createUserValidtor = [
    check('email')
        .isEmail()
        .withMessage('Invalid email')
        .custom(async (value) => {
            const user = await User.findOne({
                email: value,
            });

            if (user !== null) {
                return Promise.reject();
            }
        })
        .withMessage('Account associated with this email exists'),
    check('password')
        .custom(value => {
            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

            return value.match(passwordRegex);
        })
        .withMessage('Password must be at least 8 character long and should contain one special character, one uppercase letter, one lowercase letter and one number'),
    check('firstName')
        .custom(value => {
            return value.trim().length > 0;
        })
        .withMessage('First name should exist'),
    check('lastName')
        .custom(value => {
            return value.trim().length > 0;
        })
        .withMessage('Last name should exist'),
];

module.exports = {
    createUserValidtor,
}