const mongoose = require("mongoose");
mongoURL = "mongodb://127.0.0.1:27017/inotebook";

connectToMongo = async () => {
  await mongoose.connect(mongoURL);
  console.log("True")
};

module.exports = connectToMongo;