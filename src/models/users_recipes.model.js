const db = require("../utils/database");
const { DataTypes } = require("sequelize");
const Users = require("./users.model");
const Recipes = require("./recipes.model");

const UsersRecipes = db.define("users_recipes", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
  },
  favorite: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      key: "id",
      model: Users,
    },
    field: "user_Id",
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
});

module.exports = UsersRecipes;
