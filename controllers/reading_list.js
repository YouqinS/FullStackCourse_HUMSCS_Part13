const readingListsRouter = require('express').Router()
const { ReadingList } = require('../models')
const { tokenExtractor } = require('../util/middleware')

readingListsRouter.post('/', async (req, res) => {
    await ReadingList.create({
        ...req.body,
        read: false
    })
    res.status(200).end()
})

readingListsRouter.put('/:id', tokenExtractor, async (req, res) => {
    const readingList = await ReadingList.findByPk(req.params.id)
    if (!readingList) {
        return res.status(400).json({ error: 'invalid blog id' })
    }

    if (readingList.userId !== req.decodedToken.id) {
        return res.status(400).json({ error: 'operation not allowed' })
    }

    readingList.read = req.body.read
    const updatedReading = await readingList.save()

    res.json(updatedReading)
})

module.exports = readingListsRouter