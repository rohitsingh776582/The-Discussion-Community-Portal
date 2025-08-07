
// pudana code 
const Jwt = require('jsonwebtoken');
exports.verifyToken = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).send('Access denied. No token provided.');
    }
    Jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).send('Invalid or expired token.');
        }
        req.user = user;
        next();
    })
}


exports.isAllreadyAuthenticated = (req, res, next) => {
    const token = req.cookies.token;
    console.log("token: ", token);
    if (token) {
        return res.status(404).send('user has allready loggedin')
    }
    else {
        next();
    }
}


exports.getToken = (req, res) => {
    // req.user is set by verifyToken middleware
    if (!req.user) {
        return res.status(401).json({ message: "User not found" });
    }
    return res.json({
        user: {
            id: req.user.id,           // from JWT payload
            name: req.user.name,
            email: req.user.email
        }
    });
};

