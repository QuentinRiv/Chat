function saveUsername() {
    const username = document.getElementById('username').value;
    localStorage.setItem('username', username);
    console.log(`BONJOUR ${username}`);
    window.location.href = "messagerigce.html";
}   


document.getElementById('login-button').addEventListener('click', function() {
    handleLogin();
});

function handleLogin() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const loginButton = document.getElementById('login-button');
    const failureIcon = document.getElementById('failure-icon');

    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: username, password: password })
    })
    .then(response => {
        if (!response.ok) {
            // Si la réponse n'est pas OK, on rejette la promesse avec le statut de l'erreur
            return response.json().then(data => Promise.reject(data));
        }
        return response.json();
    })
    .then(data => {
        console.log('Connexion réussie:', data);
        // Redirection vers la page de messagerie en cas de succès
        window.location.href = "/messagerie";
    })
    .catch(error => {
        console.error('Erreur lors de la connexion:', error);
        // En cas d'échec
        loginButton.classList.add('login-failure');
        failureIcon.classList.add('show-failure');
        setTimeout(() => {
            resetLoginButtonState();
        }, 3000); // Réinitialiser l'état du bouton après 3 secondes
    });
}

function resetLoginButtonState() {
    const loginButton = document.getElementById('login-button');
    const failureIcon = document.getElementById('failure-icon');

    loginButton.classList.remove('login-failure');
    failureIcon.classList.remove('show-failure');

    loginButton.innerHTML = 'Connexion <span class="failure-icon" id="failure-icon">✖</span>';
}


document.getElementById('signup-button').addEventListener('click', function() {
    handleSignup();
});

function handleSignup() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

     // Réinitialiser les styles avant d'envoyer la requête
     resetButtonState();

    fetch('/new_user', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: username, password: password })
    })
    .then(response => {
        if (!response.ok) {
            // Si la réponse n'est pas OK, on rejette la promesse avec le statut de l'erreur
            return response.json().then(data => Promise.reject(data));
        }
        return response.json();
    })
    .then(data => {
        console.log('Inscription réussie:', data);
        showSuccessState();
    })
    .catch(error => {
        console.error('Erreur lors de l\'inscription:', error);
        showFailureState();
        setTimeout(resetButtonState, 5000); // Réinitialiser l'état du bouton après 5 secondes
    });
}

function resetButtonState() {
    const signupButton = document.getElementById('signup-button');
    signupButton.classList.remove('signup-success', 'signup-failure');
    signupButton.innerHTML = 'S\'inscrire <span class="validation-icon" id="validation-icon">✔</span><span class="failure-icon" id="failure-icon">✖</span>';
}

function showSuccessState() {
    resetButtonState();

    const signupButton = document.getElementById('signup-button');
    const validationIcon = document.getElementById('validation-icon');

    signupButton.classList.add('signup-success');
    setTimeout(() => {
        if (validationIcon) {
            validationIcon.classList.add('show-validation');
        }
    }, 500);
}

function showFailureState() {
    resetButtonState();

    const signupButton = document.getElementById('signup-button');
    const failureIcon = document.getElementById('failure-icon');

    signupButton.classList.add('signup-failure');
    setTimeout(() => {
        if (failureIcon) {
            failureIcon.classList.add('show-failure');
        }
    }, 500);
}
