const categoriesControllers = require("./categories.controllers");

const getAllCatgories = (req, res) => {
  categoriesControllers
    .getAllCatgories()
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(400).json({
        message: err.message,
      });
    });
};

const getCategoryById = (req, res) => {
  const id = req.params.id;

  categoriesControllers
    .getCategoryById(id)
    .then((response) => {
      if (response) {
        res.status(200).json(response);
      } else {
        res.status(404).json({
          message: `ID: ${id}, not exist`,
        });
      }
    })
    .catch((err) => {
      res.status(400).json({
        message: err.message,
      });
    });
};

const postCategory = (req, res) => {
  const { name } = req.body;

  if (name) {
    categoriesControllers
      .createCategory(name)
      .then((response) => {
        res.status(201).json(response);
      })
      .catch((err) => {
        res.status(400).json({
          message: err.message,
        });
      });
  } else {
    res.status(400).json({
      message: "Invalid Data",
      fields: {
        name: "string",
      },
    });
  }
};

const deleteCategory = (req, res) => {
  const id = req.params.id;

  categoriesControllers
    .deleteCategory(id)
    .then((response) => {
      if (response) {
        res.status(204).json();
      } else {
        res.status(404).json({
          message: "Invalid ID",
        });
      }
    })
    .catch((err) => {
      res.status(400).json({
        message: err.message,
      });
    });
};

module.exports = {
  getAllCatgories,
  getCategoryById,
  postCategory,
  deleteCategory,
};
