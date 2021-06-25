const mongoose = require("mongoose");
require("dotenv").config();

const initializeDBConnection = async () => {
  try {
    await mongoose.connect(process.env.dbString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("mongoose connection successfull");
  } catch (error) {
    console.error({ message: "mongoose connection failed" });
  }
};

module.exports = initializeDBConnection;
