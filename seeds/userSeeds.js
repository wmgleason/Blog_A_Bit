const { User } = require('../models');

const userData = [
  {
    username: 'Michael',
    email: 'mikey@mail.com',
    password: 'password111'
  },
  {
    username: 'Jim',
    email: 'halpert@mail.com',
    password: 'password222'
  },
  {
    username: 'Pam',
    email: 'beezlee@mail.com',
    password: 'password333'
  },
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;