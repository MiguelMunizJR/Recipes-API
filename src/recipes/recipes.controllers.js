const Recipes = require("../models/recipes.model");
const Users = require("../models/users.model");
const Categories = require("../models/categories.model");
const Instructions = require("../models/instructions.model");
const Ingredients = require("../models/ingredients.model");
const Types = require("../models/types.model");
const RecipesIngredients = require("../models/recipes_ingredients.model");
const UserIngredients = require("../models/users_ingredients.model");
const uuid = require("uuid");
const { Op } = require("sequelize");

//? Obtener todas las recetas
const getAllRecipes = async () => {
  const data = await Recipes.findAll({
    attributes: {
      exclude: ["userId", "categoryId", "createdAt", "updatedAt"],
    },
    include: [
      {
        model: Categories,
      },
      {
        model: Users,
        attributes: ["id", "firstName", "lastName"],
      },
      {
        model: Instructions,
        attributes: ["description", "step"],
      },
      {
        model: RecipesIngredients,
        //? Anidando joins.
        include: {
          model: Ingredients,
          include: {
            model: Types,
          },
        },
      },
    ],
  });
  return data;
};

//? Obtener receta por ID
const getRecipeById = async (id) => {
  const data = await Recipes.findOne({
    where: {
      id,
    },
    attributes: {
      exclude: ["userId", "categoryId", "createdAt", "updatedAt"],
    },
    include: [
      {
        model: Categories,
      },
      {
        model: Users,
        attributes: ["id", "firstName", "lastName"],
      },
      {
        model: Instructions,
        attributes: ["description", "step"],
      },
      {
        model: RecipesIngredients,
        //? Anidando joins.
        include: {
          model: Ingredients,
          include: {
            model: Types,
          },
        },
      },
    ],
  });
  return data;
};

//? Crear receta
const createRecipe = async (data) => {
  const response = await Recipes.create({
    id: uuid.v4(),
    title: data.title,
    description: data.description,
    urlImage: data.urlImage,
    time: data.time,
    portions: data.portions,
    userId: data.userId,
    categoryId: data.categoryId,
    origin: data.origin,
    likes: data.likes,
  });
  return response;
};

//? Actualizar receta
const updateRecipe = async (id, data) => {
  const response = await Recipes.update(data, {
    where: {
      id,
    },
  });
  return response;
};

//? Eliminar receta
const deleteRecipe = async (id) => {
  const data = await Recipes.destroy({
    where: {
      id,
    },
  });
  return data;
};

const getMyRecipes = async (userId) => {
  const userIngredients = await UserIngredients.findAll({
    where: { userId },
  });

  //? Filtramos el id de los ingredientes que tiene el usuario.
  const filteredIngredients = userIngredients.map((obj) => obj.ingredientId);

  const recipeIngredients = await RecipesIngredients.findAll({
    where: { ingredientId: { [Op.in]: filteredIngredients } },
  });

  //? Filtramos el id de los ingredientes que requiere la receta.
  const filteredRecipes = recipeIngredients.map((obj) => obj.recipeId);

  const data = await Recipes.findAll({
    where: {
      id: {
        [Op.in]: filteredRecipes,
      },
    },
  });

  return data;
};

module.exports = {
  getAllRecipes,
  getRecipeById,
  createRecipe,
  updateRecipe,
  deleteRecipe,
  getMyRecipes,
};
