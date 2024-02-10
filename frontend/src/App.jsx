import React, { createContext, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Registraion from "./components/Registration";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Users from "./components/Users";
// import PrivateRoute from "./components/PrivateRoute";
import "./App.css";
// import UpdateDetailsPage from "./UpdateDetailsPage";

let UserContext = createContext();

function App() {
  let [data, setData] = useState({});

  return (
    <UserContext.Provider value={[data, setData]}>
      <Router>
        <div className="app">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Registraion />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/users" element={<Users />} />
            {/* <Route path="/update-details" component={UpdateDetailsPage} /> */}
          </Routes>
        </div>
      </Router>
    </UserContext.Provider>
  );
}

export { UserContext };
export default App;

//! sitemap in next and best practices
