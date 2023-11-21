import React, { useState } from "react";
import axios from "axios";
import "./CreateAttraction.css";
import {getAuthToken} from "./AuthService"

const CreateAttraction = () => {
  const [formData, setFormData] = useState({
    name: "",
    detail: "",
    coverimage: "",
    latitude: "",
    longitude: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = getAuthToken();
      const response = await axios.post(
        "https://www.melivecode.com/api/auth/attractions/create",
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log("Attraction created successfully:", response.data);
      
    } catch (error) {
      console.error("Error creating attraction:", error);
    }
  };

  return (
    <div className="create-form">
      <div className="form-container">
        <h2 className="form-header">Create Attraction</h2>
        <form className="attraction-form" onSubmit={handleSubmit}>
          <label className="form-label">Name:</label>
          <input
            type="text"
            name="name"
            className="form-input"
            onChange={handleChange}
            value={formData.name}
            required
          />

          <label className="form-label">Detail:</label>
          <textarea
            name="detail"
            className="form-input"
            onChange={handleChange}
            value={formData.detail}
            required
          ></textarea>

          <label className="form-label">Cover Image URL:</label>
          <input
            type="text"
            name="coverimage"
            className="form-input"
            onChange={handleChange}
            value={formData.coverimage}
            required
          />

          <label className="form-label">Latitude:</label>
          <input
            type="number"
            name="latitude"
            step="0.0000001"
            className="form-input"
            onChange={handleChange}
            value={formData.latitude}
            required
          />

          <label className="form-label">Longitude:</label>
          <input
            type="number"
            name="longitude"
            step="0.0000001"
            className="form-input"
            onChange={handleChange}
            value={formData.longitude}
            required
          />

          <button type="submit" className="form-button">
            Create Attraction
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateAttraction;
