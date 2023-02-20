const {Blog} = require("../models");
const routerAuthors = require('express').Router()
const { sequelize } = require('../util/db');

routerAuthors.get('/', async (req, res) => {
    const authors = await Blog.findAll({
        attributes: [
            'author',
            [sequelize.fn('count', sequelize.col('id')), 'articles'],
            [sequelize.fn('sum', sequelize.col('likes')), 'likes'],
        ],
        group: 'author',
        order: sequelize.literal('likes DESC'),
    });

    res.json(authors);
})



module.exports = routerAuthors