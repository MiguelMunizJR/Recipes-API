const db = require("../utils/database");
const { DataTypes } = require("sequelize");
const Users = require("./users.model");
const Categories = require("./categories.model");

const Recipes = db.define("recipes", {
  id: {
    primaryKey: true,
    type: DataTypes.UUID,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    //? Con esto validamos que la longitud minima debe ser 5 o mayor a 5.
    validate: {
      min: 5,
    },
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  urlImage: {
    type: DataTypes.STRING,
    validate: {
      // isUrl: true,
    },
    field: "url_image",
  },
  time: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  portions: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    field: "user_id",
    //TODO Las llaves foraneas tienen varias reglas:
    //? Debe contener la tabla a la que hace referencia en singular.
    //? Debe terminar con el subfijo "id".
    references: {
      key: "id",
      model: Users,
    },
  },
  categoryId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: "category_id",
    references: {
      key: "id",
      model: Categories
    },
  },
  origin: {
    type: DataTypes.STRING,
  },
  likes: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
});

module.exports = Recipes;
