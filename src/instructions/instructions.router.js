const router = require("express").Router();
const instructionServices = require("./instructions.services");
const passport = require("passport");
require("../middlewares/auth.middleware")(passport);

router
  .route("/")
  .get(instructionServices.getAllInstructions)
  .post(
    passport.authenticate("jwt", { session: false }),
    instructionServices.postInstruction
  );

router
  .route("/:instruction_id")
  .get(instructionServices.getInstructionById)
  .patch(
    passport.authenticate("jwt", { session: false }),
    instructionServices.patchInstruction
  )
  .delete(
    passport.authenticate("jwt", { session: false }),
    instructionServices.deleteInstruction
  );

module.exports = router;
