const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model {}

Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    comment: {
      type: DataTypes.STRING,
    },
    blog_id: {
       type: DataTypes.INTEGER,
       allowNull: false,
       references: {
        // This references the `blog` model, which we set in `Blog.js` as its `modelName` property
        model: 'blog',
        key: 'id',
      },
    },
    user_id: {
        type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        // This references the `user` model, which we set in `User.js` as its `modelName` property
        model: 'user',
        key: 'id',
      },
    },
    },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'comments',
  }
);

module.exports = Comment;