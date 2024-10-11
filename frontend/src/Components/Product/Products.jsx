import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'
import SearchForm from '../Navbar/Search'
import useCartItems from '../../CustomHooks/useCart'
import { useSelector, useDispatch } from 'react-redux'
import { addtocart,removefromcart } from '../../Slices/cartSlice'
import useRemoveItem from '../../CustomHooks/useRemoveCart'
import {success,error} from '../ToastStatus/ToastStatus'

const Products = () => {
  const carts = useSelector((state) => state?.cart)
  const dispatch = useDispatch()
  const [products, setProducts] = useState([])
  const { name } = useParams()
  let user = JSON.parse(localStorage.getItem('user'))
  const BASE_URL=import.meta.env.VITE_BACKEND_BASE_URL
  const [cart] = useCartItems(`${BASE_URL}/api/cart`, user.token)
  const [newcart,remove]=useRemoveItem(`${BASE_URL}/api/cart/remove`,user.token)


  useEffect(()=>{
  console.log("Base url is "+BASE_URL);
  
  dispatch(addtocart(cart))
  },[cart]) 

  useEffect(()=>{

 dispatch(removefromcart(newcart))
  },[newcart])
  const fetchProducts = async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/api/product`, {
        params: {
          categoryname: name
        }
      })
      setProducts(data.category.products)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [name])

  const handleAddClick = async (prd) => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      }
      const { data } = await axios.post(`${BASE_URL}/api/cart/add`, {
        products: {
          category: name,
          name: prd.name,
          price: prd.price,
          quantity: prd.stock,
          image:prd.images
        }
      }, config)
      success("Added To Cart Successfully")
      dispatch(addtocart(data.products))
    } catch (error) {
      alert(error)
    }
  }

  const handleRemoveClick=(prd)=>{
    remove(prd)
    error("Removed From Cart")
  }
  
  return (
    <div>
      <Navbar />
      <SearchForm />
      <h1 className='scrollbar-hide text-3xl pl-[3rem] md:pl-[6rem] font-bold mt-8'>{name}</h1>
      <div className='flex flex-wrap justify-center sm:justify-start sm:ml-[6rem]'>
        {products?.map((product) => {
          const isInCart = carts?.length > 0 && carts.some(crt => crt.name === product.name) 
          return (
            <div key={product.id} className='product-container w-[268px] h-[423px] border-2 rounded-lg border-gray-400 m-4'>
              <div className='relative'>
                <div className='absolute top-0 left-0 ml-2 bg-green-600 text-white px-2 py-1 text-sm rounded'>15% OFF</div>
                <img className='w-full h-[224px]' src={product.images} alt={product.name} />
              </div>
              <h1 className='text-lg font-semibold ml-4 mt-2'>{product.name}</h1>
              <h1 className='scrollbar-hide text-lg font-semibold opacity-55 ml-4'>{product.description}</h1>
              <h1 className='scrollbar-hide text-lg font-semibold opacity-55 ml-4'>{product.stock}</h1>
              <h1 className='scrollbar-hide text-lg font-semibold ml-4 flex'>Rs: {product.price}
                <span className='opacity-55 ml-5'><s>MRP: {product.price + 20}</s></span>
              </h1>
              <div className='flex items-center justify-center mt-2'>
                <button
                  onClick={() => isInCart ? handleRemoveClick(product) : handleAddClick(product)}
                  className={`w-[220px] h-[40px] border-1 border-red-300 font-semibold ${isInCart ? 'text-red-600 hover:bg-red-600 hover:text-white' : 'text-green-600 hover:bg-green-600 hover:text-white'
                    } rounded-xl`}
                >
                  {isInCart ? 'Remove from Cart' : 'Add To Cart'}
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Products
