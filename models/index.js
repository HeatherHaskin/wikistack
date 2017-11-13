var Sequelize = require('sequelize');
var dbConnection = new Sequelize('postgres://localhost:5432/wikistack', {
  logging: false
});


const Page = dbConnection.define('pages', {
	title: {type: Sequelize.STRING, allowNull: false},
  urlTitle: {type: Sequelize.STRING, allowNull: false},
  content: {type: Sequelize.TEXT, allowNull: false},
  status: {type: Sequelize.BOOLEAN},
  date: {type: Sequelize.DATE, defaultValue: Sequelize.NOW}
});

const User = dbConnection.define('users', {
  name: {type: Sequelize.STRING, allowNull: false},
  email: {type: Sequelize.STRING, allowNull: false, validate: {isEmail: true}},
});

module.exports = {
  dbConnection: dbConnection,
  Page: Page,
  User: User
};


