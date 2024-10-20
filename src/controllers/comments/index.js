const Comment = require('../../models/Comment');

const getAllComments = async (req, res, next) => {
    try {
        const { content, user_id } = req.query;
        
        const filter = {};
        content ? filter.content = content.trim() : null;
        user_id ? filter.userId = user_id : null;

        const [comments, commentsCount] = await Promise.all([
            Comment.find(filter)
                .populate('entryId'),
            Comment.count(),
        ]);


        return res.status(200).json({
            comments,
            count: commentsCount,
        });
    } catch (error) {
        next(error);
    }
};

const createComment = async (req, res, next) => {
    try {
        const { content, entry_id, user_id } = req.body;

        const comment = new Comment({
            content,
            userId: user_id,
            entryId: entry_id,
            isDeleted: false,
        })

        await comment.save();

        return res.status(200).json({
            message: 'comment added',
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllComments,
    createComment,
};
