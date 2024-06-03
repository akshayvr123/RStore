import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'
import SearchForm from '../Navbar/Search'
import useCartItems from '../../CustomHooks/useCart'

const Products = () => {
  const [products, setProducts] = useState([])
  const { name } = useParams()
  let user = JSON.parse(localStorage.getItem('user'))
  const [cart, setCart] = useCartItems("http://localhost:5000/api/cart", user.token)

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/product", {
        params: {
          categoryname: name
        }
      })
      setProducts(data.category.products)
    } catch (error) {
      alert(error)
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
      const { data } = await axios.post('http://localhost:5000/api/cart/add', {
        products: {
          category: name,
          name: prd.name,
          price: prd.price,
          quantity: prd.stock
        }
      }, config)
      console.table(data)
      setCart(data.products)
    } catch (error) {
      alert(error)
    }
  }

  const handleRemoveClick = async (prd) => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        data: {
          name: prd.name,
        }
      };
      console.log(config);
      const { data } = await axios.delete('http://localhost:5000/api/cart/remove', config);
      setCart(data.products);
    } catch (error) {
      alert(error);
    }
  };
  

  useEffect(() => {
    console.log(cart)
  }, [cart])

  return (
    <div>
      <Navbar />
      <SearchForm />
      <h1 className='scrollbar-hide text-3xl pl-[3rem] md:pl-[6rem] font-bold mt-8'>{name}</h1>
      <div className='flex flex-wrap justify-center sm:justify-start sm:ml-[6rem]'>
        {products.map((product) => {
          const isInCart = cart?.length > 0 && cart.some(crt => crt.name === product.name) 
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
