const { getEntriesWithFilter } = require('../../services/entry');

const getAllEntry = async (req, res, next) => {
    try {
        const { amount, name, operator = '$gte', page = 1, limit = 25 } = req.query;
        
        let filter = {};
        const updatedEntries = [];

        if (amount) {
            filter.amount = {
                [operator]: parseInt(amount),
            };
        }
        
        const {entries, entryCount} = await getEntriesWithFilter(
            filter,
            { name },
            parseInt(page),
            parseInt(limit)
        );

        (entries || []).forEach(entry => {
            updatedEntries.push({
                _id: entry._id,
                amount: entry.amount,
                type: entry.type,
                totalComment: (entry.comments || []).length,
                user: entry.user,
            });
        });

        return res.status(200).json({
            entries: updatedEntries,
            count: entryCount,
        });
    } catch (error) {
        next(error);
    }
};

const createEntry = async (req, res, next) => {};

module.exports = {
    getAllEntry,
    createEntry,
}