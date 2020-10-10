const multer = require('multer');

module.exports = {
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 2 * 1024 * 1024
  },
  fileFilter: (req, file, cb) => {
    const allowedMimes = [
      'image/jpeg',
      'image/pjep',
      'image/png',
      'image/gig'
    ];

    if(allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } 
    else {
      cb(new Error('Invalid file type.'));
    }
  }
}