////////////////////////////////////////
// Import Dependencies
////////////////////////////////////////
const express = require("express");
const Companies = require("/Users/berto/Desktop/GA/projecttwo/Danceinf/Danceinf/models/companymodel.js");

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
    // find all the companies
    Companies.find({ username: req.session.username })
        // render a template after they are found
        .then((companies) => {
            console.log(companies);
            res.render("companies", { companies });
        })
        // send error as json if they aren't
        .catch((error) => {
            console.log(error);
            res.json({ error });
        });
});


// new route
router.get("/new", (req, res) => {
    res.render("companies/new");
});


router.delete("/:id", (req, res) => {
    // get the id from params
    const id = req.params.id;
    // delete the company
    Companies.findByIdAndRemove(id)
        .then((companies) => {
            // redirect to main page after deleting
            res.redirect("/companies");
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
    // check if the watched property should be true or false
    req.body.watched = req.body.watched === "on" ? true : false;
    // update the company
    Companies.findByIdAndUpdate(id, req.body, { new: true })
        .then((companies) => {
            // redirect to main page after updating
            res.redirect("/companies");
        })
        // send error as json
        .catch((error) => {
            console.log(error);
            res.json({ error });
        });
});

// create route
router.post("/", (req, res) => {
    // check if the watched property should be true or false
    req.body.watched = req.body.watched === "on" ? true : false;
    // add username to req.body to track related user
    req.body.username = req.session.username;
    // create the new companies
    Companies.create(req.body)
        .then((companies) => {
            // redirect user to index page if successfully created item
            res.redirect("/companies");
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
    // get the companies from the database
    Companies.findById(id)
        .then((companies) => {
            // render edit page and send companies data
            res.render("/companies/edit", { companies });
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

    // find the particular company from the database
    Companies.findById(id)
        .then((companies) => {
            console.log(companies);
            // render the template with the data from the database
            res.render("companies/show", { companies });
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
