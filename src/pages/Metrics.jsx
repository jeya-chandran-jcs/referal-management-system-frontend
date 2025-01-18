import React, { useEffect, useState } from "react";
import axios from "axios";
import { API } from "../global.js";

const MetricDashboard = () => {
  const [metrics, setMetrics] = useState({
    totalCandidates: 0,
    totalHired: 0,
    totalReviewed: 0,
    totalPending: 0,
  });
  const User=sessionStorage.getItem("user")
  const parsedUser = JSON.parse(User);
  const token = parsedUser.token;

  const handleUser=()=>{
    if(User){
      sessionStorage.removeItem("user")
      window.location.href="/"
    }
    else{
      window.location.href="/user/login"
    }
  }

  const fetchMetrics = async () => {
    try {
      const response = await axios.get(`${API}metrics/dashboard`,{
        headers: {
          Authorization: `Bearer ${token}`,
          contentType: "application/json",
      }});
      setMetrics(response.data.metrics[0]);
    } catch (err) {
      console.error("Failed to fetch metrics:", err);
    }
  };

  const resetStatuses = async () => {
    try {
      await axios.put(
        `${API}metrics/reset`,
        {}, 
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      alert("Candidates' statuses reset successfully.");
      fetchMetrics(); 
    } catch (err) {
      console.error("Failed to reset candidate statuses:", err);
    }
  };
  
  useEffect(() => {
    fetchMetrics();
  }, []);

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
    <div className="container mt-5" style={{marginTop: "100px"}}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="text-center">Total Candidates: {metrics.totalCandidates}</h1>
        <button className="btn btn-primary" onClick={resetStatuses}>
          Reset Statuses
        </button>
      </div>
      <div className="row text-center">
        <div className="col-md-4 mb-3">
          <div className="card bg-light shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Hired</h5>
              <p className="card-text display-4">{metrics.totalHired}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card bg-light shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Reviewed</h5>
              <p className="card-text display-4">{metrics.totalReviewed}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card bg-light shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Pending</h5>
              <p className="card-text display-4">{metrics.totalPending}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default MetricDashboard;
