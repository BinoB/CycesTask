import React, { useEffect, useState } from "react";
import axios from "axios";
import "./UserSearch.css";

const UserSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editedUser, setEditedUser] = useState({});
  const [newUser, setNewUser] = useState({
    fname: "",
    lname: "",
    username: "",
    
  });
  const [showCreateUser, setShowCreateUser] = useState(false);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("https://www.melivecode.com/api/users");
      setSearchResults(response.data);
    } catch (error) {
      console.error("Error fetching users", error);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://www.melivecode.com/api/users?search=${searchQuery}`
      );
      setSearchResults(response.data);
    } catch (error) {
      console.error("Error fetching search results", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleEdit = (user) => {
    setEditedUser(user);
    setShowEditModal(true);
  };

  const handleDelete = async (userId) => {
    try {
      await axios.delete(`https://www.melivecode.com/api/users/delete/${userId}`);
      console.log(`User with ID ${userId} deleted successfully`);
      fetchUsers(); 
    } catch (error) {
      console.error("Error deleting user", error);
    }
  };

  const handleEditConfirm = async () => {
    try {
      await axios.put(
        `https://www.melivecode.com/api/users/update/${editedUser.id}`,
        editedUser
      );
      console.log("User edited successfully");
      fetchUsers(); 
      setShowEditModal(false); 
    } catch (error) {
      console.error("Error editing user", error);
    }
  };

  const handleCreateUser = async () => {
    try {
      await axios.post("https://www.melivecode.com/api/users/create", newUser);
      console.log("User created successfully");
      fetchUsers(); 
      setShowCreateUser(false); 
    } catch (error) {
      console.error("Error creating user", error);
    }
  };

  return (
    <div className="user-details">
      <h2>User Search</h2>
      <div className="search-container">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Enter search query"
        />
        <button className="btn btn-light" onClick={handleSearch}>
          Search
        </button>
      </div>

      <button
        className="btn create btn-success create-user-button"
        onClick={() => setShowCreateUser(true)}
      >
        Create
      </button>

      {searchResults.length > 0 ? (
        <div className="results-container">
          <h3>Search Results:</h3>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Avatar</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Username</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {searchResults.map((user, index) => (
                <tr key={user.id}>
                  <td>{index + 1}</td>
                  <td>
                    <img
                      src={user.avatar}
                      alt={`${user.fname} ${user.lname}`}
                      className="avatar-image"
                    />
                  </td>
                  <td>{user.fname}</td>
                  <td>{user.lname}</td>
                  <td>{user.username}</td>
                  <td>
                    <button
                      className="btn btn-secondary edit-button"
                      onClick={() => handleEdit(user)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger button-delete"
                      onClick={() => handleDelete(user.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No search results</p>
      )}

      {showEditModal && (
        <div className="edit-modal">
          <h3>Edit User</h3>
          <p>
            <input
              type="text"
              value={editedUser.fname}
              onChange={(e) =>
                setEditedUser({ ...editedUser, fname: e.target.value })
              }
            />
          </p>
          <p>
            <input
              type="text"
              value={editedUser.lname}
              onChange={(e) =>
                setEditedUser({ ...editedUser, lname: e.target.value })
              }
            />
          </p>
          <p>
            <input
              type="text"
              value={editedUser.username}
              onChange={(e) =>
                setEditedUser({ ...editedUser, username: e.target.value })
              }
            />
          </p>

          
          <div>
            <button
              className="btn btn-primary"
              onClick={handleEditConfirm}
            >
              OK
            </button>
            <button className="btn btn-secondary m-3" onClick={() => setShowEditModal(false)}>Cancel</button>
          </div>
        </div>
      )}

      {showCreateUser && (
        <div className="create-user-section">
          <h3>Create User</h3>
          <p>
            <input
              type="text"
              placeholder="First Name"
              value={newUser.fname}
              onChange={(e) =>
                setNewUser({ ...newUser, fname: e.target.value })
              }
            />
          </p>
          <p>
            <input
              type="text"
              placeholder="Last Name"
              value={newUser.lname}
              onChange={(e) =>
                setNewUser({ ...newUser, lname: e.target.value })
              }
            />
          </p>
          <p>
            <input
              type="text"
              placeholder="Username"
              value={newUser.username}
              onChange={(e) =>
                setNewUser({ ...newUser, username: e.target.value })
              }
            />
          </p>
          
          <div>
            <button
              className="btn btn-success"
              onClick={handleCreateUser}
            >
              Create User
            </button>
            <button className="btn btn-secondary m-3" onClick={() => setShowCreateUser(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserSearch;
