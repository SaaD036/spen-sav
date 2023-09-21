const express = require('express');

const authMiddleware = require('../middlewares/auth');

const userRouter = require('./user');
const commentRouter = require('./comment');
const authRouter = require('./auth');

const router = express.Router();

router.use('/auth', authRouter)
router.use('/user', authMiddleware, userRouter);
router.use('/comment', authMiddleware, commentRouter)

module.exports = router;
