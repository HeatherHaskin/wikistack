var Sequelize = require('sequelize');
var dbConnection = new Sequelize('postgres://localhost:5432/wikistack', {
  logging: false
});

function generateUrlTitle(title){
  if(title){
    return title.replace(/\s+/g, '_').replace(/\W/g, '');
  } else {
    return Math.random().toString(36).substring(2, 7);
  }
}

const Page = dbConnection.define('pages', {
	title: {type: Sequelize.STRING, allowNull: false},
  urlTitle: {type: Sequelize.STRING, allowNull: false},
  content: {type: Sequelize.TEXT, allowNull: false},
  status: {type: Sequelize.BOOLEAN},
  date: {type: Sequelize.DATE, defaultValue: Sequelize.NOW}
},

{
  getterMethods: {
    route: function(){
      return '/wiki/' + this.urlTitle;
    }
  },
  hooks: {
    beforeValidate: (pages) => {
      pages.urlTitle = generateUrlTitle(pages.title);
    }
  }
}


);

const User = dbConnection.define('users', {
  name: {type: Sequelize.STRING, allowNull: false},
  email: {type: Sequelize.STRING, allowNull: false, validate: {isEmail: true}},
});

Page.belongsTo(User, { as: 'author' });

module.exports = {
  dbConnection: dbConnection,
  Page: Page,
  User: User
};


