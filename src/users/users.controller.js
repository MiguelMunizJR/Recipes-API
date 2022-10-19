const Users = require('../models/users.model');

const getUsers = async () => {
  const data = await Users.findAll();
  return data;
};