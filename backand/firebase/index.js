require('dotenv').config();
var admin = require("firebase-admin");
const crypto = require('crypto');

var serviceAccount = require('../config/serviceAccount.json');

// BUCKET do storage - somente o endereco
const BUCKET = process.env.BUCKET_URL;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: BUCKET,
});

// Intancia do BUCKET 
const bucket = admin.storage().bucket();

const uploadFile = (req, res, next) => {

  // Verifica se esta sendo enviado um arquivo
  if(!req.file) return next();

  const file = req.file;

  //Muldar o nome do arquivo
  const filename = `${Math.floor(Math.random() * 65536)
                  }-${crypto
                      .createHash('sha256')
                      .update(file.originalname)
                      .digest('hex').toString()
                  }-${file.originalname}`

  //Criando um aquivo no bucket
  const file_in_bucket = bucket.file(filename);

  // Enviando o arquivo para o bucket
  const stream = file_in_bucket.createWriteStream({
    metadata: {
      contentType: file.mimetype,
    },
  });

  stream.on("error", (e) => {
    console.error(e);
  });

  stream.on("finish", async () => {
    // Tornar o arquivo publico
    await file_in_bucket.makePublic();

    //Obter a url publica
    req.file.firebaseUrl = `https://storage.googleapis.com/${BUCKET}/${filename}`;

    next();
  });

  stream.end(file.buffer);
}

module.exports = uploadFile;