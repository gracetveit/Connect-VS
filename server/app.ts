// const app = require('express');
// module.exports = app;
import express from 'express';
import path from 'path';
import morgan from 'morgan';

import auth from './auth';
import api from './api';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('dev'));
app.use(express.static(path.join(process.cwd(), 'public')));

app.use('/auth', auth);
app.use('/api', api);

app.use('*', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'public/index.html'));
});

export default app;
