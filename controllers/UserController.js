const { User } = require('../models')
const Sequelize = require('sequelize');
const Op = Sequelize.Op

const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Helper = require('../helpers/helper');

/* Sign Up */
exports.signUp = async (req, res) => {
    try{
        const userExist = await User.findOne({
            where:{
                email:req.body.email
            }
        });

        if(userExist){
            var msg = "Email already exists.";
            Helper.fail(req, res, [], msg, 409);
        }else{
            bcryptjs.genSalt(10, function(err, salt){
                bcryptjs.hash(req.body.password, salt, async function(err, hash){
                    const user = {
                        name: req.body.name,
                        email:req.body.email,
                        password: hash,
                        status: 1
                    }
                
                    const data = await User.create(user);
                    var msg = "Signup successfully!";
                    Helper.success(req, res, data, msg);
                });
            });
        }
    } catch (err) {
        var msg = err.message || "Oops, something went wrong...";
        Helper.fail(req, res, [], msg, 500);
    }
};

/* Login */
exports.login = async (req, res) => {
    try{
        const user = await User.findOne({
            where:{
                email: req.body.email
            }
        });

        if(user === null){
            var msg = "Invalid credentials!";
            Helper.fail(req, res, [], msg, 401);
        }else{
            bcryptjs.compare(req.body.password, user.password, function(err, result){
                if(result){
                    const token = jwt.sign({
                        email: user.email,
                        userId: user.id
                    }, process.env.JWT_KEY, function(err, token){
                        user.setDataValue('token', token);
                        var msg = "Login successfully!";
                        Helper.success(req, res, user, msg);
                    });
                }else{
                    var msg = "Invalid credentials!";
                    Helper.fail(req, res, [], msg, 401);
                }
            });
        }
    } catch (err) {
        var msg = err.message || "Oops, something went wrong...";
        Helper.fail(req, res, [], msg, 500);
    }
};

/* User Details */
exports.userDetails = async (req, res) => {
    try {
        const data = await User.findByPk(req.params.id);
        if (!data) {
            var msg = "User not found.";
            Helper.fail(req, res, [], msg, 404);
            return;
        }
        Helper.success(req, res, data);
    } catch (err) {
        var msg = err.message || "Oops, something went wrong...";
        Helper.fail(req, res, [], msg, 500);
    }
};