const express = require('express');

const { getAllComments, createComment } = require('../../controllers/comments');

const { createCommentValidtor } = require('./commentValidator');
const validtorHandler = require('./../validatorHandler');

const router = express.Router();

router.route('/')
    .get(getAllComments)
    .post(createCommentValidtor, validtorHandler, createComment);

module.exports = router;
