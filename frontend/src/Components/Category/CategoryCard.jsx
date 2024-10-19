import React, { useEffect, useState } from 'react';
import './Category.css';
import useCategoryNames from '../../CustomHooks/useCategoryNames';
import { useNavigate } from 'react-router-dom';

const CategoryCard = () => {
  const [category,setCategoryDetails]=useState([])
  const BASE_URL=import.meta.env.VITE_BACKEND_BASE_URL
  const [categoryNames] = useCategoryNames(`${BASE_URL}/api/product/categorynames`);
  const navigate=useNavigate()
  useEffect(()=>{
    setCategoryDetails(categoryNames?.categoryNames);
  },[categoryNames])

  const handleClick=(cat)=>{
    console.log(cat);
    navigate(`/product/${cat.name}`)
  }

  return (
    <div className='catagory-container '>
      <h2 className='scrollbar-hide text-3xl pt-7 pl-[2rem] sm:pl-[3rem] md:pl-[7rem] font-bold'>Category</h2>
      <div className='item-container '>

        {category?.map((cat,index) => {
          return (
            <div onClick={()=>handleClick(cat)} key={index} className='item w-80 sm:w-[428px] '>
              <img className=' w-full h-[210px] rounded-b-sm' src={cat.imageUrl} alt='' />
              <div className='content'>
                <p className='normal-txt pl-[.60rem]'>{cat.name}</p>
                <p className='small-txt'>{cat.description}</p>
              </div>
            </div>
          )
        })}

      </div>
    </div>
  );
}

export default CategoryCard;
