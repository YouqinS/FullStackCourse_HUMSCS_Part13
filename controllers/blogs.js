//route handling associated with blogs

const routerBlogs = require('express').Router()

const {Blog, User} = require('../models')
const { Op } = require('sequelize')

const { blogFinder, tokenExtractor, isTokenValid} = require('../util/middleware')

routerBlogs.post('/', tokenExtractor, isTokenValid, async (req, res) => {
    const user = await User.findByPk(req.decodedToken.id)
    const blog = await Blog.create({...req.body, userId: user.id})

    console.log("created blog: ", blog.toJSON())
    return res.json(blog)
})

routerBlogs.get('/', async (req, res) => {
    let where = {}

    if (req.query.search) {
        where[Op.or] = [
            {title: { [Op.substring]: req.query.search}},
            {author: { [Op.substring]: req.query.search}},
        ]
    }

    const blogs = await Blog.findAll({
        attributes: { exclude: ['userId'] },
        include: {
            model: User
        },
        where,
        order: [['likes', 'DESC']]
    })
    console.log(JSON.stringify(blogs, null, 2))
    res.json(blogs)
})


routerBlogs.get('/:id', blogFinder, async (req, res) => {
    if (req.blog) {
        console.log(req.blog.toJSON())
        res.json(req.blog)
    } else {
        res.status(404).end()
    }
})

routerBlogs.delete('/:id', tokenExtractor, isTokenValid, blogFinder, async (req, res) => {
    if (req.blog) {
        console.log("deleting blog: ", req.blog.toJSON())
        await req.blog.destroy()
        res.status(204).end()
    } else {
        res.status(404).end()
    }
})

routerBlogs.put('/:id', blogFinder, async (req, res) => {
    if (req.blog) {
        const blog = req.blog
        console.log("before update: " , blog.toJSON())
        console.log("new data: " , req.body)
        if (req.body.author) {
            blog.author = req.body.author
        }
        if (req.body.url) {
            blog.url = req.body.url
        }
        if (req.body.title) {
            blog.title = req.body.title
        }
        if (req.body.likes) {
            blog.likes = req.body.likes
        }
        await blog.save()
        console.log("after update", blog.toJSON())
        res.json(blog)
    } else {
        res.status(404).end()
    }
})

module.exports = routerBlogs