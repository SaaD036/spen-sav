const Entry = require('../../models/Ledger');

const { getEntriesWithFilter } = require('../../services/entry');

const { ledgerType } = require('../../constants/ledger');

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

const createEntry = async (req, res, next) => {
    const { amount, type=ledgerType.SPENDING } = req.body;

    const entry = new Entry({
        amount: parseInt(amount),
        type,
        userId: '63c2b8d011dab7299f3545b2',
    });

    await entry.save();

    return res.status(200).json({
        message: 'entry created',
    });
};

module.exports = {
    getAllEntry,
    createEntry,
}