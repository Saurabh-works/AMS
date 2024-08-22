const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://aniketgawai88:aniket123@ams.lirqsoi.mongodb.net/ams?retryWrites=true&w=majority&appName=AMS",
  {
    serverSelectionTimeoutMS: 50000, // 30 seconds
    socketTimeoutMS: 45000, // 45 seconds
  }
);
