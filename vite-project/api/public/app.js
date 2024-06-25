import keycloak from './keycloak.js';

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('loginButton').addEventListener('click', function() {
        login();
    });
});

function login() {
    keycloak.init({ onLoad: 'login-required' })
        .then(function(authenticated) {
            console.log('Authenticated:', authenticated);
            if (authenticated) {
                keycloak.loadUserProfile().then(function(profile) {
                    document.getElementById('welcome').innerText = 'Welcome, ' + profile.firstName;
                }).catch(function(error) {
                    console.error('Failed to load user profile', error);
                });

                fetch('/protected', {
                    headers: {
                        'Authorization': 'Bearer ' + keycloak.token
                    }
                })
                .then(response => response.text())
                .then(data => {
                    document.getElementById('protected').innerText = data;
                })
                .catch(function(error) {
                    console.error('Failed to fetch protected resource', error);
                });
            }
        })
        .catch(function(error) {
            console.error('Failed to initialize Keycloak', error);
        });
}
