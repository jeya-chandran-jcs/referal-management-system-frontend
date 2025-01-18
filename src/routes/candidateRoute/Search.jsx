import React from "react"
import "./search.css"
export default function Search({onSearch, searchItems, searchQuery, errors, loading}){
   
    console.log("searchItems",searchItems)
    const handleStatusChange = (id, newStatus) => {
        console.log(`Status for candidate ${id} updated to ${newStatus}`);
      };
    const handleSearch=async (e)=>{
        e.preventDefault()      
        }
        const handleKey=(e)=>{
            if(e.key==="Enter"){
                onSearch(e.target.value)
            }
    }
    return(
        <div className="container-fluid d-flex flex-column mt-3">
            <div className=" search-container" >
                <i className="fa-solid fa-magnifying-glass text-muted mr-2 search-icon"></i>

                <input type="text" id="search" name="search"  placeholder="Search here " 
                className="text-dark fw-bold  search-input" onKeyUp={handleKey} value={searchQuery} 
                onChange={(e)=>onSearch(e.target.value)}/>
                
                <button className="search-button btn btn-primary" onClick={()=>onSearch(searchQuery)}> Search</button>)
            
            </div>
                {errors && !loading && 
                <p className="text-muted">sorry no items found , try another query</p> }

                {loading && <div className=" d- flex justify-content-center align-items-center 
                spinner-border text-primary ml-2"></div> }
            <div className="row">
        {searchItems.map((candidate) => (
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
                <select
                  className="form-select form-select-sm w-auto"
                  defaultValue={candidate.status || "Pending"}
                  onChange={(e) =>
                    handleStatusChange(candidate.email, e.target.value)
                  }
                >
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
    )
}