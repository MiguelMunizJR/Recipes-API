const db = require("../utils/database");
const { DataTypes } = require("sequelize");
const Recipes = require("./recipes.model");

const Instructions = db.define("instructions", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  step: {
    type: DataTypes.INTEGER,
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
});

module.exports = Instructions;
