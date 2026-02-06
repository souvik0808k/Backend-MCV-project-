# MongoDB Setup Guide

## ✅ MongoDB Integration Complete!

Your application has been successfully configured to use MongoDB.

## 📁 New Files Created:
- **src/config/database.js** - MongoDB connection configuration
- **src/models/user.model.js** - Mongoose User schema
- **.env.example** - Environment variables template

## 🔄 Modified Files:
- **src/services/user.service.js** - Updated to use MongoDB (all methods now async)
- **src/controllers/user.controllers.js** - Updated to handle async operations
- **server.js** - Added MongoDB connection
- **package.json** - Added mongoose dependency

## 🚀 How to Run:

### Option 1: Local MongoDB
1. **Install MongoDB locally** (if not already installed)
   - Windows: Download from [MongoDB Download Center](https://www.mongodb.com/try/download/community)
   - Or use MongoDB Compass

2. **Start MongoDB service**
   ```bash
   # MongoDB should start automatically on Windows after installation
   # Or start it manually from Services
   ```

3. **Run your application**
   ```bash
   npm start
   ```
   The app will connect to `mongodb://localhost:27017/mvc_app`

### Option 2: MongoDB Atlas (Cloud)
1. **Create a free account** at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

2. **Create a cluster** and get your connection string

3. **Create a .env file** (copy from .env.example)
   ```bash
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/mvc_app?retryWrites=true&w=majority
   ```

4. **Install dotenv package**
   ```bash
   npm install dotenv
   ```

5. **Update server.js** (add at the top)
   ```javascript
   import dotenv from 'dotenv';
   dotenv.config();
   ```

6. **Run your application**
   ```bash
   npm start
   ```

## 📝 Important Changes:

### User Model Schema:
- **_id**: MongoDB ObjectId (auto-generated, replaces numeric id)
- **name**: String (required, min 2 characters)
- **email**: String (required, unique, validated)
- **age**: Number (required, 1-150)
- **createdAt, updatedAt**: Auto-generated timestamps

### API Usage:
When creating/updating users, MongoDB will now:
- Generate `_id` automatically (no need to send id)
- Validate data according to the schema
- Store timestamps automatically

Example POST request:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "age": 25
}
```

The response will include `_id`, `createdAt`, and `updatedAt` fields.

## 🔍 Testing:
Use the same endpoints as before:
- GET /api/users - Get all users
- POST /api/users - Create user
- PUT /api/users/:id - Update user (use MongoDB _id)
- DELETE /api/users/:id - Delete user (use MongoDB _id)

**Note**: The `id` parameter now expects MongoDB ObjectId format (24 hex characters).

## 📦 Dependencies Added:
- mongoose: ^8.x (MongoDB ODM)
