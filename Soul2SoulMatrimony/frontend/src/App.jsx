import React from "react";
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { UserProvider } from "./context/UserContext"; 
import ProtectedRoute from "./routes/ProtectedRoute";
import Login from "./pages/Login";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import CreateMatrimonyProfile from "./pages/CreateMatrimonyProfile";
import SearchMatrimonyProfile from "./pages/SearchMatrimonyProfile";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Unauthorized from "./pages/Unauthorized";
import ForgotPasswordScreen from "./pages/ForgotPasswordScreen";
import AdminNotifications from "./pages/admin/AdminNotifications";
import AdminSearchProfile from "./pages/admin/AdminSearchProfile";
import AdminEmployeeManagement from "./pages/admin/AdminEmployeeManagement";

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <UserProvider>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPasswordScreen />} />

            {/* Admin Routes */}
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/notifications"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <AdminNotifications />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/employee-management"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <AdminEmployeeManagement />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/profiles"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <AdminSearchProfile />
                </ProtectedRoute>
              }
            />


            {/* Employee Routes */}
            <Route
              path="/employee/dashboard"
              element={
                <ProtectedRoute allowedRoles={["employee"]}>
                  <EmployeeDashboard />
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/employee/create-profile"
              element={
                <ProtectedRoute allowedRoles={["employee"]}>
                  <CreateMatrimonyProfile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/employee/profiles"
              element={
                <ProtectedRoute allowedRoles={["employee"]}>
                  <SearchMatrimonyProfile/>
                </ProtectedRoute>
              }
            />


            {/* Unauthorized  */}
            <Route path="/unauthorized" element={<Unauthorized />} />
          </Routes>
        </UserProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
