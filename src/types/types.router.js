const router = require("express").Router();
const typeServices = require("./types.services");
const adminMiddleware = require("../middlewares/role.middleware");
const passport = require("passport");
require("../middlewares/auth.middleware")(passport);

router
  .route("/")
  .get(typeServices.getAllTypes)
  .post(
    passport.authenticate("jwt", { session: false }),
    adminMiddleware,
    typeServices.postType
  );

router
  .route("/:id")
  .get(typeServices.getTypeById)
  .delete(
    passport.authenticate("jwt", { session: false }),
    adminMiddleware,
    typeServices.deleteType
  );

module.exports = router;
