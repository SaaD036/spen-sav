const { Schema, model } = require('mongoose');

const { ledgerType } = require('./../constants/ledger');

const today = new Date();

const ledgerSchema = new Schema({
    amount: {
        type: Number,
        required: true,
        min: [1, 'amount must be positive number'],
    },
    type: {
        type: String,
        required: true,
        default: ledgerType.SPENDING,
        enum: {
            values: [ledgerType.EARNING, ledgerType.SPENDING],
            message: 'Invalid entry',
        },
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    date: {
        type: String,
        default: today.toISOString(),
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
    // creator: [{
    //     type: Schema.Types.ObjectId,
    //     ref: 'User',
    // }],
},
{
    timestamps: true
});

const Ledger = model('Ledger', ledgerSchema);

module.exports = Ledger;