import axios from 'axios';
import React, { useEffect, useState } from 'react';


const OrderDetails = () => {
    let user = JSON.parse(localStorage.getItem('user'))
    const [orderDetails,setOrderDetails]=useState()
    const [total,setTotal]=useState()
    const fetchOrders=async()=>{
        const config = {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${user.token}`,
            },
        };
        const {data}=await axios.get("http://localhost:5000/api/order",config)
        setOrderDetails(data.products)
    }
    useEffect(()=>{
        fetchOrders()
    },[])

    useEffect(() => {
        const total = orderDetails?.reduce((accumulator, item) => {
            return accumulator + item.price;
        }, 0);
        setTotal(total)
    }, [orderDetails]);
    

    return (
        <div className="h-screen bg-gray-100 pt-20">
            <h1 className="mb-10 text-center text-2xl font-bold">My Orders</h1>
            <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
                <div className="rounded-lg md:w-2/3 ">


                    {orderDetails?.map((item)=>{
                        return(
                            <div className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
                            <img
                                src={item.image}
                                alt="product"
                                className="w-full rounded-lg sm:w-40"
                            />
                            <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                                <div className="mt-4 sm:mt-4">
                                    <h2 className="text-lg font-bold text-gray-900">{item.name}</h2>
                                    <p className="mt-1  text-lg  text-gray-700">{item.quantity} x {item.count}</p>
                                </div>
                                <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                                    <div className="flex items-center justify-center bg-black rounded-lg hover:bg-red-600 text-white border-gray-100">
                                        <button className='m-1 font-semibold '>Order details</button>
                                    </div>
                                    <div className="flex items-center space-x-4">
                                        <p className="text-lg font-manrope font-bold">Rs : {item.price *item.count}</p>
                                        <svg
                                            onClick={() => handleRemoveClick(item)}
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth="1.5"
                                            stroke="currentColor"
                                            className="h-5 w-5 font-bold rounded-lg text-3xl text-black cursor-pointer duration-150 hover:text-red-500"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                        )
                    })}
                 {!orderDetails && <h1>Order is empty</h1>}
                </div>
                <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
                    <h1 className='font-manrope font-semibold'>shipping Adress</h1>
                    <div className="mb-2 mt-3 flex justify-between">
                        <p className="text-gray-700">Name</p>
                        <p className="text-gray-700">Akshay</p>
                    </div>
                    <div className="flex justify-between">
                        <p className="text-gray-700">Phone</p>
                        <p className="text-gray-700">8590345468</p>
                    </div>
                    <div className="flex justify-between">
                        <p className="text-gray-700">state</p>
                        <p className="text-gray-700">kerala</p>
                    </div>
                  

                    <hr className="my-4" />
                    <div className="flex justify-between">
                        <p className="text-lg font-bold">Total</p>
                        <div>
                            <p className="mb-1 text-lg font-bold">Rs : {total}</p>
                            <p className="text-sm text-gray-700">including GST</p>
                        </div>
                    </div>
                    <button className="mt-6 w-full rounded-md bg-green-500 py-1.5 font-medium text-blue-50 hover:bg-green-700">
                        Edit Details
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OrderDetails;
