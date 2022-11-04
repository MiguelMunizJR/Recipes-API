const router = require("express").Router();
const usersServices = require("./users.services");
const adminValidate = require('../middlewares/role.middleware');

//* Proteger ruta '/'
const passport = require("passport");
require("../middlewares/auth.middleware")(passport);

//! passport.authenticate('jwt', {session: false}),
//TODO /api/v1/users
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  usersServices.getAllUsers
);

//? Ruta de informacion propia del usuario logueado.
//TODO /api/v1/users/me
router
  .route("/me")
  .get(
    passport.authenticate("jwt", { session: false }),
    usersServices.getMyUser
  )
  .patch(
    passport.authenticate("jwt", { session: false }),
    usersServices.patchMyUser
  )
  .delete(
    passport.authenticate("jwt", { session: false }),
    usersServices.deleteMyUser
  );

//TODO /api/v1/users/me



//TODO /api/v1/users/:id
router
  .route("/:id")
  .get(usersServices.getUserById)

  //TODO /api/v1/users/:id RUTAS PROTEGIDAS!
  .patch(
    passport.authenticate("jwt", { session: false }),
    adminValidate,
    usersServices.patchUser
  )
  .delete(
    passport.authenticate("jwt", { session: false }),
    adminValidate,
    usersServices.deleteUser
  );

module.exports = router;
