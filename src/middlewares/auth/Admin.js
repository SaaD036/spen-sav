var jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    try {
        if (!req.token.isAdmin) {
            return res.status(401).json({
                message: 'you are unauthorized'
            });
        }
        next();
    } catch (err) {
        return res.status(401).json({
            message: 'you are unauthorized'
        });
    }
}

module.exports = auth;