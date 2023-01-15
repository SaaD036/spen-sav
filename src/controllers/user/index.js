const User = require('./../../models/User');

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

module.exports = {
    getUsers,
}