function response(req, res, data, msg, code) {
    var response = {
        'status' : code == 200 ? true : false,
        'code' : code,
        'msg' : msg,
        'version' : '1.0.0',
        'data' : data
    };
    res.status(code).json(response);
}

exports.success = (req, res, data = [], msg = 'Success', code = 200) => {
    response(req, res, data, msg, code);
};

exports.fail = (req, res, data = [], msg = 'Error', code = 203) => {
    response(req, res, data, msg, code);
};