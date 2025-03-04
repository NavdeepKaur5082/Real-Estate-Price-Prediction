
import React, { useState } from "react";
import "../styles.css"; // Import CSS

const PropertyForm = ({ onPredict }) => {
  const [formData, setFormData] = useState({
    area: "",
    bedrooms: "",
    bathrooms: "",
    location: "",
    age: "",
  });

  const locations = ["Downtown", "Suburban", "Rural"];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onPredict(formData);
  };

  return (
    <div className="container">
      <h1>Enter Property Details</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          name="area"
          placeholder="Area (sq ft)"
          value={formData.area}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="bedrooms"
          placeholder="Number of Bedrooms"
          value={formData.bedrooms}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="bathrooms"
          placeholder="Number of Bathrooms"
          value={formData.bathrooms}
          onChange={handleChange}
          required
        />
        <select name="location" value={formData.location} onChange={handleChange} required>
          <option value="">Select Location</option>
          {locations.map((loc, index) => (
            <option key={index} value={index}>
              {loc}
            </option>
          ))}
        </select>
        <input
          type="number"
          name="age"
          placeholder="Age of Property (years)"
          value={formData.age}
          onChange={handleChange}
          required
        />
        <button type="submit">Predict Price</button>
      </form>
    </div>
  );
};

export default PropertyForm;
