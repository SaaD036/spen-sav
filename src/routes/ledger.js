const express = require('express');

const Ledger = require('./../models/Ledger');
const User = require('./../models/User');

const router = express.Router();

router.route('/')
    .get(async (req, res, next) => {
        try {
            const user = await User.find().populate('entry');

            return res.status(200).json({
                user,
            })
        } catch(error) {
            next(error);
        }
    });

module.exports = router;