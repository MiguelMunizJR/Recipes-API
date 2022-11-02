//* Importar modelos.
const Users = require("./users.model");
const Categories = require("./categories.model");
const Ingredients = require("./ingredients.model");
const Instructions = require("./instructions.model");
const Types = require("./types.model");
const Recipes = require("./recipes.model");
const UsersIngredients = require("./users_ingredients.model");
const UsersRecipes = require("./users_recipes.model");
const RecipesIngredients = require("./recipes_ingredients.model");

const initModels = () => {
  //? hasMany: llave foranea dentro de parentesis.
  //? belongsTo: llave foranea en primer parametro.
  //! Para hacer relaciones M:M tiene que haber una tercera tabla y las relaciones son de 1:M
  //? 1:M:1

  //* Users 1:M Recipes
  Users.hasMany(Recipes)
  Recipes.belongsTo(Users)

  //* Users 1:M UserRecipes
  Users.hasMany(UsersRecipes)
  UsersRecipes.belongsTo(Users)

  //* Recipes 1:M UserRecipes
  Recipes.hasMany(UsersRecipes)
  UsersRecipes.belongsTo(Recipes)

  //* Users 1:M UserIngredients
  Users.hasMany(UsersIngredients)
  UsersIngredients.belongsTo(Users)

  //* Ingredients 1:M UserIngredients
  Ingredients.hasMany(UsersIngredients)
  UsersIngredients.belongsTo(Ingredients)

  //TODO
  //* Recipes M:1 Categories
  Categories.hasMany(Recipes)
  Recipes.belongsTo(Categories)

  //* Ingredients M:1 Types
  Types.hasMany(Ingredients)
  Ingredients.belongsTo(Types)

  //* Recipes 1:M RecipesIngredients
  Recipes.hasMany(RecipesIngredients)
  RecipesIngredients.belongsTo(Recipes)

  //* Ingredients 1:M RecipesIngredients
  Ingredients.hasMany(RecipesIngredients)
  RecipesIngredients.belongsTo(Ingredients)

  //* Recipes 1:M Instructions
  Recipes.hasMany(Instructions)
  Instructions.belongsTo(Recipes)
};

module.exports = initModels;
