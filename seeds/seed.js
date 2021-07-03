const sequelize = require('../config/connection');
const { User, Wiki, Favorite } = require('../models');

const userData = require('./userSeed.json');
const wikiData = require('./wikiSeed.json');
const favoriteData = require('./favoriteSeed.json');

const seedDatabase = () => {
    return sequelize.sync({ force: true }).then(() => {
      User.bulkCreate(userData, { individualHooks: true, returning: true,}).then(() => {
        Wiki.bulkCreate(wikiData).then(() => {
            Favorite.bulkCreate(favoriteData).then(() => {
                console.log('All Seeds Planted');
              });
            });
      });
    })
  
    
  
    
  
    process.exit(0);
  };

seedDatabase();

