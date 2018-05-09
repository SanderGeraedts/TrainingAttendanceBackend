const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');

const personRoutes = require('./routes/persons');
const practiceRoutes = require('./routes/practices');

const app = express();
const port = process.env.PORT || 3000;

// Connects DB
mongoose.connect('mongodb://localhost/attendance');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

// Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Set Static Path
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());

// Routes
app.use('/api/persons', personRoutes);
app.use('/api/practices', practiceRoutes);

// Starts server
app.listen(port, function () {
    console.log('Server starter on port ' + port + '...');
});