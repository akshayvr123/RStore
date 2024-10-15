import React, { useEffect, useState } from 'react';
import useCategoryNames from '../../CustomHooks/useCategoryNames';
import postImage from '../../CustomHooks/postImage';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {productAddsuccess} from '../ToastStatus/ToastStatus'

const Add = () => {
  let user = JSON.parse(localStorage.getItem('user'))
  const navigate=useNavigate()
  const [option, setOption] = useState()
  const BASE_URL=import.meta.env.VITE_BACKEND_BASE_URL
  const [categoryNames] = useCategoryNames(`${BASE_URL}/api/product/categorynames`);
  //for  category pic
  const [pics, setPics] = useState('')
  const [productPic, setProductPic] = useState('')
  const [image, error] = postImage(pics)
  const [images, errors] = postImage(productPic)
  const [categoryDetails, setCategoryDetails] = useState({
    name: '',
    description: "",
    images: images
  })
  const [productDetails, setProductDetails] = useState({
    name: '',
    description: '',
    price: null,
    stock: '',
    images: ''

  })

  useEffect(() => {

   setProductDetails({...productDetails,images:images})
   
  }, [images])
  useEffect(() => {

    setCategoryDetails({...categoryDetails,images:image})
    
   }, [image])

   const handleOptionChange=(e)=>{
    setOption(e.target.value)
    setCategoryDetails({...categoryDetails,name:e.target.value})
   }
   const handleSubmit=async(e)=>{
    e.preventDefault();
    if(!categoryDetails.name){
      alert("Please select a category")
      return
    }
    if(option=='new'){
      if(!categoryDetails.name || !categoryDetails.description || !categoryDetails.images){
        alert('Please Fill all the fields')
        return
      }
    }
    if(!productDetails.name || !productDetails.description ||!productDetails.images || !productDetails.price || !productDetails.stock){
      alert("please fill all product details")
      return
    }

    try {
      console.log('data uploading');

      const config = {
        headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${user.token}`,
        }
    };

      const {data}=await axios.post(`${BASE_URL}/api/product`,{
       
          name:categoryDetails.name,
          description:categoryDetails.description,
          imageUrl:categoryDetails.images,
          products:{
              name:productDetails.name,
              description:productDetails.description,
              price:productDetails.price,
              stock:productDetails.stock,
              image:productDetails.images
          
      }
      },config)
      
      if(data){
        productAddsuccess()
        navigate('/')
      }
    } catch (error) {
      alert(error)
    }
   }

   useEffect(()=>{
console.log(productDetails);
   },[productDetails])

  return (
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
                Add Product
              </h3>

            </div>
            {/* Modal body */}
            <form onSubmit={(e)=>handleSubmit(e)} action="">
              <div className="grid gap-4 mb-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="category"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Category
                  </label>
                  {!(option == 'new') && <select
                    onChange={(e)=>handleOptionChange(e)}
                    id="category"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  >
                    <option value="" selected disabled>
                      Select category
                    </option>
                    {categoryNames?.categoryNames.length > 0 && categoryNames.categoryNames.map((names) => <option  value={names.name}>{names.name}</option>)}
                    <option value="new" >  New category  </option>

                  </select>}
                  {option == 'new' && <input
                    onChange={(e) => setCategoryDetails({ ...categoryDetails, name: e.target.value })}
                    name='name'
                    type="text"
                    id="customCategory"
                    className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Enter new category"
                  />}
                </div>
                {option === 'new' && <div>
                  <label
                    htmlFor="brand"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Category description
                  </label>
                  <input
                    onChange={(e) => setCategoryDetails({ ...categoryDetails, description: e.target.value })}
                    type="text"
                    name="brand"
                    id="brand"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Category description"
                    required
                  />
                </div>}
                {option === 'new' && <div>
                  <label
                    htmlFor="image"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    category Image
                  </label>
                  <input
                    onChange={(e) => setPics(e.target.files[0])}
                    type="file"
                    name="image"
                    id="image"
                    accept="image/*"

                    className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                  />

                  {image && <img
                    src={image}
                    alt="Image Preview"
                    className="mt-2 w-full h-64 object-cover rounded-lg"
                  />}

                </div>}
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

                  {images && <img
                    src={images}
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
                    onChange={(e)=>setProductDetails({...productDetails,name:e.target.value})}
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
                    onChange={(e)=>setProductDetails({...productDetails,description:e.target.value})}
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
                    onChange={(e)=>setProductDetails({...productDetails,stock:e.target.value})}
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
                    onChange={(e)=>setProductDetails({...productDetails,price:e.target.value})}
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
                <svg
                  className="mr-1 -ml-1 w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                Add new product
              </button>
            </form>
          </div>
        </div>
      </div>
      {/* )} */}
    </div>
  );
};

export default Add;
