const db = require("../utils/database");
const { DataTypes } = require("sequelize");
const Users = require("./users.model");
const Ingredients = require("./ingredients.model");

const UsersIngredients = db.define("users_ingredients", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
  },
  amount: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      key: "id",
      model: Users,
    },
    field: "user_id",
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

module.exports = UsersIngredients;
