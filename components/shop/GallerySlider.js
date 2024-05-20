'use client'
import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import Image from "next/image";


// import required modules
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import { useDispatch, useSelector } from 'react-redux';
import { setIsProductGalleryOpen } from '@/store/reducers/customer/ProductSlice';
 

const GallerySlider = () => {
  const { gallery, isProductGalleryOpen } = useSelector(state => state.productCustomer);
  const dispatch = useDispatch();
  console.log(isProductGalleryOpen);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  return (
    <>
    
      
    
      <Swiper
        style={{
          '--swiper-navigation-color': '#fff',
          '--swiper-pagination-color': '#fff',
        }}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
        modules={[FreeMode, Navigation, Thumbs]}
        className={`${isProductGalleryOpen ? 'pl-3 flex items-center  ' : ''}  w-3/4 xl:w-full lg:w-full md:w-2/4 rounded-lg`}
      >
        {gallery?.map((image, index) => (
          <SwiperSlide >
            <Image
             onClick={() =>dispatch(setIsProductGalleryOpen(!isProductGalleryOpen))}
              key={index}
              src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${image.image.indexArray.medium}`}
              alt="image"
              width={'100'}
              height={'100'}
              className='w-full h-full cursor-pointer'
              unoptimized={true} />
          </SwiperSlide>
        ))}




      </Swiper>
     
     
        
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={5}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="w-3/4 xl:w-full lg:w-full md:w-2/4 mt-2 rounded-lg"
        >
        {gallery?.map((image, index) => (
          <SwiperSlide>
            <Image key={index} src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${image.image.indexArray.medium}`} alt="image" width={'100'} height={'100'} unoptimized={true} />
          </SwiperSlide>
        ))}
      </Swiper>
      
        
    </>
  )
}
export default GallerySlider