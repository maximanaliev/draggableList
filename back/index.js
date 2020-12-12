const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const goods = require('./app/goods');
const categories = require('./app/categories');
const config = require("./config");

const app = express();
const port = 8000;

app.use(express.json());
app.use(cors());
app.use(express.static('public'));

const run = async () => {
  await mongoose.connect(config.database, config.databaseOptions);

  app.use('/goods', goods);
  app.use('/categories', categories);

  app.listen(port, () => {
    console.log(`HTTP Server started on ${port} port!`);
  });
};

run().catch(e => {
  console.error(e);
});