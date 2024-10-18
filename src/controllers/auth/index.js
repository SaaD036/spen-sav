const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../../models/User');

const login = async (req, res, next) => {
    const { email, password } = req.body;

    const user = await User.findOne({
        email,
    });

    if (!user || user.password != password) {
        return res.status(404).json({
            error: {
                message: 'No user found with this credential.',
            },
        });
    }

    // isValidPassword = await bcrypt.compare(req.body.password, user.password);

    // if (isValidPassword) {
    //     const token = jwt.sign({
    //         email: user.email,
    //         name: user.name,
    //         isAdmin: user.isAdmin,
    //         token: user.token
    //     }, process.env.JWT_SECRET, {
    //         expiresIn: '3h'
    //     });

    //     return res.status(200).json({
    //         message: 'login successful',
    //         token: token
    //     });
    // }

    const token = jwt.sign({
        email: user.email,
        name: `${user.firstName} ${user.lastName}`,
        role: user.role,
    }, process.env.JWT_SECRET);

    return res.status(200).json({
        message: 'login successfull',
        token,
    });
};

module.exports = {
    login,
}