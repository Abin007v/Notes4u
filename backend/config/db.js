const mongoose = require("mongoose");

// const connectDB = async () => {
//   try {
//     const conn = await mongoose.connect(process.env.MONGO_URI, {
//       useUnifiedTopology: true,
//       useNewUrlParser: true,
//     });
//     console.log(`MongoDB Connected: ${conn.connection.host}`);
//   } catch (error) {
//     console.error(`Error: ${error.message}`);
//     process.exit();
//   }
// };
const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI);
  console.log(`mongoDB Connected: ${conn.connection.host}`);
};

module.exports = connectDB;
