const mongoose = require("mongoose");
mongoURL = "mongodb+srv://admin:2090103254.chits.mun@cluster0.38febzf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/iBlog";

connectToMongo = async () => {
  await mongoose.connect(mongoURL);
  console.log("True")
};

module.exports = connectToMongo;