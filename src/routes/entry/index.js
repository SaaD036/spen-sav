const express = require('express');
const router = express.Router();

const { getAllEntry, createEntry } = require('../../controllers/entry');

const { createEntryValidtor } = require('./entryValidator');
const validatorHandler = require('../validatorHandler')

router.route('/')
    .get(getAllEntry)
    .post(createEntryValidtor, validatorHandler, createEntry);

module.exports = router;