import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user';

require('dotenv').config();

const router = express.Router();

router.get('/', (req, res) => {
  const { username, password } = req.headers;
  User.query()
    .select('uuid')
    .where({ username, password })
    .then((data) => {
      if (!data.length) {
        res.status(404).send('User not found');
      } else if (data.length) {
        jwt.sign(
          { uuid: data[0].uuid },
          process.env.JWT_SECRET,
          { expiresIn: '30m' },
          (e, token) => {
            if (e) {
              res.status(403).send(`forbidden: ${e}`);
            }
            res.status(200).json({ token });
          },
        );
      }
    })
    .catch((e) => res.status(500).send(`Internal server error: ${e}`));
});
module.exports = router;
