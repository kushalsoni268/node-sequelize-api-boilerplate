# Node Sequelize API Boilerplate

This Node.js API boilerplate, built with Sequelize ORM, provides a solid foundation for developing RESTful APIs. It includes essential features like user sign-up, login, fetching user details, and complete transaction CRUD operations.

## 📋 Table of Contents

- [About](#user-content-beginner-about)
- [Tech Stack](#user-content-️-tech-stack)
- [Installation](#user-content-️-installation)
- [Run Project](#user-content--run-project)

##  :beginner: About

This project serves as a starting point for creating scalable and efficient APIs using Node.js and Sequelize. It includes:

- User authentication (sign-up & login)
- User detail retrieval
- Full CRUD operations for transactions
- Sequelize for database management and migrations
- Easy extensibility for additional features

## 🛠️ Tech Stack

- Node.js
- Express.js
- Sequelize ORM

## ⚙️ Installation

To set up and install this project, follow these steps:

1. Clone the repository to your local machine:

```bash
git clone https://github.com/kushalsoni268/node-sequelize-api-boilerplate.git
```

2. Navigate to the project directory:

```bash
cd node-sequelize-api-boilerplate
```

3. Install the required dependencies:

```bash
npm install
```

4. Set up environment variables by creating a .env file. Refer to the .env.example file for the required environment variables.

```bash
cp .env.example .env
```

5. Configure your database credentials in the .env file.

6. Set up the database and run migrations:

```bash
npx sequelize-cli db:migrate
```

7. Run seeders:

```bash
npx sequelize-cli db:seed:all
```

## 🚀 Run Project

To start the project, run the following command:

```bash
npm start
```