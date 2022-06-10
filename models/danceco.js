////////////////////////////////////////////////
// Our Models
////////////////////////////////////////////////
// pull schema and model from mongoose
const { Schema, model } = mongoose;

// make Dance Company schema
const danceCoSchema = new Schema({
    name: String,
    location: String,
    founded: String,
  });
  
  // make Dance Company model
  const Company = model("Company", danceCoSchema);


  ///////////////////////////////////////////////////
// Export Model
///////////////////////////////////////////////////
module.exports = Company;