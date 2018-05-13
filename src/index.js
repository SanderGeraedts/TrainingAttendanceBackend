import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import mongoose from 'mongoose';
import 'babel-polyfill';

import personRoutes from './routes/persons';
import practiceRoutes from './routes/practices';
import authRoutes from './routes/auth';

const app = express();
const port = process.env.PORT || 3000;
const mongodbUri = process.env.MONGODB_URI || 'mongodb://localhost/attendance';

// Connects DB
mongoose.connect(mongodbUri);
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
app.use('/api/auth', authRoutes);

// Starts server
app.listen(port, function () {
    console.log('Server starter on port ' + port + '...');
});