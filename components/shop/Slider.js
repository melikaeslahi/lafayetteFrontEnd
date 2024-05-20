'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y , Autoplay ,EffectFlip} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay';
import 'swiper/css/effect-flip';
 


const Slider = ({children}) =>{

return(<>
 
<Swiper
     className={'h-96    mx-auto xl:container '}
      modules={[Navigation,Pagination ,  Scrollbar, A11y , Autoplay ]}
      // effect={'flip'}
      spaceBetween={50}
      slidesPerView={1}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      navigation
      pagination={{ clickable: true }}
    //   scrollbar={{ draggable: true }}
      // onSwiper={(swiper) => console.log(swiper)}
      // onSlideChange={() => console.log('slide change')}
    >
      {children}
 
   
    </Swiper>
 

    </>)
}
export default Slider;