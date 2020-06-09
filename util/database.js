const Sequelize = require('sequelize');

// Connection DB
const sequelize = new Sequelize('shindradb', 'root', '97490Domi*SQL', {
    dialect: 'mysql',
    host: 'localhost',
    port: 3305,
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