const {Blog} = require("../models");
const jwt = require("jsonwebtoken");
const { SECRET } = require('./config')

const blogFinder = async (req, res, next) => {
    req.blog = await Blog.findByPk(req.params.id)
    next()
}

const errorHandler = (error, _req, res, next) => {
    console.log(error);

    if (error.name === 'SequelizeValidationError') {
        return res.status(400).json({error: error.message});
    }

    if (error.name === 'SequelizeDatabaseError') {
        return res.status(400).json({error: error.message});
    }

    if (error.name === 'SequelizeUniqueConstraintError') {
        return res.status(400).json({error: error.message});
    }

    if (error.message.includes('not found')) {
        return res.status(404).json({error: error.message});
    }
    next(error);
};

const tokenExtractor = (req, res, next) => {
    const authorization = req.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        try {
            req.decodedToken = jwt.verify(authorization.substring(7), SECRET)
        } catch{
            return res.status(401).json({ error: 'token invalid' })
        }
    }  else {
        return res.status(401).json({ error: 'token missing' })
    }
    next()
}


module.exports = {
    blogFinder,
    errorHandler,
    tokenExtractor
};