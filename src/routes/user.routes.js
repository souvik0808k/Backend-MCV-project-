import { Router } from "express";
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser
} from "../controllers/user.controllers.js";

import { validate } from "../middlewares/validate.middleware.js";
import {
  createUserDTO,
  updateUserDTO
} from "../dto/user.dto.js";

const router = Router();

router.get("/", getUsers);

router.post(
  "/",
  validate(createUserDTO), // middleware chaining
  createUser
);

router.patch(
  "/:id",
  validate(updateUserDTO),
  updateUser
);

router.delete("/:id", deleteUser);

export default router;

//this file defines the routes for user-related operations and applies validation middleware to ensure that incoming requests conform to the expected data structure defined in the DTOs.
//this file  define all api routes related to user operations, such as fetching users, creating a new user, updating an existing user, and deleting a user. It also applies the validation middleware to ensure that the incoming request data adheres to the defined DTO schemas before reaching the controller logic.
//its main purpose is connect the controllers with http routes and apply validation to incoming requests.