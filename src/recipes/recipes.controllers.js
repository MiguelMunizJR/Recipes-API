const Recipes = require("../models/recipes.model");
const Users = require("../models/users.model");
const Categories = require("../models/categories.model");
const Instructions = require("../models/instructions.model");
const Ingredients = require("../models/ingredients.model");
const Types = require("../models/types.model");
const RecipesIngredients = require("../models/recipes_ingredients.model");
const uuid = require("uuid");

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

module.exports = {
  getAllRecipes,
  getRecipeById,
  createRecipe,
  updateRecipe,
  deleteRecipe,
};
