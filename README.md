DrinkIt – Full-Stack E-Commerce Application

DrinkIt is a full-stack e-commerce web application developed to demonstrate a complete shopping workflow using React, Spring Boot, Spring Security, JWT, JPA/Hibernate, and MySQL. The project has been deployed to the cloud with Vercel for the frontend and Railway for the backend and database.

🔗 Live Project

Frontend: https://drink-it-five.vercel.app/

Backend API: https://drinkit-production.up.railway.app

GitHub: https://github.com/SHAIKBASHI/DrinkIt

🎯 Project Purpose

The main purpose of DrinkIt is to build and deploy a practical full-stack e-commerce application with separate frontend, backend, and database layers.

The project demonstrates:

Modern React frontend development

REST API development with Spring Boot

JWT-based authentication

Role-based authorization

Database design using MySQL

Shopping cart and wishlist functionality

Address and order management

Admin management functionality

Git/GitHub version control

Cloud database migration

Cloud deployment using Railway and Vercel

Production API configuration and CORS handling

✨ Features

👤 Customer Features

Authentication

User registration

User login

JWT-based authentication

Secure authenticated requests

User profile management

Products

View all products

View product details

Search products

Browse products by category

Trending products

Recommended products

Product availability

Stock information

Product ratings

Offers and product volume information

Product images

Categories

View available categories

Browse products by category

Shopping Cart

Create user cart

Add products to cart

Increase/decrease product quantity

Remove products

View cart

Calculate item totals

Calculate cart totals

Wishlist

Add products to wishlist

View wishlist

Remove products from wishlist

Addresses

Add delivery address

View user addresses

Update address

Delete address

Set default address

Support multiple address types

Orders

Place orders

Store order information

Store order items

View user's previous orders

View order details

Track order status

Payments

Store payment information

Store payment amount

Store payment method

Store payment status

Store payment date

👨‍💼 Admin Features

The application supports role-based access for administrators.

Admin functionality includes:

Admin authentication

Protected admin APIs

Product management

Add products

Update products

Delete products

Manage product availability

Manage product stock

Category management

Add/update/delete categories

View customer orders

Update order status

Manage store information

🛠️ Technology Stack

Frontend

React

Vite

JavaScript

Axios

React Router

CSS / Bootstrap

Backend

Java

Spring Boot

Spring Security

Spring Data JPA

Hibernate

JWT

REST APIs

Maven

Database

MySQL

Deployment

GitHub – Source code

Vercel – React frontend

Railway – Spring Boot backend

Railway MySQL – Production database

🏗️ Application Architecture

                         INTERNET
                            |
              +-------------+-------------+
              |                           |
              v                           v
       Vercel Frontend              Railway Backend
       React + Vite                  Spring Boot
              |                           |
              |       HTTPS REST API      |
              +-------------------------->|
                                          |
                                          | JPA / Hibernate
                                          v
                                  Railway MySQL

Request Flow

User
 |
 v
React / Vite
 |
 | Axios
 |
 v
Spring Boot REST API
 |
 | Spring Security + JWT
 |
 v
Service Layer
 |
 v
JPA Repository
 |
 v
MySQL Database

🔐 Authentication & Security

DrinkIt uses JWT-based authentication.

Login flow

User Login
    |
    v
Spring Boot Authentication
    |
    v
JWT Token Generated
    |
    v
Frontend Stores Token
    |
    v
Token Sent With Protected Requests
    |
    v
JWT Filter Validates Token
    |
    v
Authenticated User

The JWT contains information such as:

Username

User ID

User role

Issued time

Expiration time

The backend uses Spring Security to protect authenticated endpoints and admin operations.

🌐 REST API Areas

The backend provides API areas for:

/api/auth
/api/products
/api/categories
/api/cart
/api/addresses
/api/orders
/api/payments
/api/wishlist
/api/users

Examples:

GET  /api/products
GET  /api/products/trending
GET  /api/products/recommended
GET  /api/products/category/{category}
POST /api/auth/register
POST /api/auth/login
GET  /api/cart/{userId}
POST /api/cart/add
GET  /api/addresses/user/{userId}
GET  /api/orders/user/{userId}

🗄️ Database Design

The production database contains the following main tables:

users
products
categories
addresses
cart
cart_items
orders
order_items
payments
wishlist

Main relationships

User
 |
 +---- Addresses
 |
 +---- Cart
 |       |
 |       +---- Cart Items
 |
 +---- Wishlist
 |
 +---- Orders
         |
         +---- Order Items
         |
         +---- Payment

Products
 |
 +---- Cart Items
 +---- Order Items
 +---- Wishlist

📊 Production Database

The local MySQL database was migrated to Railway MySQL.

The production application uses environment variables for database connection details rather than hard-coded credentials.

Production configuration includes:

DB_URL
DB_USERNAME
DB_PASSWORD
JWT_SECRET
PORT

Sensitive values are intentionally excluded from GitHub.

⚙️ Environment Variables

Frontend

Create:

frontend/.env

with:

VITE_API_URL=https://drinkit-production.up.railway.app/api

The .env file is ignored by Git and should not be committed.

Backend

Production environment variables:

DB_URL
DB_USERNAME
DB_PASSWORD
JWT_SECRET
PORT

Never commit database passwords or JWT secrets to a public repository.

💻 Local Development

Backend

Open a terminal:

cd backend
mvnw.cmd spring-boot:run

The local backend runs on:

http://localhost:9090

Frontend

Open another terminal:

cd frontend
npm install
npm run dev

The frontend normally runs on:

http://localhost:5173

🚀 Production Deployment

GitHub

The complete source code is maintained in:

https://github.com/SHAIKBASHI/DrinkIt

Git workflow:

git add .
git commit -m "Describe your changes"
git push

Railway Backend

The Spring Boot backend is deployed on Railway.

Production backend:

https://drinkit-production.up.railway.app

Build command:

mvn clean package -DskipTests

Start command:

java -jar target/drinkit-backend-0.0.1-SNAPSHOT.jar

The backend connects to the Railway MySQL service through environment variables.

Vercel Frontend

The React frontend is deployed on Vercel.

Production frontend:

https://drink-it-five.vercel.app/

Vercel configuration:

Framework: Vite
Root Directory: frontend
Build Command: npm run build
Output Directory: dist

Production environment variable:

VITE_API_URL=https://drinkit-production.up.railway.app/api

🔄 Production Architecture

                    ┌─────────────────────┐
                    │       GitHub        │
                    │   SHAikBASHI/DrinkIt│
                    └──────────┬──────────┘
                               |
                 ┌─────────────┴─────────────┐
                 |                           |
                 v                           v
        ┌─────────────────┐         ┌─────────────────┐
        │     Vercel      │         │     Railway     │
        │ React Frontend  │ ──────> │ Spring Backend  │
        └─────────────────┘  HTTPS  └────────┬────────┘
                                             |
                                             v
                                    ┌─────────────────┐
                                    │ Railway MySQL   │
                                    │   Database      │
                                    └─────────────────┘

🌍 CORS

The production backend is configured to allow the deployed frontend:

https://drink-it-five.vercel.app

Local development is also supported:

http://localhost:5173

This allows the React application to communicate with the Spring Boot REST APIs from both local development and the deployed environment.

📁 Project Structure

DrinkIt/
│
├── backend/
│   ├── src/
│   │   └── main/
│   │       ├── java/
│   │       │   └── com/drinkit/
│   │       │       ├── config/
│   │       │       ├── controller/
│   │       │       ├── entity/
│   │       │       ├── repository/
│   │       │       └── service/
│   │       └── resources/
│   ├── pom.xml
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── data/
│   │   ├── pages/
│   │   └── ...
│   ├── package.json
│   ├── vite.config.js
│   └── .env
│
└── README.md

🧪 Testing

The application was tested across the main user flows, including:

Registration

Login

JWT authentication

Product browsing

Category browsing

Trending products

Recommended products

Cart operations

Wishlist operations

Address management

Order placement

Order history

Payment information

Admin functionality

Production frontend/backend communication

☁️ Hosting Behavior

After deployment, the application runs on cloud infrastructure.

Closing or shutting down the developer's laptop does not stop the deployed application.

Laptop OFF
   |
   +---- Local npm server       → OFF
   |
   +---- Local Spring Boot      → OFF
   |
   +---- Vercel frontend        → RUNNING
   |
   +---- Railway backend        → RUNNING
   |
   +---- Railway MySQL          → RUNNING

Cloud availability is subject to the hosting provider's plan, usage limits, trial status, and service availability.

🔮 Future Improvements

Possible future improvements include:

Online payment gateway integration

Product reviews and ratings

Coupons and discount management

Inventory alerts

Email/SMS order notifications

Order tracking

Advanced admin analytics

Automated unit and integration tests

Monitoring and logging

Better cloud image storage

Custom domain

Additional production security hardening

🙏 Acknowledgement

Special thanks to my mentor for the guidance, support, and feedback throughout the development and deployment of this project.

The project helped me gain practical experience in full-stack development, REST APIs, authentication, database management, Git/GitHub, and cloud deployment.

👨‍💻 Author

SHAIK BASHI

GitHub:
https://github.com/SHAIKBASHI/DrinkIt

Live Application:
https://drink-it-five.vercel.app/

Backend:
https://drinkit-production.up.railway.app
