const { check } = require('express-validator');

const User = require('./../../models/User');
const Ledger = require('../../models/Ledger');

const createCommentValidtor = [
    check('user_id')
        .custom(async (value) => {
            const user = await User.findOne({
                _id: value,
            });

            if (!user) {
                return Promise.reject();
            }
        })
        .withMessage('User does not exist'),
    check('entry_id')
        .custom(async (value) => {
            const entry = await Ledger.findOne({
                _id: value,
            });

            if (!entry) {
                return Promise.reject();
            }
        })
        .withMessage('Entry does not exist'),
    check('content')
        .custom(value => {
            return (value || []).trim().length > 0;
        })
        .withMessage('Comment body is required'),
];

module.exports = {
    createCommentValidtor,
};
