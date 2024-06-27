# Keycloak React App

This project is a simple React application secured with Keycloak. It includes a homepage, a secured page, and an admin panel that is accessible only to users with the "admin" role.

## Features

- **Home Page**: Displays the logged-in user's role and a link/button to log in.
- **Secured Page**: Accessible only to authenticated users.
- **Admin Panel**: Accessible only to users with the "admin" role.

## Setup and Installation

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [Keycloak](https://www.keycloak.org/) server

### Keycloak Configuration

1. Set up a Keycloak server and create a new realm `keycloak-react-auth`.
2. Create a new client in the realm:
   - Client ID: `react-auth`
   - Client Protocol: `openid-connect`
   - Access Type: `public`
   - Valid Redirect URIs: `http://localhost:5173/*`
   - Web origins: `http://localhost:5173`
3. Create roles:
   - `admin`
4. Create users and assign roles as needed.

### Installation

1. Clone the repository:

    ```bash
   git clone https://github.com/JagnaJuras/projekt-baw
   cd vite-project
   npm install
    ```
2. Run the Frontend part:
    ```bash
   npm run dev
    ```
2. Run the API part:
    ```bash
   cd api
   node server.js
    ```