const { Blog, Session } = require('../models')
const jwt = require("jsonwebtoken")
const { SECRET } = require('./config')

const blogFinder = async (req, res, next) => {
    req.blog = await Blog.findByPk(req.params.id)
    next()
}

const errorHandler = (error, _req, res, next) => {
    console.log(error)

    if (error.name === 'SequelizeValidationError') {
        return res.status(400).json({error: error.message})
    }

    if (error.name === 'SequelizeDatabaseError') {
        return res.status(400).json({error: error.message})
    }

    if (error.name === 'SequelizeUniqueConstraintError') {
        return res.status(400).json({error: error.message})
    }

    if (error.message.includes('not found')) {
        return res.status(404).json({error: error.message})
    }
    next(error)
}

const tokenExtractor = (req, res, next) => {
    const authorization = req.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        try {
            req.decodedToken = jwt.verify(authorization.substring(7), SECRET)
            req.token = authorization.substring(7)
        } catch{
            return res.status(401).json({ error: 'token invalid' })
        }
    }  else {
        return res.status(401).json({ error: 'token missing' })
    }
    next()
}

const isTokenValid = async (req, res, next) => {
    console.log("token: ", req.token)
    const session = await Session.findOne({
        where: {token: req.token}
    })

    if (!session) {
        return res.status(401).json({ error: 'token expired!' })
    }

    req.session = session
    next()
}

module.exports = {
    blogFinder,
    errorHandler,
    tokenExtractor,
    isTokenValid: isTokenValid
}