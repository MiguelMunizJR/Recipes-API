const categoriesServices = require("./categories.services");
const router = require("express").Router();
const passport = require("passport");
require("../middlewares/auth.middleware")(passport);

router
  .route("/")
  .get(categoriesServices.getAllCatgories)
  .post(
    passport.authenticate("jwt", { session: false }),
    categoriesServices.postCategory
  ); //TODO hacerla protegida por el administrador

router
  .route("/:id")
  .get(categoriesServices.getCategoryById)
  .delete(
    passport.authenticate("jwt", { session: false }),
    categoriesServices.deleteCategory
  ); //TODO hacerla protegida por el administrador

module.exports = router;
