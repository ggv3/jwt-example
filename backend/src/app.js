import express from 'express';
import Knex from 'knex';
import jwt from 'jsonwebtoken';
import knexfile from '../knexfile';
import loginController from './controller/loginController';
import apiController from './controller/apiController';

const knex = Knex(knexfile);
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
app.set('trust proxy', 1);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');

  // Request headers you wish to allow
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-Requested-With,content-type',
  );
  // Pass to next layer of middleware
  next();
});

const verifyToken = (req, res, next) => {
  const bearerHeader = req.headers.authorization;
  const bearer = bearerHeader.split(' ');
  const token = bearer[1];
  jwt.verify(token, process.env.JWT_SECRET, (e) => {
    if (e) {
      res.status(403).send(e.message);
    }
    next();
  });
};

app.use('/login', loginController);
app.use('/api', verifyToken, apiController);
app.listen(process.env.PORT, () => {
  knex.migrate.latest();
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${process.env.PORT}!`);
});
