const path = require('path');
const fs = require('fs');

const multer = require('multer');
const nanoid = require('nanoid');
const config = require('./config');

const tryToCreateDir = async dirName => {
  const dirPath = path.join(config.uploadPath, dirName);

  try {
    await fs.promises.access(dirPath);
  } catch (e) {
    await fs.promises.mkdir(dirPath, {recursive: true});
  }
};

const createMulter = dirName => {
  const storage = multer.diskStorage({
    destination: async (req, file, cb) => {
      await tryToCreateDir(dirName);

      cb(null, config.uploadPath + '/' + dirName);
    },
    filename: (req, file, cb) => {
      const filename = nanoid() + path.extname(file.originalname);

      cb(null, filename);
    }
  });

  return multer({storage});
};

const uploads = createMulter('goods');

module.exports = { uploads };