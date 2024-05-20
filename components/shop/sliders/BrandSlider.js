'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y , Autoplay ,EffectFlip} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay';
import 'swiper/css/effect-flip';

const BrandSlider=({children})=>{
    return(
        <>
   <Swiper
            className={'h-52 mx-1 ml-auto mr-auto container     p-5'}
            modules={[Pagination, Scrollbar, A11y, Autoplay]}

            style={{padding:'19px'}}

            autoplay={{
                delay: 2500,
                disableOnInteraction:  true,
            }}
            breakpoints={{
                 100: {
                    slidesPerView: 2,
                    spaceBetween: 10,
                },

                640: {
                    slidesPerView: 4,
                    spaceBetween: 10,
                },
                768: {
                    slidesPerView: 4,
                    spaceBetween: 10,
                },
                1024: {
                    slidesPerView: 6,
                    spaceBetween: 10,
                },
            }}

            pagination={{ clickable: true }}
            //   scrollbar={{ draggable: true }}
            
        >

            {children}

            
        </Swiper>
 

    </>)
  
   
}
export default BrandSlider;