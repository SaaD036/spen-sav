const express = require('express');
require('dotenv').config();

const app = express();

const mongoose = require("mongoose");

try {
    mongoose.set('strictQuery', true);
    const res = mongoose.connect(process.env.DATABASE_URL);
    console.log('res: ', res);
} catch(error) {
    console.log('error', error);
}

app.listen(process.env.PORT, () => {
    console.log(`Server started at port ${process.env.PORT}`);
});
