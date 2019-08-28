const express = require('express');
const router = express.Router();
const path = require('path');

const resize = require('./resize');

router.get('/', function(req, res, next) {
  const imagePath = req.query.imagePath;
  const widthString = req.query.width;
  const heightString = req.query.height;
  const format = req.query.format;

  let width, height;
  if (widthString) width = parseInt(widthString);
  if (heightString) height = parseInt(heightString);

  res.type(`image/${format || 'png'}`)

  resize(path.join(__dirname, '../public', imagePath), format, width, height).pipe(res)
});

module.exports = router;
