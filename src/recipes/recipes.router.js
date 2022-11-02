const router = require("express").Router();
const recipesServices = require("./recipes.services");
const passport = require("passport");
require("../middlewares/auth.middleware")(passport);

//* /api/v1/recipes
//* /api/v1/recipes/:recipe_id

router
  .route("/")
  .get(recipesServices.getAllRecipes)
  .post(
    passport.authenticate("jwt", { session: false }),
    recipesServices.createRecipe
  );

router
  .route("/:recipe_id")
  .get(recipesServices.getRecipeById)
  .patch(
    passport.authenticate("jwt", { session: false }),
    recipesServices.patchRecipe
  )
  .delete(
    passport.authenticate("jwt", { session: false }),
    recipesServices.deleteRecipe
  );

module.exports = router;
