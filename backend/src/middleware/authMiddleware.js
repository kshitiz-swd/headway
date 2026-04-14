const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
    const { token } = req.cookies

    if (!token) {
        return res.status(401).json({ message: 'unauthorized' })
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    req.userId = decoded.id
    next()

}

module.exports = verifyToken