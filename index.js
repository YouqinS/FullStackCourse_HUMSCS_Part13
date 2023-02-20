require('dotenv').config()
const { Sequelize, Model, DataTypes } = require('sequelize')
const express = require('express')
const app = express()
app.use(express.json())

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {},
});

//create schema
class Blog extends Model {
}

Blog.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    author: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    url: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    title: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    likes: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
}, {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'blog'
})
//CREATE TABLE IF NOT EXISTS
Blog.sync()


//select all
app.get('/api/blogs', async (req, res) => {
    const blogs = await Blog.findAll()
    console.log(JSON.stringify(blogs, null, 2))
    res.json(blogs)
})

//select by id
app.get('/api/blogs/:id', async (req, res) => {
    const blog = await Blog.findByPk(req.params.id)
    if (blog) {
        console.log(blog.toJSON())
        res.json(blog)
    } else {
        res.status(404).end()
    }
})


//update
app.put('/api/blogs/:id', async (req, res) => {
    const blog = await Blog.findByPk(req.params.id)
    if (blog) {
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
        await blog.save()
        console.log("after update", blog.toJSON())
        res.json(blog)
    } else {
        res.status(404).end()
    }
})

//delete
app.delete('/api/blogs/:id', async (req, res) => {
    const blog = await Blog.findByPk(req.params.id);
    if (blog) {
        console.log("deleting blog: ", blog.toJSON())
        await blog.destroy();
        res.status(200).end();
    } else {
        res.status(404).end();
    }
});

//create
app.post('/api/blogs', async (req, res) => {
    try {
        const blog = await Blog.create(req.body)
        console.log("created blog: ", blog.toJSON())
        return res.json(blog)
    } catch(error) {
        return res.status(400).json({ error })
    }
})


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

