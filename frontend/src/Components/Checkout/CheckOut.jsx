import React, { useEffect, useState } from 'react'
import useCartItems from '../../CustomHooks/useCart'
import useOrder from '../../CustomHooks/useOrder'
import { useNavigate } from 'react-router-dom'

const CheckOut = () => {
    let user = JSON.parse(localStorage.getItem('user'))
    const BASE_URL=import.meta.env.VITE_BACKEND_BASE_URL
    const navigate=useNavigate()
    const [personalDetails,setPersonalDetails]=useState({
        firstName:'',
        lastName:"",
        email:'',
        phone:null
        
    })
    const [shippingAdress,setShippingAdress]=useState({
        adressline:'',
        city:"",
        state:'',
        pin:1
    })
    const [cart] = useCartItems(`${BASE_URL}/api/cart`, user.token)

    const [total,setTotal]=useState()
    const {handlePayment}=useOrder(cart,personalDetails,shippingAdress,total)
    const [checkoutProducts, setCheckoutProducts] = useState()
    useEffect(() => { 
        setCheckoutProducts(cart)
        findTotal()
    }, [cart])

    useEffect(()=>{
        console.log(total);
    },[total])

    const findTotal = (carts) => {
        // Check if cart is valid
        if (!cart || !Array.isArray(cart)) {
          console.error("Invalid cart: Please provide a valid array of products.");
          return; // Or return 0 or another default value
        }
      
        // Calculate total price using reduce
        const totalPrice = cart.reduce((acc, item) => acc + item.price, 0);
        setTotal(totalPrice+49)
      
        console.log("Total price:", totalPrice);
      };
    return (
        <div>
            <div class="font-[sans-serif] bg-white">
                <div class="flex max-sm:flex-col gap-12 max-lg:gap-4 h-full">
                    <div class="bg-green-800 sm:h-screen sm:sticky sm:top-0 lg:min-w-[370px] sm:min-w-[300px]">
                        <div class="relative h-full">
                            <div class="px-4 py-8 sm:overflow-auto sm:h-[calc(100vh-60px)]">
                                <div class="space-y-4">


                                    {checkoutProducts?.map((item) => {
                                        return (
                                            <div class="flex items-start gap-4">
                                                <div className="w-32 h-28 max-lg:w-24  max-lg:h-24 flex p-1 shrink-0 bg-white rounded-md">
                                                    <img src={item.image} className="w-full  h-full" />
                                                </div>
                                                <div class="w-full">
                                                    <h3 class="text-base text-white">{item.name}</h3>
                                                    <ul class="text-xs text-gray-300 space-y-2 mt-2">
                                                        <li>Size <span class="float-right">{item.quantity}</span></li>
                                                        <li>Quantity <span class="float-right">{item.count}</span></li>
                                                        <li>Total Price <span class="float-right">{item.price*item.count}</span></li>
                                                    </ul>
                                                </div>
                                            </div>
                                        )
                                    })}

                                </div>
                            </div>

                            <div class="md:absolute md:left-0 md:bottom-0 bg-green-800 w-full p-4">
                                <h4 class="flex flex-wrap gap-4 text-base text-white">Total <span class="ml-auto">₹{total}</span></h4>
                            </div>
                        </div>
                    </div>

                    <div class="max-w-4xl w-full h-max rounded-md px-4 py-8 sticky top-0">
                        <h2 class="text-2xl font-bold text-gray-800">Complete your order</h2>
                        <form class="mt-8">
                            <div>
                                <h3 class="text-base text-gray-800 mb-4">Personal Details</h3>
                                <div class="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <input onChange={(e)=>setPersonalDetails({...personalDetails,firstName:e.target.value})} type="text" placeholder="First Name"
                                            class="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-blue-600" />
                                    </div>

                                    <div>
                                        <input onChange={(e)=>setPersonalDetails({...personalDetails,lastName:e.target.value})} type="text" placeholder="Last Name"
                                            class="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-blue-600" />
                                    </div>

                                    <div>
                                        <input  onChange={(e)=>setPersonalDetails({...personalDetails,email:e.target.value})} required type="email" placeholder="Email"
                                            class="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-blue-600" />
                                    </div>

                                    <div>
                                        <input  onChange={(e)=>setPersonalDetails({...personalDetails,phone:e.target.value})} type="number" placeholder="Phone No."
                                            class="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-blue-600" />
                                    </div>
                                </div>
                            </div>

                            <div class="mt-8">
                                <h3 class="text-base text-gray-800 mb-4">Shipping Address</h3>
                                <div class="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <input  onChange={(e)=>setShippingAdress({...shippingAdress,adressline:e.target.value})}  type="text" placeholder="Address Line"
                                            class="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-blue-600" />
                                    </div>
                                    <div>
                                        <input onChange={(e)=>setShippingAdress({...shippingAdress,city:e.target.value})} type="text" placeholder="City"
                                            class="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-blue-600" />
                                    </div>
                                    <div>
                                        <input onChange={(e)=>setShippingAdress({...shippingAdress,state:e.target.value})} type="text" placeholder="State"
                                            class="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-blue-600" />
                                    </div>
                                    <div>
                                        <input onChange={(e)=>setShippingAdress({...shippingAdress,pin:e.target.value})} type="number" placeholder="Zip Code"
                                            class="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-blue-600" />
                                    </div>
                                </div>

                                <div class="flex gap-4 max-md:flex-col mt-8">
                                    <button onClick={()=>navigate('/cart')} type="button" class="rounded-md px-6 py-3 w-full text-sm tracking-wide bg-transparent hover:bg-gray-100 border border-gray-300 text-gray-800 max-md:order-1">Cancel</button>
                                    <button onClick={handlePayment} type="button" class="rounded-md px-6 py-3 w-full text-sm tracking-wide bg-blue-600 hover:bg-blue-700 text-white">Complete Purchase</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CheckOut
