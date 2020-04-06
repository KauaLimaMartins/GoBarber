const multer = require('multer');
const crypto = require('crypto');
const { extname, resolve } = require('path');

module.exports = {
  storage: multer.diskStorage({
    destination: resolve(__dirname, '..', '..', 'temp', 'uploads'),
    filename: (request, file, callback) => {
      // Parametes: 1º number of random bytes
      // 2º Callback
      crypto.randomBytes(16, (err, response) => {
        if (err) return callback(err);

        // The "null" is necessary because the "callback" receives an error as the first parameter
        // The second parameter is the file name
        return callback(
          null,
          response.toString('hex') + extname(file.originalname)
        );
      });
    }
  })
};
