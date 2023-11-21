import React from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css'

const Dashboard = () => {
  return (
    <div>
      <div className="dashboard">
        <button className='list-button btn btn-light m-3'>
          <Link to="/listpage">List Page</Link>
        </button>
        <button className='user-button btn btn-light'>
          <Link to="/usersearch">User List</Link>
        </button>
        <button className='user-button btn btn-danger'>
          <Link to="/">Logout</Link>
        </button>
      </div>
    </div>
  );
};

export default Dashboard;



