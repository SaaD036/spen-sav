const Entry = require('../../models/Ledger');

const { getEntriesWithFilter } = require('../../services/entry');

const getAllEntry = async (req, res, next) => {
    try {
        const { amount, name, operator = '$gte', page = 1, limit = 25 } = req.query;
        
        let filter = {};

        if (amount) {
            filter.amount = {
                [operator]: parseInt(amount),
            };
        }
        
        const {entries, entryCount} = await getEntriesWithFilter(filter, { name });


        return res.status(200).json({
            entries,
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