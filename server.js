require('dotenv').config()
const path = require('path');
const express = require('express');
const session = require('express-session');
const handlebars = require('express-handlebars');
const routes = require('./controllers');
// const handlebars = require('./controllers');
const helpers = require('./utils/helpers');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
// const hbs = handlebars.create({ helpers });

const sequelize = require('./config/connection');
// directory references
const clientDir = path.join(__dirname, '../client');
// Create a new sequelize store using the express-session package
const SequelizeStore = require('connect-session-sequelize')(session.Store);
// Set up the express app
const app = express();
const PORT = process.env.PORT || 3001;

// Express middleware that allows POSTing data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// serve up the public folder so we can request static
// assets from the client
// app.use(express.static('public'));


// Configure and link a session object with the sequelize store
const sess = {
  secret: 'Wicked secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

// Add express-session and store as Express.js middleware
app.use(session(sess));

// app.set('view engine', 'hbs');
// app.engine('hbs', handlebars({
//   layoutsDir: __dirname + '/views/layouts',
//   //new configuration parameter
//   extname: 'hbs'
//   }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

// sequelize.sync({ force: false }).then(() => {
//   app.listen(PORT, () => console.log(`Now listening on Port ${PORT}`));
// });
// start the express server
app.listen(PORT, () => {
  console.log(`Success - app now listening on port ${PORT}`);
});