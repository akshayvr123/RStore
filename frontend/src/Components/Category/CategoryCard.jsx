import React, { useEffect, useState } from 'react';
import './Category.css';
import useCategoryNames from '../../CustomHooks/useCategoryNames';
import { useNavigate } from 'react-router-dom';

const CategoryCard = () => {
  const [category,setCategoryDetails]=useState([])
  const [categoryNames] = useCategoryNames('http://localhost:5000/api/product/categorynames');
  const navigate=useNavigate()
  useEffect(()=>{
    setCategoryDetails(categoryNames?.categoryNames);
  },[categoryNames])

  const handleClick=(cat)=>{
    console.log(cat);
    navigate(`/product/${cat.name}`)
  }

  return (
    <div className='catagory-container'>
      <h2 className='scrollbar-hide text-3xl pt-7 pl-[3rem] md:pl-[6rem] font-bold'>Category</h2>
      <div className='item-container'>

        {category?.map((cat,index) => {
          return (
            <div onClick={()=>handleClick(cat)} key={index} className='item'>
              <img className='w-full h-[210px] rounded-b-sm' src={cat.imageUrl} alt='' />
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
