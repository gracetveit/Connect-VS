// const app = require('express');
// module.exports = app;
import express from 'express';
import path from 'path';
import morgan from 'morgan';

const app = express();

app.use(morgan('dev'));
app.use(express.static(path.join(process.cwd(), 'public')));

app.use('*', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'public/index.html'));
});

export default app;
