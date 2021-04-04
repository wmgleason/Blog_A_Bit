"use strict";
// const { Model, DataTypes } = require('sequelize');
const Post = require("./Post");
const Comment = require("./Comment");
const User = require("./User");
// const sequelize = require("../config/connection");

// models relationships
User.hasMany(Post, {
  foreignKey: 'user_id'
});
Post.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: "cascade"
});

Comment.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: "cascade"
});

Comment.belongsTo(Post, {
  foreignKey: 'post_id',
  onDelete: "cascade"
});

User.hasMany(Comment, {
  foreignKey: 'user_id',
  onDelete: "cascade"
});

Post.hasMany(Comment, {
  foreignKey: 'post_id',
  onDelete: "cascade"
})
//need this for all these models
module.exports = { User, Post, Comment };
