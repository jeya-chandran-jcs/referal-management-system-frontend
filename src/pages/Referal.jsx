import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API } from "../global";

const ReferralForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    jobTitle: "",
    resumeUrl: "",
    image: "",
    status: "Pending", 
  });

  const navigate = useNavigate();
  const User = sessionStorage.getItem("user");
  const parsedUser = JSON.parse(User);
  const token = parsedUser.token;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData);
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${API}candidate/referal`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      alert("Referral added successfully!");
      navigate("/"); 
    } catch (err) {
      console.error("Failed to add referral:", err);
      alert("Failed to add referral. Please try again.");
    }
  };
  const handleUser=()=>{
    if(User){
      sessionStorage.removeItem("user")
      window.location.href="/"
    }
    else{
      window.location.href="/user/login"
    }
  }
  return (
    <div>
         <nav className="d-flex justify-content-between align-items-center bg-light px-3 " 
          style={{top: "0",position: "sticky",zIndex: "1000",padding: "5px 10px",margin:"5px" }}>
              <button className="btn btn-primary me-3 border-0" style={{outline: "none",border: "none"}} onClick={()=>{window.location.href="/"}}>
                Home
              </button>
    
              <div className="d-flex">
                <button className="btn btn-outline-primary me-2">Refer</button>
                <button className="btn btn-outline-secondary" onClick={handleUser}>{User? "SignOut" : "SignIn"}</button>
              </div>
            </nav>
    <div className="container mt-5">
      <h2 className="text-center mb-4">Add a Referral</h2>
      <form onSubmit={handleSubmit} className="shadow p-4 bg-light rounded">
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
         
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="form-control"
            placeholder="Enter candidate's name" required/>
        </div>
       
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
       
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="form-control"
            placeholder="Enter candidate's email" required/>
        </div>
        
        <div className="mb-3">
          <label htmlFor="phone" className="form-label">
            Phone
          </label>
          <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} className="form-control"
            placeholder="Enter candidate's phone number"  required />
        </div>
        
        <div className="mb-3">
          <label htmlFor="jobTitle" className="form-label">
            Job Title
          </label>
          <input type="text" id="jobTitle" name="jobTitle"  value={formData.jobTitle} 
          onChange={handleChange} className="form-control" placeholder="Enter job title" required/>
        </div>
        
        <div className="mb-3">
          <label htmlFor="resumeUrl" className="form-label">
            Resume URL
          </label>
          <input type="text" id="resumeUrl" name="resumeUrl" value={formData.resumeUrl} onChange={handleChange} className="form-control"
            placeholder="Enter resume URL" required/>
        </div>

        <div className="mb-3">
          <label htmlFor="image" className="form-label">
            Image URL
          </label>
          <input type="text" id="image" name="image" value={formData.image} onChange={handleChange} className="form-control"
            placeholder="Enter image URL"/>
        </div>

        <div className="d-flex justify-content-end">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
    </div>
  );
};

export default ReferralForm;
