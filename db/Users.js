const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: String,
    email:String,
    password:String,
    role:String,
    id:String,
    batch:String,
    dob:String
});
module.exports = mongoose.model("users", userSchema);
