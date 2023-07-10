const Sequelize = require("sequelize");

const sequelize = new Sequelize('UniDBCourseSchema', 'dbc_prj', 'testpass123', {
  host: '127.0.0.1',
  dialect: 'mysql',
  port: 3306,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

const db = {};

const f = async () => {
try {
  await sequelize.authenticate();
  
} catch (error) {
  console.error('Unable to connect to the database:', error);
}
}

f();


module.exports = { sequelize, Sequelize };