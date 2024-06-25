import express from 'express';
import session, { MemoryStore } from 'express-session';
import Keycloak from 'keycloak-connect';

const app = express();
app.use(express.static('public'));


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
    res.send('This is a protected endpoint');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
