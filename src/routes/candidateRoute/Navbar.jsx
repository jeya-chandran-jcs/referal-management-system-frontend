import React from "react";
import Search from "./Search";
import {useNavigate} from "react-router-dom"

export default function Navbar({onSearch, searchItems, searchQuery, errors, loading}) {
  const navigate=useNavigate()  
  const User=sessionStorage.getItem("user")
    // const parsedUser = JSON.parse(User);
    // const token = parsedUser.token;
    // if(!token){
    //   sessionStorage.removeItem("user")
    // }
  
  const handleClick=()=>{
    if(User){
      sessionStorage.removeItem("user")
      navigate("/")
    }
    else{
      navigate("/user/login")
    }
  }

  const handleMetrics=()=>{
    if(User){
      navigate("/metrics-dashboard")
    }
    else{
     alert("Please SignIn to view Metrics")
    }
  }

  const handleRefer=()=>{
    if(User){
      navigate("/referal")
    }
    else{
      alert("Please SignIn to refer")
    }
  }
  
  return (
    <nav className="d-flex justify-content-between align-items-center bg-light px-3">
      <button className="btn btn-primary me-3 border-0" style={{outline: "none",border: "none"}} onClick={handleMetrics}>
        Metrics 
      </button>
      <Search 
        onSearch={onSearch} 
        searchItems={searchItems} 
        searchQuery={searchQuery} 
        errors={errors} 
        loading={loading} 
      />

      {/* Right Side: Refer and Sign In/Sign Out Buttons */}
      <div className="d-flex">
        <button className="btn btn-outline-primary me-2" onClick={handleRefer}>Refer</button>
        <button className="btn btn-outline-secondary" onClick={handleClick}>{User? "SignOut" : "SignIn"}</button>
      </div>
    </nav>
  );
}
