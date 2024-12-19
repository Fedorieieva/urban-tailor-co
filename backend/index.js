const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const prisma = require('./config/prisma');
const user = require('./routes/user');
const appointment = require('./routes/appointments');
const portfolio = require('./routes/portfolios');
const review = require('./routes/reviews');
const cloudinary = require("./routes/cloudinary");
const path = require("path");
require('dotenv').config();

const app = express();
app.use(express.json());

let corsOptions;

if (process.env.NODE_ENV === "production") {
    corsOptions = {
        origin: 'https://social-media-project-f.vercel.app',
        methods: "GET,POST,PUT,DELETE,PATCH",
        credentials: true,
    };
} else {
    corsOptions = {
        origin: 'http://localhost:5173',
        methods: "GET,POST,PUT,DELETE,PATCH",
        credentials: true,
    };
}

app.use(cors(corsOptions));

app.use('/api/users', user);
app.use('/api/appointments', appointment);
app.use('/api/portfolios', portfolio);
app.use('/api/reviews', review);
app.use('/api/cloudinary', cloudinary);

app.get('/', (req, res) => {
    res.send('Hello, world!');
});

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}


app.listen(4000, () => {
    console.log('server running on port 4000');
})




