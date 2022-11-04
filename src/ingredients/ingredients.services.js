const ingredientsControllers = require("./ingredients.controllers");

const getAllIngredients = (req, res) => {
  ingredientsControllers
    .getAllIngredients()
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(400).json({
        message: err.message,
      });
    });
};

const getIngredientById = (req, res) => {
  const ingredientId = req.params.ingredient_id;

  ingredientsControllers
    .getIngredientById(ingredientId)
    .then((response) => {
      if (response) {
        res.status(200).json(response);
      } else {
        res.status(404).json({
          message: "Invalid ID",
          ingredientId,
        });
      }
    })
    .catch((err) => {
      res.status(400).json({
        message: err.message,
      });
    });
};

const postIngredient = (req, res) => {
  const { name, typeId, urlImage } = req.body;

  if (name && typeId) {
    ingredientsControllers
      .createIngredient({
        name,
        typeId,
        urlImage,
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
        name: "string",
        typeId: "number",
        urlImage: "string",
      },
    });
  }
};

const patchIngredient = (req, res) => {
  const { name, typeId, urlImage } = req.body;
  const ingredientId = req.params.ingredient_id;

  ingredientsControllers
    .updateIngredient(ingredientId, { name, typeId, urlImage })
    .then((response) => {
      if (response[0]) {
        res.status(200).json({
          message: `Ingredient with ID: ${ingredientId} edited succesfully`,
        });
      } else {
        res.status(404).json({
          message: "Invalid ID",
          ingredientId,
        });
      }
    })
    .catch((err) => {
      res.status(400).json({
        message: err.message,
      });
    });
};

const deleteIngredient = (req, res) => {
  const ingredientId = req.params.ingredient_id;

  ingredientsControllers
    .deleteIngredient(ingredientId)
    .then((response) => {
      if (response) {
        res.status(204).json();
      } else {
        res.status(404).json({
          message: "Invalid ID",
          ingredientId,
        });
      }
    })
    .catch((err) => {
      res.status(400).json({
        message: err.message,
      });
    });
};

const postIngredientToUser = (req, res) => {
  const userId = req.user.id;
  const ingredientId = req.params.ingredient_id;
  const { amount } = req.body;

  if (amount) {
    ingredientsControllers
      .addIngredientToUser({ userId, ingredientId, amount })
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
        amount: "string",
      },
    });
  }
};

module.exports = {
  getAllIngredients,
  getIngredientById,
  postIngredient,
  patchIngredient,
  deleteIngredient,
  postIngredientToUser,
};
