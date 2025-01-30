import React, { useEffect, useState } from "react";
import "./css/About.css";
import { FaUserCircle } from "react-icons/fa";
import { UserData_API } from "./api"; // Import the API URL from api.js

const About = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const userMobile = localStorage.getItem("userMobile");

  useEffect(() => {
    if (!userMobile) {
      setLoading(false);
      return;
    }

    // Use the imported UserData_API URL to fetch user data
    fetch(`${UserData_API}/${userMobile}/data`)
      .then((response) => response.json())
      .then((data) => {
        setUserData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        setLoading(false);
      });
  }, [userMobile]);

  return (
    <div className="about-container">
      {/* <h1>About User</h1> */}
      {loading ? (
        <p>Loading user details...</p>
      ) : userData ? (
        <div className="user-card">
          <FaUserCircle className="user-icon" />
          <h2>{userData.name}</h2>
          <p><strong>Mobile:</strong> {userData.mobile}</p>
          <p><strong>Email:</strong> {userData.email}</p>
          <p><strong>Balance:</strong> ₹{userData.balance}</p>
        </div>
      ) : (
        <p>User details not found.</p>
      )}
    </div>
  );
};

export default About;
