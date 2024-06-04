
import axios from 'axios'
import { useEffect, useState } from 'react';


const useRemoveItem = (url, token) => {
   
    const [newcart, setnewCart] = useState();
    const remove = async (prd) => {
        if(!prd){
            console.log('product is required for removing an item');
            return
        }
        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                data: {
                    name: prd.name,
                }
            };

            const { data } = await axios.delete(url, config);
            setnewCart(data.products)
          
        } catch (error) {
            console.log(error);;
        }

    }
    useEffect(() => {
        remove()
    }, [url])


    return [newcart,remove]
}

export default useRemoveItem