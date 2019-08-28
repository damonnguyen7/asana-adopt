const fs = require('fs');
const sharp = require('sharp');

module.exports = function resize(path, format, width, height) {
  let transformImage = sharp();
  if (format) transformImage = transformImage.toFormat(format);
  if (width || height) transformImage = transformImage.resize(width, height);

  const readStream = fs.createReadStream(path);
  return readStream.pipe(transformImage);
};