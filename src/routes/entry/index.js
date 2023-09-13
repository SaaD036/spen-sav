const express = require('express');
const router = express.Router();

const { getAllEntry, createEntry } = require('../../controllers/entry');

router.route('/')
    .get(getAllEntry)
    .post(createEntry);

module.exports = router;