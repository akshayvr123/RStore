import React, { useState } from 'react'
import axios from "axios"

const Test = () => {
  const [state,setState]=useState()
  const fetchCategory = async () => {
    try {
        const categoryname = "vegetables"; // Assuming you have the category name here
    
        const response = await axios.get('http://localhost:5000/api/product/categorynames', 
        //   params: {
        //     categoryname: categoryname
        // }
        );

        
        setState(response.data.categoryNames) // Assuming the response contains the category data
    } catch (error) {
        console.error("Error fetching category:", error);
    }
};



  return (
    
    <div>
      <button onClick={fetchCategory}>click to fetch</button>
      {state?state.map((prd)=>{
        return(
        <div>
 <h1 key={prd}>{prd}</h1>
       
        </div>
       
       )}):""}
    </div>
  )
}

export default Test
