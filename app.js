const express = require('express');
const session = require('express-session');
const http = require('http');
const bodyParser = require('body-parser');
const socketConfig = require('./sockets');
const db = require('./db');
const setupRoutes = require('./routes');
const app = express();
const server = http.createServer(app);



app.use(express.json());

// Configuration de bodyParser
app.use(bodyParser.urlencoded({ extended: false }));

// Serve static files from the "public" directory
app.use(express.static('public'));

// Configuration des sessions
app.use(session({
    secret: 'votre_secret_ici', // Choisissez une chaîne de caractères secrète
    resave: false,
    saveUninitialized: true
}));

// Setup des routes
setupRoutes(app, db);

// Configuration de Socket.io
socketConfig(server);

// Démarrage du serveur
server.listen(3000, () => {
    console.log('listening on *:3000');
});
