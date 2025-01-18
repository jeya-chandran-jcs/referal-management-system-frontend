import React,{useState} from "react"
import axios from "axios"
import {API} from "../../global"
import {useNavigate,Link} from "react-router-dom"

export default function ForgetPassword(){
    const [email,setEmail]=useState("")
    const [error,setError]=useState("")
    const navigate=useNavigate()
    
    const handleSubmit=async(e)=>{
        e.preventDefault()
        setError("")
        try{
            const response = await axios.post(`${API}user/forget-password`,{
                email:email
            })
            navigate("/user/login")
         }
        catch(err){
            console.error("error in forget password",err)
            setError("Invalid email ")
        }
    }
    
    return(
        <div className="container d-flex justify-content-center align-items-center vh-100" style={{backgroundColor:"#f8f9fa"}} >
            <div className="card shadow-lg p-4" style={{minWidth:"400px",width:"600px"}}>
                <div className="card-body">
                    <h2 className="card-title text-center mb-4">Forgot password</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email  </label>
                            <input className="form-control" id="email" type="email" name="email"
                            placeholder="Enter your email" value={email} onChange={(e)=>setEmail(e.target.value)} required/>
                            {error && <p className="text-danger p-2">{error}</p>  }
                        </div>

                        <div className="text-end">
                        <button type="submit" className="btn btn-info">verify</button>
                        </div>
                    </form>
                </div>
                <div className="text-start mt-3">
                <Link className="text-primary " to="/login">SignIn</Link>
                </div>
            </div>
        </div>
    )
}