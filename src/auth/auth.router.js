//* Auth va a contener las rutas de autenticacion y autorizacion.
//? Login
//? Register
//? Recovery password
//? Verify User

const router = require('express').Router();
const { registerUser } = require('../users/users.services');

//* Prefijo
//! /api/v1/auth

router.post("/register", registerUser);





module.exports = router;