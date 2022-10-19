const usersServices = require("./users.services");

//* Inicializamos router
const router = require("express").Router();

//* Rutas raiz
router.get("/", usersServices.getAllUsers);

//* Rutas dinamicas por ID
//? 'route' ayuda a hacer distintas peticiones HTTP a una ruta
//? en especifico.
router
  .route("/:id")
  .get(usersServices.getUserById)
  .patch(usersServices.patchUser)
  .delete(usersServices.deleteUser);

module.exports = router;
