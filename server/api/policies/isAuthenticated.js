module.exports = function(req, res, next) {
    if(!req.user){
        res.status(403);
    } else {
        next();
    }
};
