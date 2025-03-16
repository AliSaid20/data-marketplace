// import React from 'react'
import React, { useState, useEffect } from "react";
import '../App/ManageUser.css';

      // Dummy user data for demonstration
      const dummyUsers = [
        { id: 1, name: "Alice", email: "alice@example.com", status: "active" },
        { id: 2, name: "Bob", email: "bob@example.com", status: "active" },
        { id: 3, name: "Charlie", email: "charlie@example.com", status: "active" },
        { id: 4, name: "David", email: "david@example.com", status: "inactive" },
        { id: 5, name: "Eve", email: "eve@example.com", status: "active" },
        { id: 6, name: "Frank", email: "frank@example.com", status: "active" },
      ];

const ManageUsers = () => {

  const [users, setUsers] = useState([]); // State for user data
  const [searchTerm, setSearchTerm] = useState(""); // State for search input
  const [currentPage, setCurrentPage] = useState(1); // State for pagination
  


  const itemsPerPage = 5; // Number of users to show per page


  
    // Fetch or initialize user data
    useEffect(() => {
      // Simulating API call
      setUsers(dummyUsers);
    }, []);
  
    // Handle search input change
    const handleSearchChange = (event) => {
      setSearchTerm(event.target.value);
    };
  
    // Filter users based on search term
    const filteredUsers = users.filter((user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  
    // Handle banning a user
    const handleBan = (userId) => {
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId ? { ...user, banned: true } : user
        )
      );
      alert(`User with ID ${userId} has been banned.`);
    };
  
    // Handle warning a user
    const handleWarn = (userId) => {
      alert(`User with ID ${userId} has been warned.`);
    };
  
    const handleRemoveBan = (userId) => {
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId ? { ...user, banned: false } : user
        )
      );
      alert(`User with ID ${userId} has been removed from ban.`);
    };

    // Pagination logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);
  
    const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  
    const handlePageChange = (pageNumber) => {
      setCurrentPage(pageNumber);
    };
  
  
  return (
    <div className="manage-users-container">
  

    {/* Search bar */}
    <input
      type="text"
      placeholder="Search by name or email..."
      value={searchTerm}
      onChange={handleSearchChange}
      className="search-input-user"
    />

    {/* User Table */}
    <table className="users-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {currentUsers.map((user) => (
          <tr key={user.id}>
            <td>{user.id}</td>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.status}</td>
            <td>
              <button
                className="warn-button"
                onClick={() => handleWarn(user.id)}
              >
                Warn
              </button>
              {!user.banned ? (
                  <button
                    onClick={() => handleBan(user.id)}
                    className="ban-button"
                  >
                    Ban
                  </button>
                ) : (
                  <button
                    onClick={() => handleRemoveBan(user.id)}
                    className="remove-ban-button"
                  >
                    Remove Ban
                  </button>
                )}

            </td>
          </tr>
        ))}
      </tbody>
    </table>

    {/* Pagination */}
    <div className="pagination">
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index + 1}
          onClick={() => handlePageChange(index + 1)}
          className={currentPage === index + 1 ? "active-page" : ""}
        >
          {index + 1}
        </button>
      ))}
    </div>
  </div>

  )
}

export default ManageUsers
