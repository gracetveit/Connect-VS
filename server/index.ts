// require('dotenv').config();
// const app = require('./app')
import app from './app';

const PORT = process.env.PORT || 8080;

const init = async () => {
  try {
    app.listen(PORT, () => {
      console.log(`Hosting on https://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

init();
