"use strict";
const { Model, DataTypes } = require('sequelize');
// const Post = require("./Post");
const sequelize = require('../config/connection');
class Post extends Model {}
Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id'
      }
    }
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'post'
  }
);
// let sequelize;
// if (config.use_env_variable) {
//   sequelize = new Sequelize(process.env[config.use_env_variable], config);
// } else {
//   sequelize = new Sequelize(config.database, config.username, config.password, config);
// }

// fs
//   .readdirSync(__dirname)
//   .filter(file => {
//     return (file.indexOf(".") !== 0) && (file !== basename) && (file.slice(-3) === ".js");
//   })
//   .forEach(file => {
//     const model = require(path.join(__dirname, file))
//     (sequelize, Sequelize.DataTypes);
//     db[model.name] = model;
//   });

// User/Post associations
// User.hasMany(Post, {
//   foreignKey: 'user_id'
// });

// Post.belongsTo(User, {
//   foreignKey: 'user_id',
// });

module.exports = Post;
