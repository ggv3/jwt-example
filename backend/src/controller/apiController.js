import express from 'express';

const router = express.Router();

router.get('/beer', (req, res) => {
  res.status(200).send('BEER!');
});

module.exports = router;
