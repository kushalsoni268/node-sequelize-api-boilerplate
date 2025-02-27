const express = require('express');
const router = express.Router();

const checkAuthMiddleware = require('../middleware/check-auth');
const transactionController = require('../controllers/TransactionController');

/* Create Transaction */
router.post("/", checkAuthMiddleware.checkAuth, transactionController.create);

/* Update Transaction */
router.put("/:id", checkAuthMiddleware.checkAuth, transactionController.update);

/* Retrieve All Transactions */
router.get('/', checkAuthMiddleware.checkAuth, transactionController.findAll);

/* Find Single Transaction */
router.get('/:id', checkAuthMiddleware.checkAuth, transactionController.findOne);

/* Delete Transaction */
router.delete("/:id", checkAuthMiddleware.checkAuth, transactionController.delete);

/* Delete All Transactions */
router.delete("/", checkAuthMiddleware.checkAuth, transactionController.deleteAll);

module.exports = router;
