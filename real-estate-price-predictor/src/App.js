
import React, { useState, useEffect } from "react";
import PropertyForm from "./components/PropertyForm";
import PredictionChart from "./components/PredictionChart";
import "./styles.css";
const brain = require('brain.js');

const App = () => {
  const [net, setNet] = useState(new brain.NeuralNetwork());
  const [predictedPrice, setPredictedPrice] = useState(null);
  const [actualPrice, setActualPrice] = useState(null);
  const [modelTrained, setModelTrained] = useState(false);

  useEffect(() => {
    const savedModel = localStorage.getItem("realEstateModel");
    if (savedModel) {
      const trainedNet = new brain.NeuralNetwork();
      trainedNet.fromJSON(JSON.parse(savedModel));
      setNet(trainedNet);
      setModelTrained(true);
    }
  }, []);

  const trainModel = () => {
    const trainingData = [
      { input: { area: 0.6, bedrooms: 0.4, bathrooms: 0.4, location: 0.5, age: 0.3 }, output: { price: 0.5 } },
      { input: { area: 0.8, bedrooms: 0.6, bathrooms: 0.6, location: 0.7, age: 0.1 }, output: { price: 0.8 } },
      { input: { area: 0.4, bedrooms: 0.2, bathrooms: 0.3, location: 0.3, age: 0.7 }, output: { price: 0.3 } },
    ];

    net.train(trainingData, { log: true, iterations: 2000, errorThresh: 0.005 });

    // Save trained model
    localStorage.setItem("realEstateModel", JSON.stringify(net.toJSON()));
    setModelTrained(true);
    alert("Model trained and saved!");
  };

  const handlePredict = (formData) => {
    if (!modelTrained) {
      alert("Please train the model first!");
      return;
    }

    const input = {
      area: formData.area / 5000,
      bedrooms: formData.bedrooms / 5,
      bathrooms: formData.bathrooms / 5,
      location: formData.location / 2,
      age: formData.age / 50,
    };

    const output = net.run(input);
    const predicted = (output.price * 1000).toFixed(2);
    const actual = predicted * (0.9 + Math.random() * 0.2); // Simulated actual price

    setPredictedPrice(predicted);
    setActualPrice(actual.toFixed(2));
  };

  const clearModel = () => {
    localStorage.removeItem("realEstateModel");
    setModelTrained(false);
    setPredictedPrice(null);
    setActualPrice(null);
    alert("Model reset! Train again to use.");
  };

  return (
    <div className="container">
      <h1>Real Estate Price Predictor</h1>
      <button onClick={trainModel} className="train-btn">
        Train Model
      </button>
      <button onClick={clearModel} className="clear-btn">
        Reset Model
      </button>
      <div className="grid-container">
        <PropertyForm onPredict={handlePredict} />
        {predictedPrice && (
          <div className="prediction-container">
            <div className="prediction-box">Predicted Price: ${predictedPrice}K</div>
            <PredictionChart actualPrice={actualPrice} predictedPrice={predictedPrice} />
          </div>
        )}
      </div>
    </div>
  );
};

export default App;