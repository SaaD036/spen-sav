const express = require('express');
const mongoose = require("mongoose");
const cors = require('cors');
require('dotenv').config();

const router = require('./src/routes');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', router);

app.use('/', (req, res, next) => {
    return res.status(200).json({
        message: 'successfull',
    });
});

app.use((req, res, next) => {
    next({
        status: 404,
        message: 'requested url not found',
    });
});

app.use((error, req, res, next) => {
    const status = error.status || 500;

    if (res.headersSent) {
        return next(err)
    }

    res.status(status).json({
        errors: error.message || error,
    });
});

mongoose.set('strictQuery', true);
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('database connected'))
    .catch(e => console.log(e));;

app.listen(process.env.PORT, () => {
    console.log(`Server started at port ${process.env.PORT}`);
});
