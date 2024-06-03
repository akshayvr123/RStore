
import axios from 'axios'
import { useEffect, useState } from 'react';
const useCartItems = (url,token) => {

    const [cart, setCart] = useState();
   const fetch=async()=>{
    const config = {
        headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    };
      const {data}=await axios.get(url,config)
      setCart(data)
      
   }
    useEffect(()=>{
        fetch()
    },[])

   
  return [cart,setCart]
}

export default useCartItems