import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../App";

function Login() {
  let [data, setData] = useContext(UserContext);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  let navigate = useNavigate();
  const [message, setMessage] = useState(""); // State to hold the response message

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = "http://localhost:5000/login";

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();

      if (data.msg) {
        setMessage(data.msg);
      } else {
        console.log("Logged in successfully:", data);
        navigate("/dashboard");
        setMessage("Logged in successfully:", data);
        setData(data);
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("An error occurred while logging in.");
    }
  };

  return (
    <div className="login-form">
      <h2>Login Page</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <button type="submit">Login</button>
        </div>
      </form>
      {message && <p>{message}</p>} {/* Display the message if it exists */}
      <h3>
        Don't have an account? <Link to="/register">Register Here!</Link>
      </h3>
    </div>
  );
}

export default Login;
