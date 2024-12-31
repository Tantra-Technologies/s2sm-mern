// frontend/App.js

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CreateProfile from "./pages/CreateProfile";
import SearchProfile from "./pages/SearchProfile";
import EmployeeManagement from "./pages/EmployeeManagement";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-profile" element={<CreateProfile />} />
        <Route path="/search-profile" element={<SearchProfile />} />
        <Route path="/employee-management" element={<EmployeeManagement />} />
      </Routes>
    </Router>
  );
};

export default App;
