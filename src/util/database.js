const Sequelize = require('sequelize');

const dbUser = process.env.DB_USER || 'root'
const dbPass = process.env.DB_PASS
const dbName = process.env.DB_NAME

const host = process.env.DB_HOST || 'localhost'
const port = process.env.DB_PORT || 3305

// Connection DB
const sequelize = new Sequelize(dbName, dbUser, dbPass, {
    dialect: 'mysql',
    host,
    port,
    define: {
        timestamps: false
    }
}
);

// Test DB
// sequelize.authenticate()
//     .then(() => console.log('Database connected...'))
//     .catch(err => console.log('Error: ' + err))

module.exports = sequelize;
global.sequelize = sequelize;