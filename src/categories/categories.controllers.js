const Categories = require("../models/categories.model");

//? Ver todas las categorias
const getAllCatgories = async () => {
  const data = await Categories.findAll();
  return data;
};

//? Ver categoria en especifico
const getCategoryById = async (id) => {
  const data = await Categories.findOne({
    where: {
      id,
    },
  });
  return data;
};

//? Crear categoria
const createCategory = async (name) => {
  const data = await Categories.create({
    name,
  });
  return data;
};

//? Eliminar categoria
const deleteCategory = async (id) => {
  const data = await Categories.destroy({
    where: {
      id,
    },
  });
  return data;
};

module.exports = {
  getAllCatgories,
  getCategoryById,
  createCategory,
  deleteCategory,
};
