import './App.css'
import {
  BrowserRouter,
  Link,
  Route,
  Routes,
} from "react-router-dom";
import Home from './Pages/Home';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import Protected from './RouteContollers/Protected';
import Product from './Pages/Product';
import Cart from './Pages/Cart';
import AddProduct from './Pages/AddProduct';
import EditProduct from './Pages/EditProduct';
import AdminElement from './RouteContollers/AdminElement';
import Admin from './Pages/Admin';
import UserProvider from './Contexts/UserContext';
import MyOrder from './Pages/MyOrder';
import AllOrder from './Pages/AllOrder';
import Checkout from './Pages/Checkout';
import OrderProvider from './Contexts/orderContext';
import ViewOrders from './Pages/ViewOrders';
import EditOrders from './Pages/EditOrders';
import OrderIdProvider from './Contexts/OrderIdContext';


function App() {
  

  return (
    <>
    
      <BrowserRouter>
      <OrderIdProvider>
    <OrderProvider>
    <UserProvider>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Protected><Home /></Protected>} />
        <Route path="/product/:name" element={<Protected><Product /></Protected>} />
        <Route path="/cart" element={<Protected><Cart /></Protected>} />
        <Route path='/admin' element={<AdminElement><Admin/></AdminElement>}/>
        <Route path="/addproduct" element={<AdminElement><AddProduct/></AdminElement>} />
        <Route path="/editproduct" element={<AdminElement><EditProduct/></AdminElement>} />
        <Route path="/myorder" element={<Protected><MyOrder/></Protected>} />
        <Route path="/allorders" element={<AdminElement><AllOrder/></AdminElement>} />
        <Route path="/editorders" element={<AdminElement><EditOrders/></AdminElement>} />
        <Route path="/checkout" element={<Protected><Checkout /></Protected>} />
        <Route path="/vieworder" element={<Protected><ViewOrders /></Protected>} />
      </Routes>
    </UserProvider>
    </OrderProvider>
    </OrderIdProvider>
    </BrowserRouter>
    </>
    
  )
}

export default App
