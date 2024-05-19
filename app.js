const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv'); // Import dotenv package
const connectDB = require('./config/db');
const sleepRoutes = require('./route/sleep');

dotenv.config(); 

const app = express();

// Connect to the database
connectDB();

app.use(bodyParser.json());
app.use('/sleep', sleepRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
