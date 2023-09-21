const express = require('express');

const userRouter = require('./user');
const commentRouter = require('./comment');
const authRouter = require('./auth');

const router = express.Router();

router.use('/auth', authRouter)
router.use('/user', userRouter);
router.use('/comment', commentRouter)

module.exports = router;
