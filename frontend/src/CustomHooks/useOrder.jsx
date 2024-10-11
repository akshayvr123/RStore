import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useCurrentDate from './useCurrentDate';

const useOrder = (cart,personalDetails,shippingAdress,total) => {
   const navigate=useNavigate()
    let user = JSON.parse(localStorage.getItem('user'))
    const BASE_URL=import.meta.env.VITE_BACKEND_BASE_URL
    const {currentDate}=useCurrentDate()
    const handlePayment = async () => {
        console.log(shippingAdress.adressline+","+shippingAdress.state+","+shippingAdress.city+","+shippingAdress.pin);
        if(!personalDetails.firstName||!personalDetails.lastName||!personalDetails.email||!personalDetails.phone){
            alert("Please fill all the personal details")
            return
        }
        if(!shippingAdress.adressline||!shippingAdress.state||!shippingAdress.city||!shippingAdress.pin){
            alert("Please fill the shipping details")
            return
        }
        try {
            // Step 1: Create an order on your backend
            const orderUrl = `${BASE_URL}/api/order/create-order`;
            const response = await axios.post(orderUrl, {
                amount: total*100, // Amount in smallest currency unit (e.g., paise for INR)
                currency: 'INR',
                receipt: 'receipt#1',
                notes: {
                    key1: 'value3',
                    key2: 'value2'
                }
            });

            const { id, amount, currency } = response.data;

            // Step 2: Configure Razorpay options, including QR code option
            const options = {
                key: 'rzp_test_yEeTvW2DPaMXl2',
                amount: amount,
                currency: currency,
                name: 'RStore',
                description: 'Test Transaction',
                order_id: id,
                handler: async function (response) {
                    // Step 3: Handle payment success
                    const paymentId = response.razorpay_payment_id;
                    const orderId = response.razorpay_order_id;
                    const signature = response.razorpay_signature;

                    const verifyUrl = `${BASE_URL}/api/order/verify-payment`;
                    const config = {
                        headers: {
                            "Content-type": "application/json",
                            Authorization: `Bearer ${user.token}`,
                        },
                    };
                    console.log(personalDetails);
                    console.log(shippingAdress);
                    const { data } = await axios.post(verifyUrl, {
                        razorpay_order_id: orderId,
                        razorpay_payment_id: paymentId,
                        razorpay_signature: signature,
                        cart:cart,
                        name:personalDetails.firstName+" "+personalDetails.lastName,
                        phone:personalDetails.phone,
                        adress: shippingAdress.adressline+","+shippingAdress.state+","+shippingAdress.city+","+shippingAdress.pin,
                        date:currentDate
                    },config);

                    if (data.status === 'success') {
                        alert('Payment successful');
                        navigate('/myorder')
                    } else {
                        alert('Payment verification failed');
                    }
                },
                prefill: {
                    name: personalDetails.firstName+" "+personalDetails.lastName,
                    email: personalDetails.email,
                    contact: personalDetails.phone
                },
                notes: {
                    address: shippingAdress.adressline+","+shippingAdress.state+","+shippingAdress.city+","+shippingAdress.pin
                },
                theme: {
                    color: '#3399cc'
                },
                method: {
                    upi: true,
                    card: true,
                    netbanking: true,
                    wallet: true
                },
                modal: {
                    // Prevent automatic redirection after payment
                    ondismiss: function () {
                        alert('Payment window closed without completing the payment');
                    }
                },
                display: {
                    hide: {
                        method: ['card', 'netbanking', 'wallet']
                    }
                }
            };

            const razorpay = new window.Razorpay(options);

            // Show the QR code by default
            razorpay.open();
            e.preventDefault()
        } catch (error) {
            console.error("Payment initiation failed", error);
        }
    };

    return {handlePayment}
};

export default useOrder;
