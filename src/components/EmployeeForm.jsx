import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../css/EmployeeForm.css'; 
import { useNavigate } from 'react-router-dom';

const EmployeeForm = () => {
  const navigate = useNavigate()
  const [employeeName, setEmployeeName] = useState('');
  const [address, setAddress] = useState('');
  const [pincode, setPincode] = useState('');
  const [city, setCity] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [basicSalary, setBasicSalary] = useState('');
  const [da, setDa] = useState('');

  useEffect(() => {
    if (basicSalary) {
      setDa((0.6 * basicSalary).toFixed(2));
    }
  }, [basicSalary]);

  const fetchCity = async (pincode) => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get(`http://localhost:4000/city/${pincode}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        setCity(response.data.data);
      }
    } catch (error) {
      toast.error('Error fetching city for this pincode');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    
    const employeeData = {
      employeeName,
      address,
      city,
      pincode,
      mobileNumber,
      basicSalary
    };
    
    try {
      const response = await axios.post('http://localhost:4000/employee', employeeData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        toast.success('Employee created successfully');
        navigate(`/employee/${response.data.data._id}`);
      }
    } catch (error) {
      toast.error('Error creating employee');
    }
  };

  const handlePincodeChange = (e) => {
    const value = e.target.value;
    setPincode(value);

    if (value.length === 6) {
      fetchCity(value);
    } else {
      setCity('');
    }
  };

  return (
    <div className="employee-form-container">
      <h2>Create Employee</h2>
      <form onSubmit={handleSubmit} className="employee-form">
        <div className="form-group">
          <label>Employee Name</label>
          <input
            type="text"
            value={employeeName}
            onChange={(e) => setEmployeeName(e.target.value)}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Address</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Pincode</label>
          <input
            type="text"
            value={pincode}
            onChange={handlePincodeChange}
            required
          />
        </div>

        <div className="form-group">
          <label>City</label>
          <input
            type="text"
            value={city}
            readOnly
            required
          />
        </div>

        <div className="form-group">
          <label>Mobile Number</label>
          <input
            type="text"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Basic Salary</label>
          <input
            type="number"
            value={basicSalary}
            onChange={(e) => setBasicSalary(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>DA (60% of Basic Salary)</label>
          <input
            type="text"
            value={da}
            readOnly
          />
        </div>

        <button type="submit" className="submit-btn">Save Employee</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default EmployeeForm;
