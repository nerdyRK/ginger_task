import React, { useContext, useState } from "react";
import { UserContext } from "../App";
import { Link, useNavigate } from "react-router-dom";
import UserButton from "./UserButton";

function Dashboard() {
  let [contextData, setContextData] = useContext(UserContext);
  let navigate = useNavigate();
  // Local state for form inputs
  const [profileData, setProfileData] = useState({
    name: contextData[0]?.name || "",
    contact: contextData[0]?.contact || "",
    email: contextData[0]?.email || "",
  });

  if (!contextData || !contextData[0]?.id) {
    setTimeout(() => {
      navigate("/");
    }, 3000);
    return <div>Loading...</div>; // Or some other loading indicator
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProfileData({
      ...profileData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(profileData);
    try {
      const response = await fetch(
        `http://localhost:5000/api/users/${contextData[0]?.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(profileData),
        }
      );

      if (response.ok) {
        const updatedUser = await response.json();
        console.log("Profile updated successfully:", updatedUser);
        console.log(updatedUser);
        // Update the context data with the updated user information
        alert("updated successfully.");
        setContextData([...contextData, updatedUser]);
      } else {
        const errorResponse = await response.json();
        console.error("Failed to update profile:", errorResponse.message);
        // Handle the error appropriately, e.g., show an error message to the user
      }
    } catch (networkError) {
      console.error("Network error:", networkError);
      // Handle network errors, e.g., show an error message to the user
    }
  };

  return (
    <>
      <div className="login-form">
        <h2>Update Profile</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={profileData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="contact">Contact:</label>
            <input
              type="tel"
              id="contact"
              name="contact"
              value={profileData.contact}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={profileData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <button type="submit">Update Profile</button>
          </div>
        </form>
      </div>
      <UserButton />
    </>
  );
}

export default Dashboard;
