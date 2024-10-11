import axios from 'axios';
import React, { useEffect, useState } from 'react'
import EditForm from './EditForm';

const Edit = ({ product,categoryId ,categoryName}) => {
    let user = JSON.parse(localStorage.getItem('user'))
    const [products,setProducts]=useState([])
    const [formData,setFormdata]=useState()
    const BASE_URL=import.meta.env.VITE_BACKEND_BASE_URL
    useEffect(()=>{
        setProducts(product)
    },[product])

  

    const handleDelete=async(item)=>{

        try {
            const config = {
                headers: {
                  "Content-type": "application/json",
                  Authorization: `Bearer ${user.token}`,
                },
                data:{
                    categoryId:categoryId,
                    productId:item._id
                }
                
              }
            const {data}=await axios.delete(`${BASE_URL}/api/product/delete`,config)
            setProducts(data.category.products);
        } catch (error) {
            console.log(error);
        }
    }

    const handleEdit=(item)=>{
        
        if(formData?.name===item.name){
            setFormdata()
        }else{

            setFormdata(item)
        }
    }
    return (
        <div>

            <h1 className='scrollbar-hide text-3xl pl-[3rem] md:pl-[6rem] font-bold mt-8'>Edit Product</h1>
          
            <div className='flex flex-wrap justify-center sm:justify-start sm:ml-[6rem]'>
                {
                    products?.map((item) => {
                        let isFormOpen=item.name===formData?.name
                        return (
                            <div className='product-container w-[268px] h-[423px] border-2 rounded-lg border-gray-400 m-4'>
                                <div className='relative'>
                                    <div className='absolute top-0 left-0 ml-2 bg-green-600 text-white px-2 py-1 text-sm rounded'>15% OFF</div>
                                    <div onClick={()=>handleEdit(item)} className=' bg-red-500 cursor-pointer '>
                                        <p className=' font-semibold absolute w-8 top-0 right-0 mr-8  text-black px-2 py-1 text-sm rounded'>{isFormOpen ?'hide':'edit'}</p>
                                        <svg className=' absolute w-8 top-0 right-0 mr-2 h-5 mt-1  text-black px-2 py-1 text-sm rounded' xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 26 26">
                                            <path d="M 20.09375 0.25 C 19.5 0.246094 18.917969 0.457031 18.46875 0.90625 L 17.46875 1.9375 L 24.0625 8.5625 L 25.0625 7.53125 C 25.964844 6.628906 25.972656 5.164063 25.0625 4.25 L 21.75 0.9375 C 21.292969 0.480469 20.6875 0.253906 20.09375 0.25 Z M 16.34375 2.84375 L 14.78125 4.34375 L 21.65625 11.21875 L 23.25 9.75 Z M 13.78125 5.4375 L 2.96875 16.15625 C 2.71875 16.285156 2.539063 16.511719 2.46875 16.78125 L 0.15625 24.625 C 0.0507813 24.96875 0.144531 25.347656 0.398438 25.601563 C 0.652344 25.855469 1.03125 25.949219 1.375 25.84375 L 9.21875 23.53125 C 9.582031 23.476563 9.882813 23.222656 10 22.875 L 20.65625 12.3125 L 19.1875 10.84375 L 8.25 21.8125 L 3.84375 23.09375 L 2.90625 22.15625 L 4.25 17.5625 L 15.09375 6.75 Z M 16.15625 7.84375 L 5.1875 18.84375 L 6.78125 19.1875 L 7 20.65625 L 18 9.6875 Z"></path>
                                        </svg>
                                    </div>
                                    <img className='w-full h-[224px]' src={item.images} />
                                </div>
                                <h1 className='text-lg font-semibold ml-4 mt-2'>{item.name}</h1>
                                <h1 className='scrollbar-hide text-lg font-semibold opacity-55 ml-4'>{item.description}</h1>
                                <h1 className='scrollbar-hide text-lg font-semibold opacity-55 ml-4'>{item.quantity}</h1>
                                <h1 className='scrollbar-hide text-lg font-semibold ml-4 flex'>Rs: {item.price}
                                    <span className='opacity-55 ml-5'><s>MRP:{item.price+25}</s></span>
                                </h1>
                                <div className='flex items-center justify-center mt-2'>
                                    <button onClick={()=>handleDelete(item)}

                                        className={`w-[220px] h-[40px] border-1 border-red-300 font-semibold  'text-red-600 hover:bg-red-600 hover:text-white text-red-600  hover:text-white' rounded-xl`}
                                    >
                                        Delete
                                    </button>
                                </div>
                               
                            </div>
                            
                        )
                    })}

            </div>
            { formData && <EditForm formData={formData} categoryName={categoryName}/> }
        </div>
    )
}

export default Edit
