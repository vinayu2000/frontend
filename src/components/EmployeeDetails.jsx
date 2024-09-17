import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../css/EmployeeDetails.css';

const EmployeeDetails = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    const fetchEmployee = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get(`http://localhost:4000/employee/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 200) {
          setEmployee(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching employee details', error);
      }
    };

    fetchEmployee();
  }, [id]);

  if (!employee) return <div>Loading...</div>;

  return (
    <div className="employee-details-container">
      <h2>Employee Details</h2>
      <div className="employee-details">
        <p><strong>Employee Name:</strong> {employee.employeeName}</p>
        <p><strong>Address:</strong> {employee.address}</p>
        <p><strong>City:</strong> {employee.city}</p>
        <p><strong>Pincode:</strong> {employee.pincode}</p>
        <p><strong>Mobile Number:</strong> {employee.mobileNumber}</p>
        <p><strong>Basic Salary:</strong> {employee.basicSalary}</p>
        <p><strong>DA:</strong> {employee.da}</p>
      </div>
    </div>
  );
};

export default EmployeeDetails;
