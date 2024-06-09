import React from 'react'
import { useNavigate } from 'react-router-dom'


const AdminPanel = () => {
    const navigate=useNavigate()
  return (
    <div>
      <div className='container flex flex-col justify-center items-center w-full'>
         <h1 className='text-3xl font-bold text-center mt-24 scrollbar-hide'>Welcome Admin</h1>
         <div className='flex '>
         <div onClick={()=>navigate('/editproduct')} className='edit_product w-52 h-24 bg-green-500 border-2 ml-5 mt-10 rounded-xl hover:bg-red-500 hover:text-white hover:transition duration-500 scrollbar-hide'>
            <h1 className='text-center text-3xl font-bold mt-4 scrollbar-hide'>edit product</h1>
         </div>
         <div onClick={()=>navigate('/addproduct')} className='edit_product w-52 h-24 bg-green-500 border-2 ml-5 mt-10 rounded-xl hover:bg-red-500 hover:text-white hover:transition duration-500 scrollbar-hide'>
            <h1 className='text-center text-3xl font-bold mt-4 scrollbar-hide'>Add product</h1>
         </div>
         </div>
      </div>
    </div>
  )
}

export default AdminPanel
