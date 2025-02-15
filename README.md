# FoodFinder

## Project Overview

**FoodFinder** is a web application designed to help users locate restaurants based on their preferences and location (No GPS). The platform provides detailed information about restaurants, including reviews, menus, prices, and business hours. 

The application is structured into three main user roles:

- **Customers**: Can search for restaurants, filter results by location and cuisine type, view detailed restaurant information, and leave reviews.
- **Restaurant Owners**: Can register and manage their restaurant’s information, update menus, and respond to customer feedback.
- **Administrators**: Can manage user accounts, moderate reviews, and oversee platform content.

The system is built using the **MERN stack**:
- **MongoDB**: Database management.
- **Express.js**: Backend framework.
- **ReactJS**: Frontend framework.
- **Node.js**: Server environment.

## Features

- **Restaurant Search and Filtering**: Users can search by name, location, and cuisine type.
- **Detailed Restaurant Information**: Includes operating hours, location, images, reviews, and estimated prices.
- **Review and Rating System**: Users can leave reviews and assign ratings from 1 to 5 stars.
- **Restaurant Management**: Owners can register and update their restaurant information.
- **Admin Panel**: Admins can manage reviews, restaurants, and user accounts.

## System Requirements

To run this project, you need:

- **Node.js** (Download from [nodejs.org](https://nodejs.org/))
- **PostgreSQL** (Ensure a database instance is running)
- **Git** (For version control)
- **ReactJS** (For frontend development)

## Installation & Setup

### 1. Clone the Repository

```sh
git clone https://github.com/your-repo/restaurant-finder.git
cd restaurant-finder
```

### 2. Backend Setup

1. Navigate to the backend directory:

   ```sh
   cd backend
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Configure the database in **db.js** (Located in `/backend`):

   ```js
   const mongoose = require("mongoose");
   mongoose.connect("mongodb://your-database-url", { useNewUrlParser: true, useUnifiedTopology: true });
   ```

4. Start the backend server:

   ```sh
   npm start
   ```

   The server will run on **http://localhost:8080**.

### 3. Frontend Setup

1. Navigate to the frontend directory:

   ```sh
   cd frontend
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Start the frontend application:

   ```sh
   npm start
   ```

   The frontend will run on **http://localhost:4200**.

## Database Configuration

This project relies on **PostgreSQK**. Ensure your database is running and update the connection settings in `db.js`. Also, some database functions must be configured properly to support the application's features.

## Collaborators

- Gabrielm27
- danimendez12

## Project Status

This project is still under development. The main pending tasks involve fully connecting the frontend with the backend, especially regarding API requests and database queries. Some features may not function correctly until these connections are finalized.

## Frontend Styling

The frontend utilizes the **United** theme from [Bootswatch](https://bootswatch.com/united/) for styling.

---
