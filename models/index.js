"use strict";

const User = require("./User");
const Post = require("./Post");

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
User.hasMany(Post, {
  foreignKey: 'user_id'
});

Post.belongsTo(User, {
  foreignKey: 'user_id',
});

module.exports = { User, Post };
