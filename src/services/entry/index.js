const Entry = require('../../models/Ledger');

const getEntriesWithFilter = async (filter={}, otherFilter={}, page=1, limit=25) => {
    const result = await Entry.aggregate([
        {
            $match: filter
        }, 
        {
            $project: {
                updatedAt: 0,
                createdAt: 0,
                creator: 0,
                __v: 0,
            },
        },
        {
            $lookup: {
                from: 'comments',
                localField: '_id',
                foreignField: 'entryId',
                as: 'comments',
            }
        },
        {
            $lookup: {
                from: 'users',
                localField: 'userId',
                foreignField: '_id',
                as: 'user',
                pipeline: [
                    { 
                        $match: otherFilter.name ? {
                            $expr: {
                                $regexMatch: {
                                    input: {
                                        $concat: ['$firstName', ' ', '$lastName']
                                    },
                                    regex: `.*${otherFilter.name.trim()}.*`,
                                    options: 'i',
                                }
                            },
                        } : {},
                    },
                    {
                        $project: {
                            _id: 1,
                            firstName: 1,
                            lastName: 1,
                        }
                    },
                ],
            },
        },
        {
            $unwind: '$user',
        },
        {
            $facet: {
                entries: [{ $skip: (page-1)*limit }, { $limit: limit}],
                totalCount: [{ $count: 'count' }],
            },
        },
    ]);

    const entries = (result || []).length == 0 ? [] : result[0].entries;
    const entryCount = (result || []).length == 0 ? 0 : result[0].totalCount;

    return {
        entries,
        entryCount: (entryCount || []).length == 0 ? 0 : entryCount[0].count,
    };
};

module.exports = {
    getEntriesWithFilter,
};