module.exports = function(req, res, next) {
    if(!req.user) {
        res.status(403).send('You are not logged in');
    } else if(req.user.role === 'admin') {
        next();
    } else {
        res.status(403).send('You are not an admin to view this data');
    }
};
