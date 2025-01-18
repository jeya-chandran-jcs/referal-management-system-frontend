import React,{useState} from "react"
import axios from "axios"
import {API} from "../../global"
import {useNavigate,Link,useParams} from "react-router-dom"

export default function ResetPassword(){
    const [password,setPassword]=useState("")
    const [error,setError]=useState("")
    const {token}=useParams()
    const navigate=useNavigate()
    
    const handleSubmit=async(e)=>{
        e.preventDefault()
        setError("")
        try{
            const response = await axios.post(`${API}user/reset-password/${token}`,{
                newPassword:password
            })
            console.log("token")
            console.log(token)
            console.log(response)
            navigate("/user/login")
         }
        catch(err){
            console.error("error in reset password",err)
            setError(err.response?.data?.message || "An error occured")
        }
    }
    
    return(
        <div className="container d-flex justify-content-center align-items-center vh-100" style={{backgroundColor:"#f8f9fa"}} >
            <div className="card shadow-lg p-4" style={{minWidth:"400px",width:"600px"}}>
                <div className="card-body">
                    <h2 className="card-title text-center mb-4">Reset password</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password  </label>
                            <input className="form-control" id="password" type="password" name="password"
                            placeholder="Enter your new password" value={password} onChange={(e)=>setPassword(e.target.value)} required/>
                            {error && <p className="text-danger p-2">{error}</p>  }
                        </div>

                        <div className="text-end">
                        <button type="submit" className="btn btn-info">Reset</button>
                        </div>
                    </form>
                </div>
                <div className="text-start mt-3">
                <Link className="text-primary " to="/user/login">SignIn</Link>
                </div>
            </div>
        </div>
    )
}