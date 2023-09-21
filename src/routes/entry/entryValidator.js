const { check } = require('express-validator');

const { ledgerType } = require('../../constants/ledger');

const createEntryValidtor = [
    check('amount')
        .custom((value) => {
            const amount = parseInt(value);

            return !isNaN(amount);
        })
        .withMessage('amount is required and must be a number'),
    check('type')
        .custom((value = ledgerType.SPENDING) => {
            const ledgerTypeArray = [ledgerType.EARNING, ledgerType.SPENDING];

            return ledgerTypeArray.includes(value.toLowerCase());
        })
        .withMessage(`Entry type is required and must be in ${ledgerType.EARNING} or ${ledgerType.SPENDING}`),
];

module.exports = {
    createEntryValidtor,
};
