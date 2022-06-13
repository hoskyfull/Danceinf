////////////////////////////////////////
// Import Dependencies
////////////////////////////////////////
const express = require("express");
const Ballets = require("/Users/berto/Desktop/GA/projecttwo/Danceinf/Danceinf/models/balletmodel.js");

/////////////////////////////////////////
// Create Route
/////////////////////////////////////////
const router = express.Router();


////////////////////////////////////////
// Router Middleware
////////////////////////////////////////
// Authorization Middleware
router.use((req, res, next) => {
    if (req.session.loggedIn) {
        next();
    } else {
        res.redirect("/user/login");
    }
});

/////////////////////////////////////////
// Routes
/////////////////////////////////////////

// index route
router.get("/", (req, res) => {
    // find all the ballets
    Ballets.find({ username: req.session.username })
        // render a template after they are found
        .then((ballets) => {
            console.log(ballets);
            res.render("./views/index.liquid", { ballets });
        })
        // send error as json if they aren't
        .catch((error) => {
            console.log(error);
            res.json({ error });
        });
});


// new route
router.get("/new", (req, res) => {
    res.render("./views/ballets/new.liquid");
});

// create route
router.post("/", (req, res) => {
    // check if the readyToEat property should be true or false
    req.body.readyToEat = req.body.readyToEat === "on" ? true : false;
    // add username to req.body to track related user
    req.body.username = req.session.username;
    // create the new ballet
    Ballets.create(req.body)
        .then((ballets) => {
            // redirect user to index page if successfully created item
            res.redirect("/ballets");
        })
        // send error as json
        .catch((error) => {
            console.log(error);
            res.json({ error });
        });
});


// edit route
router.get("/:id/edit", (req, res) => {
    // get the id from params
    const id = req.params.id;
    // get the ballet from the database
    Ballets.findById(id)
        .then((ballets) => {
            // render edit page and send ballet data
            res.render("./models/views/ballets/edit.liquid", { ballets });
        })
        // send error as json
        .catch((error) => {
            console.log(error);
            res.json({ error });
        });
});

//update route
router.put("/:id", (req, res) => {
    // get the id from params
    const id = req.params.id;
    // check if the readyToEat property should be true or false
    req.body.readyToEat = req.body.readyToEat === "on" ? true : false;
    // update the ballet
    Ballets.findByIdAndUpdate(id, req.body, { new: true })
        .then((ballets) => {
            // redirect to main page after updating
            res.redirect("/ballets");
        })
        // send error as json
        .catch((error) => {
            console.log(error);
            res.json({ error });
        });
});

router.delete("/:id", (req, res) => {
    // get the id from params
    const id = req.params.id;
    // delete the ballet
    Ballets.findByIdAndRemove(id)
        .then((ballets) => {
            // redirect to main page after deleting
            res.redirect("/ballets");
        })
        // send error as json
        .catch((error) => {
            console.log(error);
            res.json({ error });
        });
});

// show route
router.get("/:id", (req, res) => {
    // get the id from params
    const id = req.params.id;

    // find the particular ballet from the database
    Ballets.findById(id)
        .then((ballets) => {
            console.log(ballets);
            // render the template with the data from the database
            res.render("./views/ballets/show.liquid", { ballets });
        })
        .catch((error) => {
            console.log(error);
            res.json({ error });
        });
});

//////////////////////////////////////////
// Export the Router
//////////////////////////////////////////
module.exports = router;
