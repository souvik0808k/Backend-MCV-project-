// Service layer for user business logic
import User from '../models/user.model.js';

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
      const newUser = await User.create(userData);
      return {
        success: true,
        message: "User created successfully",
        data: newUser
      };
    } catch (error) {
      return {
        success: false,
        message: error.message
      };
    }
  },

  // Update user
  async update(id, userData) {
    try {
      const user = await User.findByIdAndUpdate(
        id,
        userData,
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
