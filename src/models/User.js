const { Schema, model } = require('mongoose');

const { userRole, userStatus } = require('./../constants/user');

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function(email) {
                var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                return re.test(email)
            },
            message: props => `${props.value} is not a valid email`
        },
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: userRole.VIEWER,
        enum: {
            values: [userRole.ADMIN, userRole.VIEWER],
            message: 'Invalid entry',
        },
    },
    status: {
        type: String,
        default: userStatus.ACTIVE,
        enum: {
            values: [userStatus.ACTIVE, userStatus.DELETED, userStatus.DISABLED],
            message: 'Invalid entry',
        }
    },
    entry: [{
        type: Schema.Types.ObjectId,
        ref: 'Ledger',
    }],
},
{
    timestamps: true
});

const User = model('User', userSchema);

module.exports = User;