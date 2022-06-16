const mongoose = require('./connection')

////////////////////////////////////////////////
// Our Models
////////////////////////////////////////////////
// pull schema and model from mongoose
const { Schema, model } = mongoose;

// make Dance Company schema
const danceCoSchema = new Schema({
    name: String,
    location: String,
    founded: Number,
    rank: Number,
    rankyear: Number,
    // watched: Boolean,
    ballets: [{type: Schema.Types.ObjectId, ref: 'Ballet'}]
    //ballets: [object.ref]
    ///mongoose populate method read about it
    //to be added in either index or show through the get route
  });
  
  // make Dance Company model
  const Company = model("Company", danceCoSchema);


  ///////////////////////////////////////////////////
// Export Model
///////////////////////////////////////////////////
module.exports = Company;