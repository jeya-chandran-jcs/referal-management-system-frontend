import React, { useEffect, useState } from "react";
import axios from "axios";
import {API} from "../global.js"
import Candidate from "../routes/candidateRoute/Candidate.jsx";
import Search from "../routes/candidateRoute/Search.jsx";
import Navbar from "../routes/candidateRoute/Navbar.jsx";
export default function Home() {
    const [item, setItem] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [searchQuery,setSearchQuery]=useState("");
    const [searchItems,setSearchItems]=useState([]);

    useEffect(()=>{
        setError("")
        setLoading(true)
        axios.get(`${API}candidate/dashboard`)
        .then(response=>
        {
            setItem(response.data)
            setLoading(false)
        })
        .catch((err)=>
        {
            if(error.response && error.response.data.message ){
            setError(error.response.data.message)
            setLoading(false)
       }
       else{
            console.log("An error occurred while fetching data",err)
            setError("An error occurred while fetching data")
            }
    })

    },[])

    const handleSearch=async(query)=>{
        setSearchQuery(query)
       
        setError("")
        setLoading(true)
        
  
        try{
          const response=await axios.get(`${API}candidate/search/?query=${query}`)
          setSearchItems(response.data)
          setLoading(false)
        }
        catch(err){
          if(err.response && err.response.data.message){
            setError(err.response.data.message)
            setLoading(false)
          }
          else{
            console.log("An error occurred while searching",err)
            setError("An error occurred while searching")
          }
        }finally{
          if(!query){
            setSearchItems([])
            return
          }
          
        }
      }
      const displayItems= searchQuery && searchItems.length >0 ? searchItems : item
  
  

return (
    <div>
        <Navbar onSearch={handleSearch} searchItems={searchItems} searchQuery={searchQuery} errors={error} loading={loading}/>
        {!searchQuery && <Candidate item={displayItems.candidates} errors={error} loading={loading}/>}


    </div>
)
}