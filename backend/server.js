const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const prisma = require('./config/prisma');
const user = require('./routes/user');
const appointment = require('./routes/appointments');
const portfolio = require('./routes/portfolios');
const review = require('./routes/reviews');
require('dotenv').config();

const app = express();
app.use(express.json());

app.use('/api/users', user);
app.use('/api/appointments', appointment);
app.use('/api/portfolios', portfolio);
app.use('/api/reviews', review);

app.get('/', (req, res) => {
    res.send('Hello, world!');
});


app.listen(4000, () => {
    console.log('server running on port 4000');
})




