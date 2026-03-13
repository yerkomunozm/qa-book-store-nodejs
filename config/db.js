const mongoose = require('mongoose');
module.exports = async function (key) {
  try {
    const conn = await mongoose.connect(key);
    console.log(`Database Connected (${conn.connection.name}): ${conn.connection.host}`);
  } catch (e) {
    console.log(e);
  }
};
