// Service layer for user business logic
import User from '../models/user.model.js';
import { createUserDTO, updateUserDTO } from '../dto/user.dto.js';
import { ZodError } from 'zod';

const userService = {
  // Get all users
  async getAll() {
    try {
      const users = await User.find();
      return {
        success: true,
        data: users,
        count: users.length
      };
    } catch (error) {
      return {
        success: false,
        message: error.message
      };
    }
  },

  // Get user by ID
  async getById(id) {
    try {
      const user = await User.findById(id);
      if (!user) {
        return {
          success: false,
          message: "User not found"
        };
      }
      return {
        success: true,
        data: user
      };
    } catch (error) {
      return {
        success: false,
        message: error.message
      };
    }
  },

  // Create new user
  async create(userData) {
    try {
      // Validate input using Zod
      const validatedData = createUserDTO.parse(userData);
      
      const newUser = await User.create(validatedData);
      return {
        success: true,
        message: "User created successfully",
        data: newUser
      };
    } catch (error) {
      // Handle Zod validation errors
      if (error instanceof ZodError) {
        return {
          success: false,
          message: "Validation failed",
          errors: error.errors.map(err => ({
            field: err.path.join('.'),
            message: err.message
          }))
        };
      }
      
      return {
        success: false,
        message: error.message
      };
    }
  },

  // Update user
  async update(id, userData) {
    try {
      // Validate input using Zod
      const validatedData = updateUserDTO.parse(userData);
      
      const user = await User.findByIdAndUpdate(
        id,
        validatedData,
        { new: true, runValidators: true }
      );
      if (!user) {
        return {
          success: false,
          message: "User not found"
        };
      }
      return {
        success: true,
        message: "User updated successfully",
        data: user
      };
    } catch (error) {
      // Handle Zod validation errors
      if (error instanceof ZodError) {
        return {
          success: false,
          message: "Validation failed",
          errors: error.errors.map(err => ({
            field: err.path.join('.'),
            message: err.message
          }))
        };
      }
      
      return {
        success: false,
        message: error.message
      };
    }
  },

  // Delete user
  async remove(id) {
    try {
      const user = await User.findByIdAndDelete(id);
      if (!user) {
        return {
          success: false,
          message: "User not found"
        };
      }
      return {
        success: true,
        message: "User deleted successfully"
      };
    } catch (error) {
      return {
        success: false,
        message: error.message
      };
    }
  }
};

export default userService;
