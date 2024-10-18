const { Schema, model } = require('mongoose');

const commentSchema = new Schema({
    content: {
        type: String,
        required: true,
        validate: {
            validator: function(content) {
                return content.trim().length > 0;
            },
            message: props => `content is required`,
        }
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    entryId: {
        type: Schema.Types.ObjectId,
        ref: 'Ledger',
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
},
{
    timestamps: true
});

const Comment = model('Comment', commentSchema);

module.exports = Comment;
