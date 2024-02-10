import React, { useState } from "react";
import { Link } from "react-router-dom";

function Registration() {
  const [formData, setFormData] = useState({
    name: "",
    password: "",
    email: "",
    dob: "",
    contact: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = "http://localhost:5000/register";

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    };

    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      alert("registered successfully!");
      console.log("Success:", data);
      // setFormData(null);
    } catch (error) {
      if ((error = "Error: HTTP error! status: 409")) {
        alert("email aleardy registered");
      }
      console.error("Error:", error);
    }
  };

  return (
    <div className="registration-form">
      <h2>Registration Page</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="text"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Date of Birth:</label>
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Contact:</label>
          <input
            type="tel"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <button type="submit">Register</button>
        </div>
      </form>
      <h3>
        Already a member? <Link to="/">Login Here!</Link>
      </h3>
    </div>
  );
}

export default Registration;
