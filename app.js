const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();

const todoRoutes = require('./routes/todos');
const userRoutes = require('./routes/users');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api/todos', todoRoutes);
app.use('/api/users', userRoutes);

// Connect to Database
connectDB();

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
