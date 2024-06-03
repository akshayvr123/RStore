import React from 'react';
import { CCarousel, CCarouselItem, CImage } from '@coreui/react';
import '@coreui/coreui/dist/css/coreui.min.css'; // Ensure CoreUI CSS is imported


const Popular = () => {
  const images = ["https://www.bigbasket.com/media/uploads/banner_images/B2C051810583-19879-1june24.jpg?tr=w-1920,q=80", "https://www.bigbasket.com/media/uploads/banner_images/bb1548_b2c_l1_emf_c_egg_1200x300_22-04-2024_all-1.jpg?tr=w-1920,q=80", "https://www.bigbasket.com/media/uploads/banner_images/ZXPL8246-l1-fom-c-Fresho-Organic-ghee-1200x300-25-mar-24.jpg?tr=w-1920,q=80"]
 
  return (
    <div className='pt-4 '>
        <h2 className='scrollbar-hide text-3xl  pl-[3rem] md:pl-[6rem] font-bold'>Deals Of the Day</h2>
      <div className='flex justify-center items-center mt-10 '>
        <CCarousel controls indicators className='w-11/12 pl-5 md:pl-12  rounded-lg '>
          <CCarouselItem className='h-52 sm:h-72 md:h-96'>
            <CImage className="d-block w-full h-full rounded-lg" src={images[0]} alt="slide 1" />
          </CCarouselItem>
          <CCarouselItem className='h-52 sm:h-72 md:h-96'>
            <CImage className="d-block w-full h-full rounded-lg" src={images[1]} alt="slide 2" />
          </CCarouselItem>
          <CCarouselItem className='h-52 sm:h-72 md:h-96'>
            <CImage className="d-block w-full h-full rounded-lg" src={images[2]} alt="slide 3" />
          </CCarouselItem>
        </CCarousel>
      </div>
    </div>
  );
};

export default Popular;
