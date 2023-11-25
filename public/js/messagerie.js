
console.log("Ceci est ", window.AppData.username);

var socket = io({
    query: {
        username: window.AppData.username
    }
});


var messages = document.getElementById('messages');
var form = document.getElementById('form');
var input = document.getElementById('input');

var username = window.AppData.username

form.addEventListener('submit', function(e) {
    e.preventDefault();
    if (input.value) {
    var monjason = {"firstName":username, "message":input.value} 
    socket.emit('chat message', monjason);
    input.value = '';
    }
});

socket.on('chat message', function(msg) {
var item = document.createElement('li');
item.textContent = msg;
messages.appendChild(item);
window.scrollTo(0, document.body.scrollHeight);
});

function loadUserList() {
    fetch('/users')
        .then(response => response.json())
        .then(users => {
            const userListDiv = document.querySelector('.user-list'); // Sélectionne l'élément avec la classe 'user-list'
            userListDiv.innerHTML = ''; // Effacer la liste existante

            users.forEach(user => {
                const userDiv = document.createElement('div');
                userDiv.className = 'user';
                userDiv.textContent = user.username;
                // Ajouter un écouteur d'événements si nécessaire
                userListDiv.appendChild(userDiv);
            });
        })
        .catch(error => console.error('Erreur lors du chargement des utilisateurs:', error));
}

// Appeler cette fonction au chargement de la page ou après la connexion de l'utilisateur
loadUserList();


// Appeler cette fonction au chargement de la page ou après la connexion de l'utilisateur
loadUserList();
