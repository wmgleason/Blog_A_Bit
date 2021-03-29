require("dotenv").config();
const path = require("path");
const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const routes = require("./controllers");
const mysql = require("mysql");
const Sequelize = require("sequelize");
// const handlebars = require("./controllers");
const helpers = require("./utils/helpers");
const bodyParser = require("body-parser");
// const cookieParser = require("cookie-parser");
// const exphbs = handlebars.create({ helpers });

const sequelize = require("./config/connection");
// Create a new sequelize store using the express-session package
// https://www.npmjs.com/package/connect-session-sequelize
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const PORT = process.env.PORT || 3001;
// Set up the express app
const app = express();
// Express middleware that allows POSTing data
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// serve up the public folder so we can request static
// assets from the client
app.use(express.static("public"));


// Configure and link a session object with the sequelize store
const session = {
  secret: "Wicked secret",
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

// Add express-session and store as Express.js middleware
app.use(session(session));

app.engine("hbs", exphbs({ extname: ".hbs"}));
app.set("view engine", "hbs");

// connection pool is a cache of database connections maintained so that the connections
// can be reused when future requests to the database are required.
// */
const pool  = mysql.createPool({
  connectionLimit : 100,
  host            : process.env.DB_HOST,
  user            : process.env.DB_USER,
  password        : process.env.DB_PASSWORD,
  database        : process.env.DB_NAME
});
  
pool.getConnection((err, connection) => {
    if(err) throw err; // not connected!
    console.log("connected as id " + connection.threadId)
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(routes);

// Routes
// const routes = require("./api/routes/user");
app.use("/", routes);
//Sets a basic route
app.get("/", (req, res) => res.send("This is partially working - hooray."));
// sequelize.sync({ force: false }).then(() => {
//   app.listen(PORT, () => console.log(`Now listening on Port ${PORT}`));
// });
// start the express server
app.listen(PORT, () => {
  console.log(`Success - app now listening on port ${PORT}`);
});