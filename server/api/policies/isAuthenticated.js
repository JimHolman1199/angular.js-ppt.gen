module.exports = function(req, res, next) {
    if(!req.user){
        res.status(403).send('You are not logged in');
    } else {
        next();
    }
};
