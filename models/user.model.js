const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
});

UserSchema.plugin(require("mongoose-timestamp"));

module.exports = mongoose.model("User", UserSchema);
