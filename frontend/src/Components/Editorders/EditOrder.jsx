
import React, { useContext, useEffect } from 'react';
import { OrderContext } from '../../Contexts/orderContext';
import { Checkmark } from 'react-checkmark'
import axios from 'axios';

const EditOrder = () => {
    const { order, setOrder } = useContext(OrderContext)
    let user = JSON.parse(localStorage.getItem('user'))



    const handleDelivered = async (item) => {
        const config = {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${user.token}`,
            }
        };
    
        try {
            const { data } = await axios.put(
                "http://localhost:5000/api/order/edit",
                { id: order._id, name: item.name },
                config
            );
            console.log(data);
            setOrder(data)
        } catch (error) {
            console.log("error is"+error);
        }
    };
    
    return (
        <div className="h-screen bg-gray-100 pt-20">
            <h1 className="mb-10 text-center text-2xl font-bold">My Orders</h1>
            <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
                <div className="rounded-lg md:w-2/3 ">


                    {order?order?.products?.map((item) => {
                        return (
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
                                  {item.status!=='delivered'?  <div className="flex items-center justify-center bg-green-600 rounded-lg hover:bg-red-600 text-white border-gray-100">
                                            <button onClick={()=>handleDelivered(item)} className='m-1 font-semibold '>Delivered</button>

                                        </div>
                                        :<Checkmark size="24px"/>}
                                        <div className="flex items-center space-x-4">
                                            <p className="text-lg font-manrope font-bold">Rs : {item.price * item.count}</p>
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
                    })
                   :"" }


                </div>
                <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
                    <h1 className='font-manrope font-semibold'>shipping Adress</h1>
                    <div className="mb-2 mt-3 flex justify-between">
                        <p className="text-gray-700">Name</p>
                        <p className="text-gray-700">{order&&order?.name }</p>
                    </div>
                    <div className="flex justify-between">
                        <p className="text-gray-700">Phone</p>
                        <p className="text-gray-700">{order&&order?.phone}</p>
                    </div>
                    <div className="flex ">
                        <p className="text-gray-700 mr-2 w-full ">Adress</p>
                        <p className="text-gray-700 pl-16 text-end ">{order&&order?.adress}</p>
                    </div>


                    <hr className="my-4" />
                    <div className="flex justify-between">
                        <p className="text-lg font-bold">Total</p>
                        <div>
                            <p className="mb-1 text-lg font-bold">Rs :  49</p>
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

export default EditOrder;
