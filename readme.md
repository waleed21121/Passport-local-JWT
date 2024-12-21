# Passport Local and JWT Authentication Project

This project demonstrates a simple authentication system using Passport.js with both local strategy and JSON Web Token (JWT) authentication. It provides secure user login and registration, along with token-based authorization for protected routes, utilizing asymmetric key cryptography for JWT.

## Features

- User registration and login using Passport.js local strategy.
- Token-based authentication using JWT with public-private key pairs for secure API access.
- Protected routes accessible only with valid JWTs.
- Simple user management with in-memory or database storage.

## Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or later recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/waleed21121/Passport-local-JWT.git
   cd passport-jwt-auth
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the project root and add the following variables:
   ```env
   PORT=3000
   ```
   Create two files for the public key and private key in the main directory
   You can generate the keys using the crypto library or any online generator (https://travistidwell.com/jsencrypt/demo/)
   The length of the key must be greater than 2048 bytes for the 'RS256' algorithm

4. Start the server:
   You can use nodemon to start the server
   ```bash
   nodemon app.js
   ```

   The server will run on `http://localhost:3000`.

## Endpoints

### Public Endpoints

#### `POST /register`
Registers a new user.

- Request Body:
  ```json
  {
    "username": "example",
    "password": "password123"
  }
  ```
- Response:
  ```json
  {
    "message": "User registered successfully",
    "user": {
        "username": "example",
        "hash": "qw/cdoSL example"
    }
  }
  ```

#### `POST /login`
Authenticates the user and provides a JWT.

- Request Body:
  ```json
  {
    "username": "example",
    "password": "password123"
  }
  ```
- Response:
  ```json
  {
    "token": "your.jwt.token"
  }
  ```

### Protected Endpoints

#### `GET /protected`
Access a protected resource.

- Headers:
  ```
  Authorization: Bearer your.jwt.token
  ```
- Response:
  ```json
  {
    "message": "This is a protected route",
    "user": { "id": 1, "username": "example" }
  }
  ```

## How It Works

1. **Registration**:
   - Users register with a username and password.
   - Passwords are hashed before being stored.

2. **Login**:
   - Users authenticate using their credentials.
   - Upon successful authentication, a JWT is issued, signed with the private key.

3. **Protected Routes**:
   - Access requires a valid JWT passed in the `Authorization` header.
   - Tokens are verified using the public key.

## Dependencies

- [Passport.js](http://www.passportjs.org/): Middleware for authentication.
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken): For generating and verifying JWTs.
- [bcrypt](https://www.npmjs.com/package/bcrypt): For password hashing.
- [Express.js](https://expressjs.com/): Web framework for Node.js.
- [dotenv](https://www.npmjs.com/package/dotenv): For managing environment variables.

