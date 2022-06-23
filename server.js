/////////////////////////////////////////////
// Import Our Dependencies
/////////////////////////////////////////////
require("dotenv").config(); // Load ENV Variables
const express = require("express"); // import express
const morgan = require("morgan"); //import morgan
const methodOverride = require("method-override");
const path = require("path")
const BalletsRouter = require('./controllers/ballets')
const CompaniesRouter = require('./controllers/companies')
const UserRouter = require("./controllers/user");
const session = require("express-session");
const MongoStore = require("connect-mongo");


/////////////////////////////////////////////////
// Create our Express Application Object
/////////////////////////////////////////////////
const app = require("liquid-express-views")(express(), {root: [path.resolve(__dirname, 'views/')]})

/////////////////////////////////////////////////////
// Middleware
/////////////////////////////////////////////////////
app.use(morgan("tiny")); //logging
app.use(methodOverride("_method")); // override for put and delete requests from forms
app.use(express.urlencoded({ extended: true })); // parse urlencoded request bodies
app.use(express.static("public")); // serve files from public statically

// middleware to setup session
app.use(
  session({
    secret: process.env.SECRET,
    store: MongoStore.create({ mongoUrl: process.env.DATABASE_URL }),
    saveUninitialized: true,
    resave: false,
  })
);

////////////////////////////////////////////
// Routes
////////////////////////////////////////////

app.use("/ballets", BalletsRouter); // send all "/companies" routes to companies router
app.use("/companies", CompaniesRouter); // send all "/ballets" routes to ballet router
app.use("/user", UserRouter); // send all "/user" routes to user router

app.get('/', function(req, res){
  res.redirect('/home');
});

app.get("/home", (req, res) => {
  res.render("home/show");
});
//////////////////////////////////////////////
// Server Listener
//////////////////////////////////////////////
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Now Listening on port ${PORT}`));
