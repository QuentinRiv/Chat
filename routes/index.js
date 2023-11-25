const fs = require('fs');
const path = require('path');

module.exports = (app, db) => {
  app.post('/new_user', (req, res) => {
    const user = { 
        username: req.body.username, 
        password: req.body.password 
    };
    console.log('ooooooooo', user);
    const sql = 'INSERT INTO users SET ?';
    db.query(sql, user, (err, result) => {
      if (err) {
          console.error("Erreur lors de l'ajout de l'utilisateur :", err);
          if (err.code === 'ER_DUP_ENTRY') {
              // ER_DUP_ENTRY est juste un exemple. Utilisez le code d'erreur approprié.
              res.status(409).json({ error: "L'utilisateur existe déjà" });
          } else {
              res.status(500).json({ error: "Erreur lors de l'ajout de l'utilisateur" });
          }
      } else {
          console.log("Tout bon !");
          res.json({ message: 'Utilisateur ajouté' });
      }
  });
  
  
});


  app.get('/recuperer-utilisateurs', (req, res) => {
    const sql = 'SELECT * FROM users';
    db.query(sql, (err, results) => {
      if (err) throw err;
      res.json(results);
    });
  });

  app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Requête SQL pour trouver l'utilisateur par son username
    const sql = 'SELECT * FROM users WHERE username = ?';
    db.query(sql, [username], (err, results) => {
        if (err) {
            // Gérer les erreurs de la base de données
            console.error("Erreur lors de la recherche de l'utilisateur :", err);
            res.status(500).json({ error: "Erreur interne du serveur" });
            return;
        }

        if (results.length === 0) {
            // Aucun utilisateur trouvé avec ce nom d'utilisateur
            res.status(401).json({ error: "Utilisateur non trouvé" });
        } else {
            // Vérifier si le mot de passe est correct
            // (Assurez-vous d'utiliser un hachage pour les mots de passe dans une application réelle)
            if (results[0].password === password) {
                // Stockage du username dans la session
                req.session.username = username;
                console.log(req.session.username);
                res.json({ success: "Connexion réussie pour " + req.session.username });
            } else {
                // Mot de passe incorrect
                res.status(401).json({ error: "Mot de passe incorrect" });
            }
        }
    });
});


  // Ajoutez ici d'autres routes si nécessaire
  app.get('/messagerie', (req, res) => {
    try {
        console.log("+++++++++++++++++ : ", req.session.username);
        let content = fs.readFileSync(path.join(__dirname, '..', 'public', 'messagerie.html'), 'utf8');
        const replacedContent = content.replace("{{ username }}", req.session.username || 'Utilisateur inconnu');
        console.log(content); // Afficher le contenu original
        console.log(replacedContent); // Afficher le contenu après remplacement

        res.send(replacedContent);
    } catch (err) {
        console.error("Erreur lors de la lecture du fichier messagerie.html :", err);
        res.status(500).send("Erreur interne du serveur");
    }
  });

  app.get('/', (req, res) => {
      res.sendFile(__dirname + '/index.html');
  });

  app.get('/users', (req, res) => {
    const sql = 'SELECT username FROM users WHERE username != ?';
    db.query(sql, [req.session.username], (err, results) => {
        if (err) {
            console.error("Erreur lors de la récupération des utilisateurs :", err);
            res.status(500).send("Erreur interne du serveur");
            return;
        }
        res.json(results);
    });
});

};
