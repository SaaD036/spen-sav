const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const { authorization } = req.headers;
    const token = (authorization || '').split(' ')[1];

    try {
        if (!authorization || !token) {
            return res.status(401).json({
                message: 'unauthenticated',
            });
        }

        const user = jwt.verify(token, process.env.JWT_SECRET);

        if (!user) {
            return res.status(401).json({
                message: 'unauthenticated',
            });
        }

        req.user = user;

        next();
    } catch (err) {
        return res.status(401).json({
            message: 'unauthenticated',
        });
    }
}

module.exports = auth;