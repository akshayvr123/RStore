import React, { useEffect, useState } from 'react'

const Corousal = () => {
const images =["https://www.bigbasket.com/media/uploads/banner_images/bb1548_b2c_l1_emf_c_mutton_1200x300_22-04-2024_all.jpg?tr=w-1920,q=80","https://www.bigbasket.com/media/uploads/banner_images/bb1548_b2c_l1_emf_c_fish_1200x300_22-04-2024_all.jpg?tr=w-1920,q=80","https://www.bigbasket.com/media/uploads/banner_images/bb1548_b2c_l1_emf_c_chicken_1200x300_22-04-2024_all.jpg?tr=w-1920,q=80"]
    const [source, setSource] = useState(0)
  const handleNext = () => {
    source === images.length - 1 ? setSource(0) : setSource(source + 1)
  }
  const handleBack = () => {
    source === 0 ? setSource(images.length - 1) : setSource(source - 1)
  }
  useEffect(() => {
    const timer = setInterval(() => {
      source === images.length - 1 ? setSource(0) : setSource(source + 1)
    }, 5000)
    return () => {
      clearInterval(timer)
    }
  }, [source])
  return (
<div className='corousal-container'>
  <h1 className='text-3xl pt-7 pl-[2rem] sm:pl-[3rem] md:pl-[7rem] font-bold'>Popular Choice</h1>
  <div className='flex flex-col items-center justify-center pt-10 h-64 sm:h-96 relative pl-5 md:pl-12 '>
    <div className='relative w-11/12 h-full border-2 rounded-lg  '>
      <img className='w-full h-full rounded-lg bg-white' src={images[source]} alt="" />
      <div onClick={handleBack} className='absolute left-0 top-1/2 transform -translate-y-1/2 pl-5 cursor-pointer group'>
        <div className='flex items-center opacity-50 justify-center w-10 h-10 bg-gray-800 rounded-full group-hover:bg-gray-600 transition duration-300'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 text-white">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </div>
      </div>
      <div onClick={handleNext} className='absolute right-0 top-1/2 transform -translate-y-1/2 pr-5 cursor-pointer group'>
        <div className='flex items-center opacity-50 justify-center w-10 h-10 bg-gray-800 rounded-full group-hover:bg-gray-600 transition duration-300'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 text-white">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </div>
  </div>
</div>

  
  

  )
}

export default Corousal
