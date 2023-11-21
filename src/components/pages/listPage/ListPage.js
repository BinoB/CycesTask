// ListPage.js
import React, { useEffect, useState } from "react";
import "./ListPage.css";
import axios from "axios";
import { Link } from "react-router-dom";

const ListPage = () => {
  const [attractions, setAttractions] = useState([]);
  const URL = "https://www.melivecode.com/api/attractions";

  useEffect(() => {
    const fetchAttractions = async () => {
      try {
        const response = await axios.get(URL);
        setAttractions(response.data);
      } catch (error) {
        console.error("Error fetching Data", error);
      }
    };
    fetchAttractions();
  }, []);

  const chunkArray = (arr, size) => {
    const result = [];
    for (let i = 0; i < arr.length; i += size) {
      result.push(arr.slice(i, i + size));
    }
    return result;
  };

  const attractionsInRows = chunkArray(attractions, 3);

  return (
    <div className="travel-page">
      <h2 className="travel">Travel App</h2>
      <div className="create-button">
        <h1>Around the World</h1>
        <button className="button-create">
          <Link className="button-create-link" to="/createattration">
            Create
          </Link>
        </button>
      </div>
      {attractionsInRows.map((row, rowIndex) => (
        <div className="row" key={rowIndex}>
          {row.map((attraction) => (
            <div className="col-sm-4 mb-3" key={attraction.id}>
              <div className="card">
                <img
                  src={attraction.coverimage}
                  className="card-img-top"
                  alt={attraction.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{attraction.name}</h5>
                  <p className="card-text">{attraction.detail}</p>
                 
                  <Link
                    to={`/attractions/${attraction.id}`}
                    className="btn btn-primary"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default ListPage;



