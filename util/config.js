require('dotenv').config()

//handling the environment variables
module.exports = {
    DATABASE_URL: process.env.DATABASE_URL,
    PORT: process.env.PORT || 3001,
}