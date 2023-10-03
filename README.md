# Renvo Shop: E-Commerce Web Application

## Description

Renvo Shop is an e-commerce web application built with React, Redux Toolkit (RTK), RTK Query, Express.js, PostgreSQL, JWT authentication, and Nodemailer for email functionalities. The platform provides users with a seamless shopping experience, allowing registration, product browsing, cart management, and order placement. Admins have robust controls for managing products, orders, and user accounts.

## Features

### User Features

1. **Registration and Confirmation:**

   - Users can register by providing necessary information.
   - Confirmation email is sent for account verification.

2. **Product Browsing:**

   - Users can view all products and filter them by category, price range, and availability.

3. **Cart Management:**

   - Users can add multiple products to the cart.
   - Increment or decrement product quantities, respecting product availability.
   - Order placement requires transaction ID and payment number.

4. **Order Processing:**
   - Order requests go to the admin panel for approval.
   - Admin verifies transaction ID and payment number before confirming the order.
   - Admin can change the order status.

### Admin Features

1. **Product Management:**

   - Admins can add, update, and delete products.

2. **Order Filtering:**

   - Admins can filter orders based on order status and view recent orders.

3. **User Account Restoration:**

   - Users can restore accounts via email verification and a random code.
   - Password reset after entering the correct code.

4. **Pagination:**
   - Implemented pagination for better user experience (10 products per page).

## Technologies Used

- React: Front-end library for building responsive user interfaces.
- Redux Toolkit (RTK) and RTK Query: State management and efficient data fetching.
- Express.js: Backend framework for creating API endpoints.
- PostgreSQL: Relational database for data storage.
- JWT Authentication: Ensures secure user authentication.
- Nodemailer: Used for sending confirmation and restoration emails.

## How to Run

1. Clone the repository: `https://github.com/nafiulhasanhamim/RenvoShop`
2. Install dependencies: `npm install`
3. Set up environment variables, including PostgreSQL connection details and JWT secret.
4. Run the server: `npm start`
