const {Blog} = require("../models");


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

module.exports = {
    blogFinder,
    errorHandler,
};