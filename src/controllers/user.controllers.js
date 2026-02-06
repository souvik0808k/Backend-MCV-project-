import userService from "../services/user.service.js";

export const getUsers = async (req, res) => {
  const users = await userService.getAll();
  res.json(users);
};

export const createUser = async (req, res) => {
  const user = await userService.create(req.body);
  res.status(201).json(user);
};

export const updateUser = async (req, res) => {
  const user = await userService.update(req.params.id, req.body);
  res.json(user);
};

export const deleteUser = async (req, res) => {
  const result = await userService.remove(req.params.id);
  res.status(204).send();
};
