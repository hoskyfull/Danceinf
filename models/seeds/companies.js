///////////////////////////////////////
// Import Dependencies
///////////////////////////////////////
const mongoose = require("./connection");
const Companies = require("../companymodel");

///////////////////////////////////////////
// Seed Code
////////////////////////////////////////////

// save the connection in a variable
const db = mongoose.connection;

// Make sure code is not run till connected
db.on("open", () => {
    ///////////////////////////////////////////////
    // Write your Seed Code Below
    //////////////////////////////////////////////



    const startCompany = [
        {
            name: 'New York City Ballet',
            location: 'New York, USA',
            founded: 1948,
            rank: 1,
            rankyear: 2020,

        },
        {
            name: 'San Francisco Ballet',
            location: 'California, USA',
            founded: 1933,
            rank: 2,
            rankyear: 2020,

        },
        {
            name: 'American Ballet theatre',
            location: 'New York, USA',
            founded: 1939,
            rank: 2,
            rankyear: 2020,

        },
        {
            name: 'Alvin Ailey American Dance Theater',
            location: 'New York, USA',
            founded: 1958,
            rank: 4,
            rankyear: 2020,

        },
        {
            name: 'Boston Ballet',
            location: 'Massachusetts, USA',
            founded: 1963,
            rank: 5,
            rankyear: 2020,

        },
        {
            name: 'Houston Ballet',
            location: 'Texas, USA',
            founded: 1969,
            rank: 6,
            rankyear: 2020,

        },
        {
            name: 'Pacific Northwest Ballet',
            location: 'Washington, USA',
            founded: 1972,
            rank: 7,
            rankyear: 2020,

        },
        {
            name: 'Joffrey Ballet',
            location: 'Illinois, USA',
            founded: 1956,
            rank: 8,
            rankyear: 2020,

        },
        {
            name: 'Miami City Ballet',
            location: 'Florida, USA',
            founded: 1985,
            rank: 9,
            rankyear: 2020,

        },
        {
            name: 'Philadelphia Ballet',
            location: 'Pennsylvania, USA',
            founded: 1963,
            rank: 10,
            rankyear: 2020,

        }
    ]

    // Delete all companies
    Companies.deleteMany({})
        .then((deletedCompanies) => {
            // add the starter companies
            Companies.create(startCompany)
                .then((newCompanies) => {
                    // log the new companies to confirm their creation
                    console.log(newCompanies);
                    db.close();
                })
                .catch((error) => {
                    console.log(error);
                    db.close();
                });
        })
        .catch((error) => {
            console.log(error);
            db.close();
        });
});
