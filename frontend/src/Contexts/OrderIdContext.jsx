import { createContext,useState } from "react";

export const OrderIdContext = createContext()

function OrderIdProvider({children}){
    const [orderId, setOrderId] = useState();
    return(
        <OrderIdContext.Provider value={{orderId,setOrderId}}>
            {children}
        </OrderIdContext.Provider>
    )
}

export default OrderIdProvider   