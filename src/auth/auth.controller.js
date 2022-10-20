//* Email y contraseña del usuario
//? El email es unico en mi base de datos

const { getUserByEmail } = require("../users/users.controller");


const loginUser = (email, password) => {
  getUserByEmail(email)
};

module.exports = {

};