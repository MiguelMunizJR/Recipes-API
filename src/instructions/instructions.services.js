const instructionControllers = require("./instructions.controllers");

const getAllInstructions = (req, res) => {
  instructionControllers
    .getAllInstructions()
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(400).json({
        message: err.message,
      });
    });
};

const getInstructionById = (req, res) => {
  const instructionId = req.params.instruction_id;

  instructionControllers
    .getInstructionById(instructionId)
    .then((response) => {
      if (response) {
        res.status(200).json(response);
      } else {
        res.status(404).json({
          message: "Invalid ID",
          instructionId
        });
      }
    })
    .catch((err) => {
      res.status(400).json({
        message: err.message,
      });
    });
};

const postInstruction = (req, res) => {
  const { description, step, recipeId } = req.body;

  if (description && step && recipeId) {
    instructionControllers
      .createInstruction({
        description,
        step,
        recipeId,
      })
      .then((response) => {
        res.status(201).json(response);
      })
      .catch((err) => {
        res.status(400).json({
          message: err.message,
        });
      });
  } else {
    res.status(400).json({
      message: "Missing Data",
      fields: {
        description: "string",
        step: "number",
        recipeId: "uuid",
      },
    });
  }
};

const patchInstruction = (req, res) => {
  const { description, step, recipeId } = req.body;
  const instructionId = req.params.instruction_id;

  instructionControllers
    .updateInstruction(instructionId, { description, step, recipeId })
    .then((response) => {
      if (response[0]) {
        res.status(200).json({
          message: `Instruction with ID: ${instructionId} edited succesfully`,
        });
      } else {
        res.status(404).json({
          message: "Invalid ID",
          instructionId
        });
      }
    })
    .catch((err) => {
      res.status(400).json({
        message: err.message,
      });
    });
};

const deleteInstruction = (req, res) => {
  const instructionId = req.params.instruction_id;

  instructionControllers
    .deleteInstruction(instructionId)
    .then((response) => {
      if (response) {
        res.status(204).json();
      } else {
        res.status(404).json({
          message: "Invalid ID",
          instructionId
        });
      }
    })
    .catch((err) => {
      res.status(400).json({
        message: err.message,
      });
    });
};

module.exports = {
  postInstruction,
  getAllInstructions,
  getInstructionById,
  patchInstruction,
  deleteInstruction,
};
