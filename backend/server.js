const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const prisma = require('./config/prisma');
const user = require('./routes/user');
require('dotenv').config();

const app = express();
app.use(express.json());

app.use('/api/users', user);

app.get('/', (req, res) => {
    res.send('Hello, world!');
});


app.listen(4000, () => {
    console.log('server running on port 4000');
})




