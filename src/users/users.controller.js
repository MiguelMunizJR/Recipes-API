//? Dependencies
const uuid = require("uuid");
const Users = require("../models/users.models");
const hashPass = require("../utils/crypto").hashPass;

const getAllUsers = async () => {
  const data = await Users.findAll();
  return data;
};

const getUserById = async (id) => {
  const data = await Users.findOne({
    where: {
      id: id,
    },
  });
  return data;
};

const createUser = async (data) => {
  const newUser = await Users.create({
    id: uuid.v4(),
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    password: hashPass(data.password),
    phone: data.phone,
    birthday: data.birthday,
    gender: data.gender,
    role: data.role,
    country: data.country,
    status: data.status,
    isVerified: data.isVerified,
  });
  return newUser;
};
