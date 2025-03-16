// import React from 'react'
import React, { useEffect, useState } from "react";
import '../App/Analytics.css';
import { Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend, ArcElement, } from "chart.js";
ChartJS.register( BarElement, CategoryScale, LinearScale, Tooltip, Legend, ArcElement );

const Analytics = () => {

  const [analyticsData, setAnalyticsData] = useState({
    totalUsers: 0,
    activeUsers: 0,
    totalSellers: 0,
    pendingSellers: 0,
    feedbackCount: 0,
    positiveFeedback: 0,
    negativeFeedback: 0,
  });

  useEffect(() => {
    // Simulate API call to fetch analytics data
    const fetchData = async () => {
      const data = {
        totalUsers: 1500,
        activeUsers: 1200,
        totalSellers: 300,
        pendingSellers: 50,
        feedbackCount: 500,
        positiveFeedback: 400,
        negativeFeedback: 100,
      };
      setAnalyticsData(data);
    };
    fetchData();
  }, []);

  const barData = {
    labels: ["Users", "Sellers", "Feedback"],
    datasets: [
      {
        label: "Statistics",
        data: [
          analyticsData.totalUsers,
          analyticsData.totalSellers,
          analyticsData.feedbackCount,
        ],
        backgroundColor: ["#3498db", "#2ecc71", "#e74c3c"],
      },
    ],
  };

  const pieData = {
    labels: ["Positive Feedback", "Negative Feedback"],
    datasets: [
      {
        label: "Feedback",
        data: [analyticsData.positiveFeedback, analyticsData.negativeFeedback],
        backgroundColor: ["#2ecc71", "#e74c3c"],
      },
    ],
  };


  return (
    <div className="analytics-page">

    {/* Overall Stats */}
    <div className="stats-container">
      <div className="stat-card">
        <h3>Total Users</h3>
        <p>{analyticsData.totalUsers}</p>
      </div>
      <div className="stat-card">
        <h3>Active Users</h3>
        <p>{analyticsData.activeUsers}</p>
      </div>
      <div className="stat-card">
        <h3>Total Sellers</h3>
        <p>{analyticsData.totalSellers}</p>
      </div>
      <div className="stat-card">
        <h3>Pending Sellers</h3>
        <p>{analyticsData.pendingSellers}</p>
      </div>
      <div className="stat-card">
        <h3>Total Feedback</h3>
        <p>{analyticsData.feedbackCount}</p>
      </div>
    </div>

    {/* Bar Chart */}
    <div className="chart-container">
      <h2>Overall Statistics</h2>
      <Bar data={barData} />
    </div>

    {/* Pie Chart */}
    <div className="chart-container">
      <h2>Feedback Analysis</h2>
      <Pie data={pieData} />
    </div>
  </div>

  )
}

export default Analytics
