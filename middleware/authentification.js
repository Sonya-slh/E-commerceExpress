const jwt = require('jsonwebtoken');

const authentification = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }
    jwt.verify(token,process.env.accessKey, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Token is invalid' });
        }
        req.user = decoded;  // L'utilisateur est ajouté ici
        next();
    });
};


module.exports = authentification;
