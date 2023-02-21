const Blog = require('./blog')
const User = require('./user')
const ReadingList = require('./reading_list')
const Session = require('./session')

User.hasMany(Blog)
User.hasMany(ReadingList)
Blog.hasMany(ReadingList)
Blog.belongsTo(User)
ReadingList.belongsTo(User)
ReadingList.belongsTo(Blog)
User.belongsToMany(Blog, { through: ReadingList, as: 'readings' })
Blog.belongsToMany(User, { through: ReadingList, as: 'in_reading_list_of' })

module.exports = {
    Blog,
    User,
    ReadingList,
    Session
}