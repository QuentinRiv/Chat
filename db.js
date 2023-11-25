const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'qrivolla',
  password: 'qrivolla',
  database: 'chat'
});

db.connect((err) => {
  if (err) {
    console.error('Erreur de connexion à MySQL:', err);
  } else {
    console.log('Connecté à MySQL');
  }
});

module.exports = db;
