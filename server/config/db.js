const mongoose = require('mongoose');
// const mongoURI = 'mongodb+srv://crudapp:crudapp@cluster0.iydyt0r.mongodb.net/?retryWrites=true&w=majority';
const mongoURI = 'mongodb://localhost:27017/crud';

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

module.exports = connectDB;
