const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    //read header token
    const token = req.header('x-auth-token');

    //is there a token?
    if (!token)
        return res.status(401).json({ msg: 'You have are not allowed here' });

    //validate token
    try {
        const cipher = jwt.verify(token, process.env.SECRET);
        req.user = cipher.user;
        next();
    } catch (error) {
        res.status(401).json({ msg: 'Token not valid' });
    }
};
