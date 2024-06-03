
import axios from 'axios'
import { useEffect, useState } from 'react';
const useCategoryNames = (url) => {
    const [categoryNames, setCategoryNames] = useState();
   const fetch=async()=>{
      const {data}=await axios.get(url)
      setCategoryNames(data)
      
   }
    useEffect(()=>{
        fetch()
    },[])

   
  return [categoryNames]
}

export default useCategoryNames