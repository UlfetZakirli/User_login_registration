const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
    const authHeader = req.header('Authorization')
    if (!authHeader) {
        return res.status(401).json('Access denied. No token provided!')
    }
    const token = authHeader.split(' ')[1]
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(403).json('Token is invalid!')
        }
        req.userId = decoded._id
        next()
    })
}

module.exports = verifyToken