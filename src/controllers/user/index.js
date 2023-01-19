const { hash } = require('bcrypt');

const User = require('./../../models/User');
const {
    userStatus,
} = require('./../../constants/user');

const getUsers = async (req, res, next) => {
    try {
        const { email, name, page = 1, limit = 25 } = req.query;
        const filter = {};

        if (email) {
            filter.email = {
                $regex: `.*${email}.*`,
                $options: 'i',
            };
        }

        if (name) {
            filter.$expr = {
                $regexMatch: {
                    input: {
                        $concat: ['$firstName', ' ', '$lastName']
                    },
                    regex: `.*${name.trim()}.*`,
                    options: 'i',
                }
            };
        }

        const users = await User.aggregate([
            {
                $match: filter
            }, 
            {
                $project: {
                    password: 0,
                    updatedAt: 0,
                    createdAt: 0,
                    entry: 0,
                    __v: 0,
                },
            },
            {
                $lookup: {
                    from: 'ledgers',
                    localField: '_id',
                    foreignField: 'userId',
                    as: "entry"
                }
            },
        ]).skip((page-1)*limit).limit(limit);

        const userCount = await User.count(filter);

        users.forEach(user => {
            user.entryCount = (user.entry || []).length;
            delete user.entry;
        })

        return res.status(200).json({
            users,
            count: userCount,
        })
    } catch (error) {
        next(error);
    }
};

const createUser = async (req, res, next) => {
    try {
        const {
            email,
            firstName,
            lastName,
            password,
            role,
            status,
        } = req.body;

        const hashedPassword = await hash(password, 10);

        const user = new User({
            email,
            firstName,
            lastName,
            password: hashedPassword,
        });

        if (role) {
            user.role = role;
        }

        if(status) {
            user.status = status;
        }

        await user.save();

        return res.status(200).json({
            user,
        });
    } catch (error) {
        next(error);
    }
};

const getOneUser = async (req, res, next) => {
    try {
        const { id } = req.params;

        if(!id) {
            next({
                status: 403,
                message: 'user id is requered',
            });
            return;
        }

        const user = await User.findById(id, {
            updatedAt: 0,
            createdAt: 0,
            __v: 0,
            entry: 0,
        });

        if (!user) {
            return res.status(404).json({
                errors: 'user not found',
            })
        }

        return res.status(200).json({
            user,
        })
    } catch (error) {
        next(error);
    }
}

const updateUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const {
            email,
            firstName,
            lastName,
        } = req.body;

        if(!id) {
            next({
                status: 403,
                message: 'user id is requered',
            });
            return;
        }

        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({
                errors: 'user not found',
            })
        }

        if (email) {
            return res.status(403).json({
                errors: 'email can not be updated',
            })
        };
        if (firstName && firstName.trim().length > 0) user.firstName = firstName.trim();
        if (lastName && lastName.trim().length > 0) user.lastName = lastName.trim();

        await user.save();

        return res.status(200).json({
            user,
        })

    } catch (error) {
        next(error);
    }
}

const deleteUser = async (req, res, next) => {
    try {
        const { id } = req.params;

        if(!id) {
            next({
                status: 403,
                message: 'user id is requered',
            });
            return;
        }

        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({
                errors: 'user not found',
            })
        }

        user.status = userStatus.DELETED;

        user.save();

        return res.status(200).json({
            message: 'user is deleted',
        });
    } catch (error) {
        next(error);
    }
}

const getUserComment = async (req, res, next) => {
    
}

const getUserEntry = async (req, res, next) => {
    
}

module.exports = {
    getUsers,
    createUser,
    getOneUser,
    updateUser,
    deleteUser,
}