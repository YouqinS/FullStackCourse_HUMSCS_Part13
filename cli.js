require('dotenv').config();
const { Sequelize, QueryTypes } = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    // dialectOptions: {
    //     ssl: {
    //         require: true,
    //         rejectUnauthorized: false,
    //     },
    // },
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {},
});

const main = async () => {
    try {
        await sequelize.authenticate()
        const blogs = await sequelize.query('SELECT * FROM blogs', {
            type: QueryTypes.SELECT,
        });

        //Executing (default): SELECT 1+1 AS result
        // Executing (default): SELECT * FROM blogs
        // helsinki university: 'fullstack open', 0 likes
        // postgresql.org: 'PostgreSQL', 0 likes
        blogs.forEach((blog) =>
            console.log(`${blog.author}: '${blog.title}', ${blog.likes} likes`)
        );
        sequelize.close();
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

main();