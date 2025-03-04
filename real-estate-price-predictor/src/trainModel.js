
import * as brain from 'brain.js';
import realEstateData from './real_estate_data.json';

// Initialize neural network
const net = new brain.NeuralNetwork({ hiddenLayers: [5, 3] });

// Prepare the dataset for training
const trainingData = realEstateData.map((item) => ({
  input: {
    area: item["Area (sq ft)"],
    bedrooms: item["Bedrooms"],
    bathrooms: item["Bathrooms"],
    location: item["Location"],
    age: item["Age of Property (years)"],
  },
  output: { price: item["Price (in $1000)"] }, // Normalize price
}));

// Train the model
net.train(trainingData, {
  iterations: 20000, // Adjust for accuracy
  learningRate: 0.01,
});

// Save trained model
const trainedModel = net.toJSON();
localStorage.setItem("realEstateModel", JSON.stringify(trainedModel));

export default net;