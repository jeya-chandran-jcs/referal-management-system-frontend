import React, {useState} from "react"
import axios from "axios"
import { useNavigate,Link } from "react-router-dom"
import { API } from "../../global"

export default function Login(){
    const [formData,setFormData]=useState({
        email:"",
        password:""
    })
    const [error,setError]=useState("")
    const navigate=useNavigate()
    const handleSubmit=async(e)=>{
        e.preventDefault()
        setError("")
        try{
            const response= await axios.post(`${API}user/login`,{
                email:formData.email,
                password:formData.password
            })
            setError("")
            console.log(response.data)
            sessionStorage.setItem("user",JSON.stringify(response.data))
            console.log(sessionStorage.setItem("user",JSON.stringify(response.data)))
            navigate("/")
        } 
        catch(err){
            if(err.response && err.response.data.message){
                setError(err.response.data.message)
                setTimeout(()=>{
                    setError("")
                },3000)
            }
            else(
                alert("something went wrong please try again")
            )
        }

    }

    const handleInputChange=(e)=>{
        // setFormData({...formData,[e.target.name]:e.target.value})
        // console.log(formData)
        const {name,value}=e.target
        setFormData((prev)=>({...prev,[name]:value}))
    }
   
    return(
    <div className="container d-flex justify-content-center align-items-center"  style={{ backgroundColor: "#f8f9fa" }}>
        <div className="card shadow-lg p-4" style={{minWidth:"400px",width:"600px"}}>
            <div className="card-body">
                <h2 className="text-center mb-4">Login</h2>
                <form onSubmit={handleSubmit}>
                   <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email :</label>
                    <input id="email" type="email" name="email" className="form-control" value={formData.email}
                       onChange={handleInputChange} placeholder="Enter your email"/>
                       
                   </div>
                   <div className="mb-3"> 
                        <label className="form-label" htmlFor="password">Password :</label>
                        <input className="form-control" name="password" id="password" type="password" value={formData.password}
                        onChange={handleInputChange}/>
                       
                   </div>
                   {error && <p className="text-danger">{error}</p>}
                 
                     <div className=" text-end">
                     <button className="btn btn-primary p-3  fs-6">Login</button>
                     </div>
                </form>
            </div>
            <div className="d-flex justify-content-between">
                <Link to="/user/register" className="text-info ">Register</Link>
                <Link to="/user/forgot-password" className="text-info">forgot password?</Link>
            </div>
        </div>        
    </div>
   )
}