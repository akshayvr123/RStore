import React, { useEffect, useState } from 'react'
import useCategoryNames from '../../CustomHooks/useCategoryNames';
import axios from 'axios';
import Edit from './Edit';

const SelectCategory = () => {
    const [categoryDetails,setCategoryDetails]=useState([])
    const [categoryName,setCategorName]=useState()
    const [categoryId,setCategorId]=useState()
    const [products,setProducts]=useState([])
    const [categoryNames] = useCategoryNames('http://localhost:5000/api/product/categorynames');
   
    useEffect(()=>{
        setCategoryDetails(categoryNames?.categoryNames);
    },[categoryNames])

    useEffect(()=>{
      fetchProducts()
    },[categoryName])


    const fetchProducts = async () => {
        if(!categoryName) return
        try {
          const { data } = await axios.get("http://localhost:5000/api/product", {
            params: {
              categoryname: categoryName
            }
          })
          setCategorId(data.category._id);
          setProducts(data.category.products)
        } catch (error) {
          alert(error)
        }
      }
   
    return (
        <div className='mt-5'>
           <form class="max-w-sm mx-auto">
                <select onChange={(e=>setCategorName(e.target.value))} id="countries" className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option selected>Choose a category</option>
                  {categoryDetails?.length>0 &&categoryDetails.map((item)=>{
                    return(
                        <option value={item.name}>{item.name}</option>
                    )
                  })}
                    
                </select>
            </form>
            <Edit product={products} categoryId={categoryId} categoryName={categoryName}/>
        </div>
    )
}

export default SelectCategory
