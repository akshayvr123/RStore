import React, { useEffect, useState } from 'react'
import usePostImage from '../../CustomHooks/postImage'
import axios from 'axios'

const EditForm = ({formData,categoryName}) => {
   
    const [productpic,setProductPic]=useState()
    let user = JSON.parse(localStorage.getItem('user'))
    const BASE_URL=import.meta.env.VITE_BACKEND_BASE_URL
    const [productDetails, setProductDetails] = useState({
        id:formData._id,
        name: formData.name,
        description: formData.description,
        price: formData.price,
        stock: formData.stock,
        images: formData.images
    
      })
      const [images, errors] = usePostImage(productpic)

      useEffect(()=>{
       setProductDetails({
        id:formData._id,
        name: formData.name,
        description: formData.description,
        price: formData.price,
        stock: formData.stock,
        images: formData.images
       })
      },[formData])

      useEffect(()=>{
console.log(productDetails);
      },[productDetails])

      const handleSubmit=async(e)=>{
        console.log(productDetails);
       e.preventDefault()
        try {
            const config = {
                headers: {
                  "Content-type": "application/json",
                  Authorization: `Bearer ${user.token}`,
                },
                
              }
            const {data}=await axios.put(`${BASE_URL}/api/product/edit`,{
                
                    categoryname:categoryName,
                    products:{
                        id:productDetails.id,
                        name:productDetails.name,
                        description:productDetails.description,
                        price:productDetails.price,
                        stock:productDetails.stock,
                        image:productDetails.images
                }
            },config)
            alert("Product Edited successfully refresh the page to see the changes")
        } catch (error) {
            console.log(error);
        }
      }
      useEffect(()=>{
       images && setProductDetails({...productDetails,images:images})
      },[images])
    
    return (
        <div className=''>
            <div>

                <div
                    id="defaultModal"
                    tabIndex="-1"
                    aria-hidden="true"
                    className=" top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-modal md:h-full md:inset-0 overflow-y-auto overflow-x-hidden"
                >
                    <div className="relative p-4 w-full max-w-2xl h-full md:h-auto">
                        {/* Modal content */}
                        <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
                            {/* Modal header */}
                            <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    Edit Product
                                </h3>

                            </div>
                            {/* Modal body */}
                            <form onSubmit={(e)=>handleSubmit(e)}   action="">
                                <div className="grid gap-4 mb-4 sm:grid-cols-2">
                                
                                   
                                    <div>
                                        <label
                                            htmlFor="image"
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        >
                                            product Image
                                        </label>
                                        <input
                                            onChange={(e) => setProductPic(e.target.files[0])}
                                            type="file"
                                            name="image"
                                            id="image"
                                            accept="image/*"

                                            className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                        />

                                        {productDetails.images && <img
                            
                                            src={productDetails.images}
                                            alt="Image Preview"
                                            className="mt-2 w-full h-64 object-cover rounded-lg"
                                        />}

                                    </div>
                                    <div>
                                        <label
                                            htmlFor="brand"
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        >
                                            Product Name
                                        </label>
                                        <input
                                            onChange={(e) => setProductDetails({ ...productDetails, name: e.target.value })}
                                            value={productDetails.name}
                                            type="text"
                                            name="brand"
                                            id="brand"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                            placeholder="Product brand"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="brand"
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        >
                                            Product description
                                        </label>
                                        <input
                                            onChange={(e) => setProductDetails({ ...productDetails, description: e.target.value })}
                                            value={productDetails.description}
                                            type="text"
                                            name="brand"
                                            id="brand"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                            placeholder="Product brand"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="category"
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        >
                                            Quantity
                                        </label>

                                        <input
                                            onChange={(e) => setProductDetails({ ...productDetails, stock: e.target.value })}
                                            value={productDetails.stock}
                                            type="text"
                                            name="quantity"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                            placeholder="$2999"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="price"
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        >
                                            Price
                                        </label>
                                        <input
                                            onChange={(e) => setProductDetails({ ...productDetails, price: e.target.value })}
                                            value={productDetails.price}
                                            type="number"
                                            name="price"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                            placeholder="$2999"
                                            required
                                        />
                                    </div>

                                </div>
                                <button
                              
                                    type="submit"
                                    className="text-white inline-flex items-center bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                > 
                                    Edit product
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default EditForm
