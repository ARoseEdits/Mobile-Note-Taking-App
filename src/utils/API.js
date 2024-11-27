// helper funtions 
const mongoose = require('mongoose');

// MongoDB connection string (replace with your actual connection URI)
const MONGO_URI = process.env.MONGODB_URI || 'your-mongodb-connection-string';

// Connect to MongoDB
const connectToMongoDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1); // Exit process with failure
  }
};

// Define a schema and model for `test`
const testSchema = new mongoose.Schema({
  name: { type: String, required: true },
  value: { type: String, required: true },
});

const Test = mongoose.model('Test', testSchema);

// Upload data to MongoDB
const uploadTestData = async (data) => {
  try {
    const test = new Test(data);
    const savedTest = await test.save();
    console.log('Data uploaded successfully:', savedTest);
    return savedTest;
  } catch (error) {
    console.error('Error uploading data:', error.message);
    throw error;
  }
};

// Download data from MongoDB
const downloadTestData = async () => {
  try {
    const data = await Test.find({});
    console.log('Data downloaded successfully:', data);
    return data;
  } catch (error) {
    console.error('Error downloading data:', error.message);
    throw error;
  }
};

// Export functions
module.exports = {
  connectToMongoDB,
  uploadTestData,
  downloadTestData,
};
