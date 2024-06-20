import React, { useEffect } from 'react';
import axios from 'axios';

const useOrder = (cart,total) => {
   
    let user = JSON.parse(localStorage.getItem('user'))
    const handlePayment = async () => {
        try {
            // Step 1: Create an order on your backend
            const orderUrl = 'http://localhost:5000/api/order/create-order';
            const response = await axios.post(orderUrl, {
                amount: (total+49 )*100, // Amount in smallest currency unit (e.g., paise for INR)
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

                    const verifyUrl = 'http://localhost:5000/api/order/verify-payment';
                    const config = {
                        headers: {
                            "Content-type": "application/json",
                            Authorization: `Bearer ${user.token}`,
                        },
                    };
                    const { data } = await axios.post(verifyUrl, {
                        razorpay_order_id: orderId,
                        razorpay_payment_id: paymentId,
                        razorpay_signature: signature,
                        cart:cart
                    },config);

                    if (data.status === 'success') {
                        alert('Payment successful');
                    } else {
                        alert('Payment verification failed');
                    }
                },
                prefill: {
                    name: user.name,
                    email: user.email,
                    contact: '9999999999'
                },
                notes: {
                    address: 'Customer Address'
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
