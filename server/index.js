const express = require('express');
const { connect } = require('mongoose');
const connectDB = require('./config/db');
const cors = require('cors');

//create the server
const app = express();

// connect to the database
connectDB();

app.use(cors());

//express json
app.use(express.json({ extended: true }));

//import routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/projects', require('./routes/projects'));
app.use('/api/tasks', require('./routes/tasks'));

//app port
const PORT = process.env.port || 4000;

app.listen(PORT, () => {
    console.log(`The server is listening at port ${PORT}`);
});
