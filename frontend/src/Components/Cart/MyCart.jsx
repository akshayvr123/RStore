import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addtocart, removefromcart } from '../../Slices/cartSlice';
import useCartItems from '../../CustomHooks/useCart';
import useRemoveItem from '../../CustomHooks/useRemoveCart';
import axios from 'axios';
import useOrder from '../../CustomHooks/useOrder';
import { useNavigate } from 'react-router-dom';

const MyCart = () => {
    let user = JSON.parse(localStorage.getItem('user'))
    const [cart] = useCartItems("http://localhost:5000/api/cart", user.token)
    const [total,setTotal]=useState(0)
    const {handlePayment}=useOrder(cart,total)
    const dispatch = useDispatch(cart)
    const [newcart,remove]=useRemoveItem("http://localhost:5000/api/cart/remove",user.token)
    const carts = useSelector((state) => state?.cart)
    const navigate=useNavigate()
    const findTotal = (carts) => {
        // Check if cart is valid
        if (!carts || !Array.isArray(cart)) {
          console.error("Invalid cart: Please provide a valid array of products.");
          return; // Or return 0 or another default value
        }
      
        // Calculate total price using reduce
        const totalPrice = carts.reduce((acc, item) => acc + item.price, 0);
        setTotal(totalPrice)
      
        console.log("Total price:", totalPrice);
      };
      
      // Example usage (assuming cart is defined elsewhere)
      
      useEffect(()=>{
       
        dispatch(removefromcart(newcart))
         },[newcart])
    
    useEffect(() => {
        console.log(cart);
        dispatch(addtocart(cart))
        
    }, [cart])

    useEffect(()=>{
        findTotal(carts);
    },[carts])

    const handleRemoveClick=(item)=>{
        remove(item)
      }

      const handleCountChange=async(item,operation)=>{
        if(operation==='decrement'&&item.count===1){
            console.log("Lowest quantity is this");
            return
        }
        let baseprice=item.price/item.count
        console.log(item.count);
        try {
         const config = {
             headers: {
                 "Content-type": "application/json",
                 Authorization: `Bearer ${user.token}`,
             },
         };
         const {data}=await axios.put("http://localhost:5000/api/cart/update",{
             name:item.name,
             count:operation==='decrement'?item.count-1:item.count+1,
             baseprice:baseprice
         },config)
         dispatch(addtocart(data))
        } catch (error) {
         alert(error)
        }
       }
      
    return (
        <div className="h-screen bg-gray-100 pt-20">
            <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
            <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
                <div className="rounded-lg md:w-2/3 ">

                    {carts?.length > 0 ? carts.map((item) => {
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
                                        <p className="mt-1  text-lg  text-gray-700">{item.quantity}</p>
                                    </div>
                                    <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                                        <div className="flex items-center justify-center border-gray-100">
                                            <span onClick={()=>handleCountChange(item,"decrement")} className="cursor-pointer rounded-r bg-gray-100 font-bold text-2xl   w-9 h-8 scrollbar-hide text-center duration-100 hover:bg-red-500 hover:text-blue-50">
                                                -
                                            </span>
                                            <input

                                                className="h-8 w-8 border text-sm font-bold  text-center   "
                                                type="number"
                                                value={item.count?item.count:2}
                                                min="1"
                                            />
                                            <span onClick={()=>handleCountChange(item,"increment")} className="cursor-pointer rounded-r bg-gray-100 font-bold text-2xl  w-9 h-8 scrollbar-hide text-center duration-100 hover:bg-green-500 hover:text-blue-50">
                                                +
                                            </span>
                                        </div>
                                        <div className="flex items-center space-x-4">
                                            <p className="text-lg font-manrope font-bold">Rs : {item.price}</p>
                                            <svg
                                            onClick={()=>handleRemoveClick(item)}
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
                    }) : <h1 className='flex justify-center items-center text-center text-3xl font-bold mt-32'>Cart is empty</h1>}

                </div>
                <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
                    <div className="mb-2 flex justify-between">
                        <p className="text-gray-700">Subtotal</p>
                        <p className="text-gray-700">Rs :{total>0?total:0}</p>
                    </div>
                    <div className="flex justify-between">
                        <p className="text-gray-700">Delivery</p>
                        <p className="text-gray-700">Rs:{total>0?49:0}</p>
                    </div>
                    <hr className="my-4" />
                    <div className="flex justify-between">
                        <p className="text-lg font-bold">Total</p>
                        <div>
                            <p className="mb-1 text-lg font-bold">Rs:{total?total+49:0}</p>
                            <p className="text-sm text-gray-700">including GST</p>
                        </div>
                    </div>
                    <button onClick={()=>navigate('/checkout')} className="mt-6 w-full rounded-md bg-green-500 py-1.5 font-medium text-blue-50 hover:bg-green-700">
                        Check out
                    </button>
                </div>
                
            </div>
        </div>
    );
};

export default MyCart;
