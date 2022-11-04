const recipesControllers = require("./recipes.controllers");

const getAllRecipes = (req, res) => {
  recipesControllers
    .getAllRecipes()
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(400).json({
        message: err.message,
      });
    });
};

const getRecipeById = (req, res) => {
  const id = req.params.id;

  recipesControllers
    .getRecipeById(id)
    .then((response) => {
      if (response) {
        res.status(200).json(response);
      } else {
        res.status(404).json({
          message: "Invalid ID",
        });
      }
    })
    .catch((err) => {
      res.status(400).json({
        message: err.message,
      });
    });
};

const createRecipe = (req, res) => {
  const userId = req.user.id;
  const { title, description, urlImage, time, origin, portions, categoryId } =
    req.body;

  if (title && description && time && portions && categoryId) {
    recipesControllers
      .createRecipe({
        title,
        description,
        urlImage,
        time,
        origin,
        portions,
        categoryId,
        userId,
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
        title: "string",
        description: "string",
        time: "number",
        portions: "number",
        categoryId: "number",
      },
    });
  }
};

const patchRecipe = (req, res) => {
  const { title, description, urlImage, time, portions, origin, categoryId } =
    req.body;
  const id = req.params.id;

  recipesControllers
    .updateRecipe(id, {
      title,
      description,
      urlImage,
      time,
      portions,
      origin,
      categoryId,
    })
    .then((response) => {
      if (response[0]) {
        res.status(200).json({
          message: `Recipe with ID: ${id}, edited succesfully`,
        });
      } else {
        res.status(404).json({
          message: "invalid ID",
          id,
        });
      }
    })
    .catch((err) => {
      res.status(400).json({
        message: err.message,
      });
    });
};

const deleteRecipe = (req, res) => {
  const id = req.params.id;

  recipesControllers
    .deleteRecipe(id)
    .then((response) => {
      if (response) {
        res.status(204).json();
      } else {
        res.status(404).json({
          message: "Invalid ID",
        });
      }
    })
    .catch((err) => {
      res.status(400).json({
        message: err.message,
      });
    });
};

const getUserRecipes = (req, res) => {
  const userId = req.user.id;

  recipesControllers
    .getMyRecipes(userId)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(400).json({
        message: err.message,
      });
    });
};

module.exports = {
  getAllRecipes,
  getRecipeById,
  createRecipe,
  patchRecipe,
  deleteRecipe,
  getUserRecipes,
};
