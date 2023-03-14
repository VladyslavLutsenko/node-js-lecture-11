require('dotenv').config();
const express = require('express');
const cors = require('cors');
const {booksRouter, usersRouter, authRouter} = require('./routes/api');
const morgan = require('morgan');
const errorFilter = require('./middlewares/errorFilter.middleware');
const mongoose = require('mongoose');
require('./strategies/passportStrategy')

const DB_URI = process.env.DB_URI;
const NODE_ENV = process.env.NODE_ENV || 'dev';
const PORT = process.env.PORT || 3000;

const app = express();

const logLevel = NODE_ENV === 'dev' ? 'dev' : 'short';

app.use(cors(), express.json(), morgan(logLevel));

app.use('/public', express.static('public'));
app.use('/api/books', booksRouter);
app.use('/api/users', usersRouter);
app.use('/api/auth', authRouter);
app.use((req, res) => res.send(404).json());

app.use(errorFilter);

const startServer = async () => {
  try {
    await mongoose.connect(DB_URI);
    console.log('database connected');
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
  } catch (error) {
    console.log(`Error occured ${error.message}`);
    process.exit(1);
  }
}

startServer();

// user
// xmX83nrndECc
