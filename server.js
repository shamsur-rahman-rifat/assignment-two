const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./config');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use('/auth', require('./routes/auth'));
app.use('/profile', require('./routes/profile'));
app.use('/todo', require('./routes/todo'));

mongoose.connect(config.database, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(3000, () => {
            console.log(`Server is running on http://localhost:${3000}`);
        });
    })
    .catch(err => console.error('MongoDB connection error:', err));
