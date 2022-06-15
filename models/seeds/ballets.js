///////////////////////////////////////
// Import Dependencies
///////////////////////////////////////
const mongoose = require("../../models/connection");
const Ballets = require('../balletmodel');


///////////////////////////////////////////
// Seed Code
////////////////////////////////////////////

// save the connection in a variable
const db = mongoose.connection;

// Make sure code is not run till connected
db.on("open", () => {

    const startBallets = [
        {
            name: 'Swan Lake',
            composed: 'Pyotr Ilyich Tchaikovsky',
            choreographed: 'Julius Reisinger',
            premiered: 1877,
        },
        {
            name: 'The Nutcracker',
            composed: 'Pyotr Ilyich Tchaikovsky',
            choreographed: 'Marius Petipa and Lev Ivanov',
            premiered: 1892,
        },
        {
            name: 'Giselle',
            composed: 'Adolph Adam',
            choreographed: 'Jean Coralli and Jules Perrot',
            premiered: 1841,
        },
        {
            name: 'Romeo and Juliet',
            composed: 'Sergei Prokofiev',
            choreographed: 'Váña-Psota',
            premiered: 1938,
        },
        {
            name: 'Don Quixote',
            composed: 'Ludwig Minkus',
            choreographed: 'Marius Petipa',
            premiered: 1869,
        },
        {
            name: 'Cinderella',
            composed: 'Sergei Prokofiev',
            choreographed: 'Rostislav Zakharov',
            premiered: 1945,
        },
        {
            name: 'La Bayadère',
            composed: 'Ludwig Minkus',
            choreographed: 'Marius Petipa',
            premiered: 1877,
        },
        {
            name: 'Coppélia',
            composed: 'Léo Delibes',
            choreographed: 'Arthur Saint-Léon',
            premiered: 1870,
        },
        {
            name: 'The Sleeping Beauty',
            composed: 'Pyotr Ilyich Tchaikovsky',
            choreographed: 'Marius Petipa',
            premiered: 1890,
        },
        {
            name: 'La Sylphide',
            composed: 'Jean-Madeleine Schneitzhoeffer',
            choreographed: 'Marie Taglioni',
            premiered: 1832,
        },

    ];

    // Delete all ballets
    Ballets.deleteMany({})
        .then((deletedBallets) => {
            // add the starter ballets
            Ballets.create(startBallets)
                .then((newBallets) => {
                    // log the new ballets to confirm their creation
                    console.log(newBallets);
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