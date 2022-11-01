const db = require("../utils/database");
const { DataTypes } = require("sequelize");

const Types = db.define(
  "types",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    //? Evita que sequelize agregue la columna de "createdAt" y "updatedAt".
    timestamps: false,
  }
);

module.exports = Types;
