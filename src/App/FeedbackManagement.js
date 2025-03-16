// import React from 'react'
import React, { useState, useEffect } from "react";
import '../App/FeedbackManagement.css';

const dummyFeedback = [
  { id: 1, user: "Alice", email: "alice@example.com", message: "Great platform!", date: "2025-01-15" },
  { id: 2, user: "Bob", email: "bob@example.com", message: "I had some issues with login.", date: "2025-01-16" },
  { id: 3, user: "Charlie", email: "charlie@example.com", message: "Please add more features!", date: "2025-01-17" },
  // Add more dummy data for testing pagination
];

const FeedbackManagement = () => {

  const [feedbackList, setFeedbackList] = useState([]);
  const [filteredFeedback, setFilteredFeedback] = useState([]);
  const [searchUser, setSearchUser] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    // Simulate API call to fetch feedback
    setFeedbackList(dummyFeedback);
    setFilteredFeedback(dummyFeedback);
  }, []);

  const handleDelete = (id) => {
    const updatedList = feedbackList.filter((feedback) => feedback.id !== id);
    setFeedbackList(updatedList);
    setFilteredFeedback(updatedList);
    alert(`Feedback with ID ${id} deleted.`);
  };

  const handleRespond = (email) => {
    alert(`A response email will be sent to ${email}.`);
    // Simulate sending an email (integrate with email service in the backend)
    console.log(`Response sent to ${email}`);
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchUser(query);

    const filtered = feedbackList.filter((feedback) =>
      feedback.user.toLowerCase().includes(query)
    );
    setFilteredFeedback(filtered);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredFeedback.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredFeedback.length / itemsPerPage);

  return (
    <div className="manage-feedback">

    {/* Search Field */}
    <div className="search-container">
      <input
        type="text"
        placeholder="Search by user..."
        value={searchUser}
        onChange={handleSearch}
        className="search-input"
      />
    </div>

    {/* Feedback Table */}
    <table className="feedback-table">
      <thead>
        <tr>
          <th>User</th>
          <th>Email</th>
          <th>Message</th>
          <th>Date</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {currentItems.map((feedback) => (
          <tr key={feedback.id}>
            <td>{feedback.user}</td>
            <td>{feedback.email}</td>
            <td>{feedback.message}</td>
            <td>{feedback.date}</td>
            <td>
              <button
                onClick={() => handleRespond(feedback.email)}
                className="respond-button"
              >
                Respond
              </button>
              <button
                onClick={() => handleDelete(feedback.id)}
                className="delete-button"
              >
                Delete
              </button>
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

export default FeedbackManagement
