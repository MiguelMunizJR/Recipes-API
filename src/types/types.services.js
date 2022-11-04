const typeControllers = require("./types.controllers");

const getAllTypes = (req, res) => {
  typeControllers
    .getAllTypes()
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(400).json({
        message: err.message,
      });
    });
};

const getTypeById = (req, res) => {
  const id = req.params.id;

  typeControllers
    .getTypeById(id)
    .then((response) => {
      if (response) {
        res.status(200).json(response);
      } else {
        res.status(400).json({
          message: `ID: ${id}, invalid`,
        });
      }
    })
    .catch((err) => {
      res.status(400).json({
        message: err.message,
      });
    });
};

const postType = (req, res) => {
  const { name } = req.body;

  if (name) {
    typeControllers
      .createType(name)
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
      message: "Missing Data",
      fields: {
        name: "string",
      },
    });
  }
};

const deleteType = (req, res) => {
  const id = req.params.id;

  typeControllers
    .deleteType(id)
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
  getAllTypes,
  getTypeById,
  postType,
  deleteType,
};
