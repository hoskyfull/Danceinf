const mongoose = require('./connection')

////////////////////////////////////////////////
// Our Models
////////////////////////////////////////////////
// pull schema and model from mongoose
const { Schema, model } = mongoose;

// make Dance Company schema
const balletSchema = new Schema({
    name: String,
    composed: String,
    choreographed: String,
    premiered: Number,
    // companies: [{
		// 	type: Schema.Types.ObjectId,
		// 	ref: 'Companies'
		// }],
  });

  
  // make Dance Company model
  const Ballet = model("Ballet", balletSchema);



  ///////////////////////////////////////////////////
// Export Model
///////////////////////////////////////////////////
module.exports = Ballet;