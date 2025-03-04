
import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const PredictionChart = ({ actualPrice, predictedPrice }) => {
  const data = {
    labels: ["Actual Price", "Predicted Price"],
    datasets: [
      {
        label: "Price (in $1000s)",
        data: [actualPrice, predictedPrice],
        backgroundColor: ["#4CAF50", "#FF5733"],
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      y: { beginAtZero: true },
    },
  };

  return (
    <div className="chart-container">
      <h2>Prediction Comparison</h2>
      <Bar data={data} options={options} />
    </div>
  );
};

export default PredictionChart;
