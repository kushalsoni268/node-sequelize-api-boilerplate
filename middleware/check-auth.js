

const jwt = require('jsonwebtoken');
const Helper = require('../helpers/helper');

exports.checkAuth = (req, res, next) => {
    try{
        const token = req.headers.authorization.split(" ")[1]; 
        const decodedToken = jwt.verify(token, process.env.JWT_KEY);
        req.userData = decodedToken;
        next();
    }catch(err){
        // var msg = "Invalid or expired token provided!";
        var msg = "Unauthenticated!";
        Helper.fail(req, res, err, msg, 401);
    }
}