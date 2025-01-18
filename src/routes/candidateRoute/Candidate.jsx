import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
import {API} from "../../global.js"
import axios from "axios"
export default function Candidate({ item, errors, loading }) {
  const [userStatus,setUserStatus]=useState("")
  const navigate = useNavigate();
    console.log("fromcandidate",item)
    
    const User=sessionStorage.getItem("user")
    const parsedUser = JSON.parse(User);

    const handleStatusChange = async (id, newStatus) => {
      setUserStatus(newStatus);
    
      try {
        const response = await axios.put(
          `${API}candidate/update`,
          {
            _id: id,
            status: newStatus,
          },
          {
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${parsedUser.token}`, 
            },
          }
        );
    
        if (response.status === 200) {
          console.log("Candidate updated successfully:", response.data);
        } else {
          console.error("Error updating candidate:", response.data.message);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

  if (loading)
    return (
      <div className="text-center mt-5">
        <div className="spinner-border" role="status"></div>
      </div>
    );

  if (errors)
    return <div className="alert alert-danger text-center mt-3">{errors}</div>;

  if (!Array.isArray(item)) {
    return (
      <div className="alert alert-warning text-center">
        No candidates available or invalid data format.
      </div>
    );
  }
  

  return (
    <div className="container mt-4">
      <div className="row">
        {item.map((candidate) => (
          <div className="col-md-4 mb-4" key={candidate.email}>
            <div className="card shadow-sm">
              <div className="card-header bg-primary text-white text-center">
                <h5 className="mb-0">
                  {candidate.jobTitle || "Job Title Not Provided"}
                </h5>
              </div>
              <div className="card-body d-flex align-items-center">
                <img
                  src={
                    candidate.image ||
                    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                  }
                  alt="Candidate"
                  className="rounded-circle img-fluid me-3"
                  style={{ width: "60px", height: "60px", objectFit: "cover" }}
                />
                <div>
                  <h6 className="mb-1">{candidate.name || "Name Not Provided"}</h6>
                  <p className="mb-0 text-muted">
                    {candidate.email || "Email Not Provided"}
                  </p>
                </div>
              </div>
              <div className="card-footer d-flex justify-content-between align-items-center">
                <small className="text-muted">
                  {new Date(candidate.referredAt).toLocaleDateString() ||
                    "Date Not Provided"}
                </small>
                
                <select className="form-select form-select-sm w-auto" defaultValue={candidate.status}
                  onChange={(e) =>
                    handleStatusChange(candidate._id,e.target.value) }>

                  <option value="Pending">Pending</option>
                  <option value="Reviewed">Reviewed</option>
                  <option value="Hired">Hired</option>
                </select>
                
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
