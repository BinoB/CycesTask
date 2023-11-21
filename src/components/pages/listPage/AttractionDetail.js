import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const AttractionDetail = () => {
  const URL = "https://www.melivecode.com/api/attractions";

  // Use useParams to get the ID from the URL
  const { id } = useParams();
  const [attraction, setAttraction] = useState(null);

  // Fetch data for the specific attraction using the ID
  useEffect(() => {
    const fetchAttractionDetails = async () => {
      try {
        const response = await axios.get(`${URL}/${id}`);

        setAttraction(response.data.attraction);
        console.log("attraction:", response.data.attraction);
      } catch (error) {
        console.error("Error fetching Attraction Details", error);
      }
    };

    fetchAttractionDetails();
  }, [id]);

  return (
    <div>
      <h1 className="d-flex justify-content-left p-5">Detail page</h1>
      <div className="container mt-5" style={{ maxWidth: "600px" }}>
        {attraction && (
          <div className="text-center">
            <div className="card-body text-left">
              <h2 className="card-title m-3">{attraction.name}</h2>
              <img
                src={attraction.coverimage}
                alt={attraction.name}
                className="img-fluid mb-3 mx-auto d-block"
              />
              <p className="card-text mb-1 text-wrap">
                Details: {attraction.detail}
              </p>
              <p className="card-text mb-1">Latitude: {attraction.latitude}</p>
              <p className="card-text">Longitude: {attraction.longitude}</p>
            </div>
          </div>
        )}

        <div className="text-center">
          <button className="btn btn-warning m-3">Edit</button>
          <button className="btn btn-danger">Delete</button>
        </div>
      </div>
    </div>
  );
};
export default AttractionDetail;
