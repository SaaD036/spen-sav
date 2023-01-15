const { validationResult } = require('express-validator');
const { isEmpty } = require('lodash');

const validtorHandler = (req, res, next) => {
    const errors = validationResult(req);
    const mappedError = errors.mapped();

    if (isEmpty(mappedError)) {
        next();
        return;
    }

    return res.status(500).json({
        errors: mappedError
    });
}

module.exports = validtorHandler;