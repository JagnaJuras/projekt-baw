import express from 'express';
import session, { MemoryStore } from 'express-session';
import Keycloak from 'keycloak-connect';

const app = express();

// Set up session
const memoryStore = new MemoryStore();
app.use(session({
    secret: 'mysecret',
    resave: false,
    saveUninitialized: true,
    store: memoryStore
}));

// Set up Keycloak
const keycloak = new Keycloak({
    store: memoryStore
});

// Middleware to protect the API
app.use(keycloak.middleware());

// Public route
app.get('/public', (req, res) => {
    res.send('This is a public endpoint');
});

// Protected route
app.get('/protected', keycloak.protect(), (req, res) => {
    const token = req.kauth.grant.access_token.content;
    const username = token.preferred_username;
    const roles = token.realm_access.roles;

    // Check if the 'admin' role is present in the roles array
    const isAdmin = roles.includes('admin');

    let message = 'This is a protected endpoint';
    if (isAdmin) {
        message += ' - User is an admin';
    } else {
        message += ' - User is not an admin';
    }

    res.json({
        message,
        username,
        roles
    });
});

// Logout route
app.get('/logout', (req, res) => {
    req.logout(); // This clears the authentication information in the session
    res.redirect(keycloak.logoutUrl()); // Redirect to Keycloak logout endpoint
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
