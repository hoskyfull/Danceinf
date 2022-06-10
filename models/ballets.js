////////////////////////////////////////////////
// Our Models
////////////////////////////////////////////////
// pull schema and model from mongoose
const { Schema, model } = mongoose;

// make Dance Company schema
const balletSchema = new Schema({
    name: String,
    location: String,
    founded: String,
  });
  
  // make Dance Company model
  const Ballet = model("Ballet", balletCoSchema);