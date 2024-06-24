import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { OrderContext } from '../../Contexts/orderContext'
import { useNavigate } from 'react-router-dom'
import { OrderIdContext } from '../../Contexts/OrderIdContext'

const Allorders = () => {
    const [allOrders, setAllOrders] = useState()
   
    let user = JSON.parse(localStorage.getItem('user'))
    const {order,setOrder}=useContext(OrderContext)
    const navigate=useNavigate()
    const fetchOrders = async () => {
        const config = {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${user.token}`,
            },
        };
        const { data } = await axios.get('http://localhost:5000/api/order/all', config)
        setAllOrders(data)
    }
    useEffect(() => {
        fetchOrders()
    }, [])

    useEffect(()=>{
        console.log(order);
    },[order])
    const handleClick=async(id)=>{

        navigate('/editorders')
        const config = {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${user.token}`,
            },
            params: { id: id }  
        };
        
        try {
            const {data}=await axios.get("http://localhost:5000/api/order/admin",config)
            setOrder(data)
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <h1 className='mt-5 text-2xl font-bold text-center'>All Orders</h1>
            <div className='flex flex-wrap m-3 items-center justify-center'>

                {allOrders?.map((item) => {
                    return (
                        <div className='card_container w-80 border-1 border-black rounded-md p-3 m-3'>
                            <h1 className='text-xl  font-manrope font-bold'>Order date :{item.date}</h1>
                            <h1 className='mt-2 overflow-hidden'><span className='font-semibold'>Order Id:</span>{item._id}</h1>
                            <p className='h-12 overflow-hidden'><span className='font-semibold'>Shipping adresss :</span>{item.adress}</p>
                            <button onClick={()=>handleClick(item._id)} className='border bg-black  rounded-lg text-white py-1 px-2 mt-2 font-semibold'>View orders</button>
                        </div>
                    )
                })}


            </div>
        </div>
    )
}

export default Allorders
