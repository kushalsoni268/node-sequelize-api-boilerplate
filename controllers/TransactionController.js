const { Transaction } = require('../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op

const Helper = require('../helpers/helper');

/* Create Transaction */
exports.create = async (req, res) => {
    try {
        /* Validate request */
        if (!req.body.bill_no) {
            var msg = "Bill no. field is required.";
            Helper.fail(req, res, [], msg, 400);
            return;
        }

        /* Create a Transaction */
        const transaction = {
            bill_no: req.body.bill_no ? req.body.bill_no : null,
            name: req.body.name ? req.body.name : null,
            date: req.body.date ? req.body.date : null,
            type: req.body.type ? req.body.type : null
        };

        /* Store Transaction */
        const data = await Transaction.create(transaction);

        var msg = "Transaction has been created successfully.";
        Helper.success(req, res, data, msg);
    } catch (err) {
        var msg = err.message || "Oops, something went wrong...";
        Helper.fail(req, res, [], msg, 500);
    }
};

/* Update Transaction */
exports.update = async (req, res) => {
    try {
        const id = req.params.id;

        const updateData = await Transaction.update(req.body, {
            where: { id: id }
        });

        if (updateData == 1) {
            const data = await Transaction.findByPk(id);
            var msg = "Transaction has been updated successfully.";
            Helper.success(req, res, data, msg);
        } else {
            var msg = "Transaction not found.";
            Helper.fail(req, res, [], msg, 404);
        }
    } catch (err) {
        var msg = err.message || "Oops, something went wrong...";
        Helper.fail(req, res, [], msg, 500);
    }
}
   
/* Retrieve All Transactions */
exports.findAll = async (req, res) => {
    try {
        const name = req.query.name;
        var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;
        const data = await Transaction.findAll({ 
            where: condition,
            order: [
                ['id', 'DESC']
            ],
        });
        Helper.success(req, res, data);
    } catch (err) {
        var msg = err.message || "Oops, something went wrong...";
        Helper.fail(req, res, [], msg, 500);
    }
};

/* Find Single Transaction */
exports.findOne = async (req, res) => {
    try {
        const data = await Transaction.findByPk(req.params.id);
        if (!data) {
            var msg = "Transaction not found.";
            Helper.fail(req, res, [], msg, 404);
            return;
        }
        Helper.success(req, res, data);
    } catch (err) {
        var msg = err.message || "Oops, something went wrong...";
        Helper.fail(req, res, [], msg, 500);
    }
};

/* Delete Transaction */
exports.delete = async (req, res) => {
    try {
        const id = req.params.id;
        const deleteData = await Transaction.destroy({
            where: { id: id }
        });

        if (deleteData == 1) {
            var msg = "Transaction has been deleted successfully.";
            Helper.success(req, res, [], msg);
        } else {
            var msg = "Transaction not found.";
            Helper.fail(req, res, [], msg, 404);
        }
    } catch (err) {
        var msg = err.message || "Oops, something went wrong...";
        Helper.fail(req, res, [], msg, 500);
    }
};

/* Delete All Transactions */
exports.deleteAll = async (req, res) => {
    try {
        const deleteData = await Transaction.destroy({
            where: {},
            truncate: false
        });
        
        var msg = `${deleteData} Transactions have been deleted successfully.`;
        Helper.success(req, res, [], msg);
    } catch (err) {
        var msg = err.message || "Oops, something went wrong...";
        Helper.fail(req, res, [], msg, 500);
    }
};