# Car Store Management System

**An Express.js application built with TypeScript and MongoDB for managing car inventory and customer orders.**

---

## Live Demo

[**Car Store Management System - Live URL**](https://car-store-a2.vercel.app/)

---

## ✨ Features

- **Car Management**:
  - Add, view, update, delete cars.
  - Filter cars by brand, model, or category.
- **Order Management**:
  - Place customer orders with real-time inventory updates.
  - Calculate total revenue from all orders using MongoDB aggregation.

---

## 🛠️ Technologies

- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose ORM)
- **Language**: TypeScript
- **Development Tools**:
  - **TypeScript Compilation**: tsc
  - **Development Server**: ts-node-dev
  - **Linting**: ESLint with TypeScript support (@typescript-eslint)
  - **Type Definitions**: @types for Express, Node.js

---

## 📝 Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/sarnali3515/car-store-a2
   cd car-store-a2
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a .env file with the following variables:

   ```bash
   PORT=5000
   MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/<dbname>
   ```

4. Start the server:

   ```bash
   npm run start:dev
   ```
