import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { OrderContext } from '../../Contexts/orderContext';
import { useNavigate } from 'react-router-dom';

const AllOrdersOfUser = () => {
    const [allOrdersOfUser, setAllordersOfUser] = useState()
    const {order,setOrder}=useContext(OrderContext)
    const BASE_URL=import.meta.env.VITE_BACKEND_BASE_URL
    const navigate=useNavigate()
    let user = JSON.parse(localStorage.getItem('user'))
    const fetchOrders = async () => {
        const config = {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${user.token}`,
            },
        };
        const { data } = await axios.get(`${BASE_URL}/api/order`, config)
        setAllordersOfUser(data)
    }
    useEffect(() => {
        fetchOrders()
    }, [])

    useEffect(()=>{
        console.log(order);
    },[order])

    const handleOrderClick=(item)=>{
        setOrder(item.products)
        navigate('/vieworder')
    }

    return (
        <div>
            <h1 className='mt-5 text-2xl font-bold text-center'>All Orders</h1>
            <div className='flex flex-wrap m-3 items-center justify-center'>

                {allOrdersOfUser?.map((item) => {
                    return (
                        <div className='card_container w-80 border-1 border-black rounded-md p-3 m-3'>
                            <h1 className='text-xl  font-manrope font-bold'>Order date :{item.date}</h1>
                            <h1 className='mt-2 overflow-y-hidden'><span className='font-semibold'>Order Id:</span> {item._id}</h1>
                            <p className='text-wrap h-12 overflow-hidden'><span className='font-semibold '>Shipping adresss :</span>{item.adress}</p>
                            <button onClick={()=>handleOrderClick(item)} className='border bg-black  rounded-lg text-white py-1 px-2 mt-2 font-semibold'>View orders</button>
                        </div>
                    )
                })}

            </div>
        </div>
    )
}

export default AllOrdersOfUser
