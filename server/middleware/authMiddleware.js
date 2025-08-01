const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) return res.status(401).json({ message: "Not authorized, no token" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // optional: attach user info to request
        next();
    } catch (err) {
        res.status(401).json({ message: "Not authorized, token failed" });
    }
};

module.exports = protect;
