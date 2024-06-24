import React, { useEffect, useState } from 'react'

const useCurrentDate = () => {
    const [currentDate,setCurrentDate]=useState()
   
    useEffect(()=>{
        const date=new Date()
        const month=["january","february","March","April","May","June","july","August","September","October","November","December"]
        const currentMonth=date.getMonth()
        const currentdate=date.getDate()+"th"+" "+month[currentMonth]+ " "+date.getFullYear()
        setCurrentDate(currentdate)
    },[])
    
  return {currentDate}
    
}

export default useCurrentDate
