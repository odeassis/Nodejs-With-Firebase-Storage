var admin = require("firebase-admin");

var serviceAccount = require('../config/keyFile.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "https://integrating-with-react.firebaseio.com"
});
