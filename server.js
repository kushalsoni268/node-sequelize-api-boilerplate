const express = require("express");
const cors = require("cors");
require('dotenv').config();
const db = require("./models");

const userRoutes = require('./routes/user');
const transactionRoutes = require('./routes/transaction');

const app = express();

var corsOptions = {
    origin: "http://localhost:8081"
};
app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use('/api/user', userRoutes);
app.use('/api/transaction', transactionRoutes);

/* Drop Existing Tables And Re-Sync Database */
// db.sequelize.sync({ force: true }).then(() => {
//     console.log("Drop and Re-Sync DB.");
// }).catch((err) => {
//     console.log("Failed To Sync DB: " + err.message);
// });

/* Handling Errors */
app.use((err, req, res, next) => {
    // console.log(err);
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";
    res.status(err.statusCode).json({
      message: err.message,
    });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});