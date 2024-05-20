'use client'
import { faBagShopping, faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import { SwiperSlide } from 'swiper/react';
import Link from "next/link";
import slide2 from '../../public/image/1674233541_large.jpg';
const CartProduct = () => {


    return (

        <>
            {/* <section className="relative w-full h-full    hover:shadow-lg hover:shadow-gray-300">

<section className="h-full">
    {indexArray.map(([size, value]) => (
        product.image.currentImage === size && <Link href={`/market/product/${product.slug}`}>
            <Image width={500}
                height={300}
                className={'w-full cursor-pointer    object-cover h-full   rounded-lg hover:object-fill  '}
                key={size}
                src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${value}`}
                unoptimized={true}
                priority={true}
                quality={80}
                alt="image" />
        </Link>
    ))}
</section>

<section className='flex flex-row rounded-b-lg rounded-t-xl p-3 h-16  absolute bottom-0 left-0 right-0 bg-black bg-opacity-40'>
    <section className="w-1/4 justify-start">
        <section className=' rounded-lg  flex justify-center  items-center    w-10 h-10 bg-red-600 text-white text-center'>
            <p>10%</p>
        </section>
    </section>

    <section className='felx flex-row justify-end w-3/4'>
        <p className="text-white text-left"> {product.price} تومان</p>
           <p className='text-red-700 text-sm text-left line-through decoration-red-600'> 
            200000 تومان 
            </p>
    </section>

</section>


</section> */}



        </>
    )
}
export default CartProduct;