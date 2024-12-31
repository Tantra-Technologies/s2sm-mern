// frontend/pages/EmployeeManagement.js

import React, { useState, useEffect } from "react";
import AdminLayout from "../layouts/AdminLayout";

const EmployeeManagement = () => {
  const [employees, setEmployees] = useState([]);
  const [newEmployee, setNewEmployee] = useState({
    name: "",
    email: "",
    password: "",
    role: "employee",
  });

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/employees");
        if (response.ok) {
          const data = await response.json();
          setEmployees(data);
        }
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchEmployees();
  }, []);

  const handleAddEmployee = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:4000/api/employees/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newEmployee),
      });

      if (response.ok) {
        const employee = await response.json();
        setEmployees([...employees, employee]);
        setNewEmployee({ name: "", email: "", phone: "", role: "employee" });
      } else {
        alert("Failed to add employee");
      }
    } catch (error) {
      console.error("Error adding employee:", error);
    }
  };

  const handleDeleteEmployee = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/employees/${id}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        setEmployees(employees.filter((employee) => employee._id !== id));
      } else {
        alert("Failed to delete employee");
      }
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  return (
    <AdminLayout>
      <h2>Employee Management</h2>
      <form onSubmit={handleAddEmployee}>
        <input
          name="name"
          placeholder="Name"
          value={newEmployee.name}
          onChange={(e) =>
            setNewEmployee({ ...newEmployee, name: e.target.value })
          }
          required
        />
        <input
          name="email"
          placeholder="Email"
          value={newEmployee.email}
          onChange={(e) =>
            setNewEmployee({ ...newEmployee, email: e.target.value })
          }
          required
        />
        <input
          name="password"
          placeholder="Password"
          type="password"
          value={newEmployee.password}
          onChange={(e) =>
            setNewEmployee({ ...newEmployee, password: e.target.value })
          }
          required
        />
        <select
          name="role"
          value={newEmployee.role}
          onChange={(e) =>
            setNewEmployee({ ...newEmployee, role: e.target.value })
          }
        >
          <option value="employee">Employee</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit">Add Employee</button>
      </form>
      <ul>
        {employees.map((employee) => (
          <li key={employee._id}>
            {employee.name} - {employee.email}{" "}
            <button onClick={() => handleDeleteEmployee(employee._id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </AdminLayout>
  );
};

export default EmployeeManagement;
