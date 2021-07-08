const User = require('./User');
const Blog = require('./Blog');
const Comment = require('./Comment');

User.hasMany(Blog, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Blog.belongsTo(User, {
  foreignKey: 'user_id'
});

Blog.hasMany(Comment, {
    foreignKey: 'blog_id',
});

Comment.belongsTo(Blog, {
    through:{
        model: Comment,
        unique: false,
    },
    foreignKey: 'blog_id',
    as: 'user_data'
});

Comment.belongsTo(User, {
    through:{
        model: Comment,
        unique: false,
    },
    foreignKey: 'user_id',
    as: 'blog_data',
});

module.exports = { User, Blog, Comment };