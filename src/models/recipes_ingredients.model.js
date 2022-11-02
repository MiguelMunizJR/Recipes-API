const db = require("../utils/database");
const { DataTypes } = require("sequelize");
const Recipes = require("./recipes.model");
const Ingredients = require("./ingredients.model");

const RecipesIngredients = db.define("recipes_ingredients", {
  id: {
    primaryKey: true,
    type: DataTypes.UUID,
    allowNull: false,
  },
  amount: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  recipeId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      key: "id",
      model: Recipes,
    },
    field: "recipe_id",
  },
  ingredientId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      key: "id",
      model: Ingredients,
    },
    field: "ingredient_id",
  },
});

module.exports = RecipesIngredients;
