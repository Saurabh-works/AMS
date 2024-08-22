const mongoose = require("mongoose");
const batchSchema = new mongoose.Schema(
  {
    id: String,
    name: String,
    batch: String,
    time: String,
  },
  { collection: "batches" }
);
module.exports = mongoose.model("batches", batchSchema);
