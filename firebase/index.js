var admin = require("firebase-admin");

var serviceAccount = require('../config/keyFile.json');

const BUCKET = "integrating-with-react.appspot.com";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: BUCKET,
});

const bucket = admin.storage().bucket();

const uploadImage = (req, res, next) => {

  if(!req.file) return next();

  const imagem = req.file;

  const imagemName = Date.now() + "." + imagem.originalname.split('.').pop();

  const file = bucket.file(imagemName);

  const stream = file.createWriteStream({
    metadata: {
      contentType: imagem.mimetype,
    },
  });

  stream.on("error", (e) => {
    console.error(e);
  });

  stream.on("finish", async () => {
    // Tornar o arquivo publico
    await file.makePublic();

    //Obter a url publica
    req.file.firebaseUrl = `https://storage.googleapis.com/${BUCKET}/${imagemName}`;

    next();
  });

  stream.end(imagem.buffer)
  
}

module.exports = uploadImage;