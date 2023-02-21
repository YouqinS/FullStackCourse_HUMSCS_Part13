const logoutRouter = require('express').Router();
const { tokenExtractor, isTokenValid } = require('../util/middleware');

logoutRouter.delete('/', tokenExtractor, isTokenValid, async (req, res) => {
    await req.session.destroy()
    res.status(200).end()
});

module.exports = logoutRouter