const sequelize = require('../config/connection');
const { User, Blog, Comment } = require('../models');

const userData = require('./userSeed.json');
const blogData = require('./blogSeed.json');
const commentData = require('./commentSeed.json');

const seedDatabase = () => {
    return sequelize.sync({ force: true }).then(() => {
      User.bulkCreate(userData, { individualHooks: true, returning: true,}).then(() => {
        Blog.bulkCreate(blogData).then(() => {
            Comment.bulkCreate(commentData).then(() => {
                console.log('All Seeds Planted');
              });
            });
      });
    })
  
    
  
    
  
    process.exit(0);
  };

seedDatabase();

