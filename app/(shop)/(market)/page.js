'use client';
import Slider from "@/components/shop/Slider";
import Image from "next/image";
import Banner from "../../../components/shop/Banner";
import CartBlog from "@/components/shop/CartBlog";
import TabContainer from "@/components/shop/tab/TabContainer";
import TabItems from "@/components/shop/tab/TabItems";
import TabContent from "@/components/shop/tab/TabContent";
import ProductSlider from "@/components/shop/ProductSlider";
import { SwiperSlide } from "swiper/react";
import { useGetHomeDataQuery } from "@/services/customer/homeApi";
import Link from "next/link";
import CartProduct from "@/components/shop/CartProduct";
import { useEffect, useState } from "react";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { setProduct } from "@/store/reducers/customer/ProductSlice";
import { convertEnglishToPersian, priceFormatter } from "@/helper/helper";
import { Button } from "@/components/dashboard/inputs";
import BrandSlider from "@/components/shop/sliders/BrandSlider";



const Home = () => {
    const dispatch = useDispatch();
    const { data: data = [], isSuccess } = useGetHomeDataQuery();
    console.log(data);
    const { user: userSelector } = useSelector(state => state.auth);
    const [ActiveSlider, setActiveSlider] = useState();
    const [ActiveChildSlider, setActiveChildSlider] = useState();
    const sliderBetweenRound = Math.ceil(data?.sliders?.length / 2);
     console.log(sliderBetweenRound);

    const { user } = useAuth();

    useEffect(() => {
        user();
    }, []);



    const handlerSliderPage = (sliderId, childrenId) => {
        setActiveSlider(sliderId)
        setActiveChildSlider(childrenId);
    }


    return (

        <>
            {isSuccess && (<>
                <Slider className={'mt-3'}>
                    {data.bannerSlideShow?.map((slide, index) => {

                        return (

                            <SwiperSlide key={index} className={'w-full h-full flex justify-center'}>
                                <Link href={slide.url}>

                                    <Image layout="fill" // required
                                        objectFit="cover" // change to suit your needs
                                        priority={true} src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${slide.image}`} unoptimized={true} alt="image" />


                                </Link>
                            </SwiperSlide>
                        )
                    }


                    )}
                </Slider>

                <section className="flex flex-col lg:flex-row xl:flex-row md:flex-col justify-around items-center p-2 ml-auto mr-auto container mt-auto before:content-[]">

                    {data.collections?.map((collection, index) => {

                        return (
                            <Banner key={index} basis={''}>
                                <Link href={collection.url}>
                                    <Image width={500} height={300} className={'w-full h-full rounded-lg'} src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${collection.image}`} unoptimized={true} alt="image" />
                                </Link>
                            </Banner>
                        )
                    })}

                </section>

                {data.sliders.map((slider, index) => {

                    return (<>
                        <TabContainer   key={slider.id}   >


                            <TabItems title={slider.name}>
                                {slider.children.map((child, index) => {
                                    return (
                                        <li key={child.id} className="mr-2" role="presentation">
                                            <button className={`${ActiveSlider === slider.id && ActiveChildSlider === child.id ? 'p-4 marker:rounded-t-lg text-pallete' : ' p-4   rounded-t-lg hover:text-pallete  dark:hover:text-pallete'} `} onClick={() => handlerSliderPage(slider.id, child.id)} id={`${child.name}-tab`} data-tabs-target={`#${child.name}`} type="button" role="tab" aria-controls="profile" aria-selected="false">  {child.name} </button>
                                        </li>
                                    )
                                })}




                            </TabItems>
                            {ActiveSlider === slider.id ? <TabContent >

                                {slider.children.map((child, index) => (

                                    <div key={child.id} className={`${ActiveChildSlider === child.id ? 'p-4 rounded-lg bg-gray-50 dark:bg-gray-800' : 'hidden '} `} id={child.name} role="tabpanel" aria-labelledby={`${child.name}-tab`}>
                                        <ProductSlider >
                                            {child.products.map((product, index) => {
                                                const indexArray = Object.entries(product.image.indexArray);
                                                return (
                                                    <section key={product.id} className=" relative flex flex-col shadow-md justify-start items-center">

                                                        <SwiperSlide className=' h-full shadow-gray-300 shadow-lg rounded-lg   ' >
                                                            <CartProduct name={product.name} price={product.price} slug={product.slug}  >
                                                                <section className="relative w-full h-full hover:shadow-lg hover:shadow-gray-300">

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
                                                                            {
                                                                                product?.amazingSales ?
                                                                                    <section className=' rounded-lg  flex justify-center  items-center    w-10 h-10 bg-red-600 text-white text-center'>
                                                                                        <p>{convertEnglishToPersian(product?.amazingSales.percentage)}%</p>
                                                                                    </section>

                                                                                    : null
                                                                            }
                                                                        </section>

                                                                        <section className='felx flex-row justify-end w-3/4'>
                                                                            <p className="text-white text-left text-sm"> {product?.amazingSales ? priceFormatter(product.price - (product?.price * (product?.amazingSales?.percentage / 100))) : priceFormatter(product?.price)} تومان</p>
                                                                            {product?.amazingSales ? <p className='text-red-700 text-sm text-left line-through decoration-red-600'>
                                                                                {priceFormatter(product.price)} تومان
                                                                            </p> : null}
                                                                        </section>

                                                                    </section>


                                                                </section>
                                                            </CartProduct>
                                                        </SwiperSlide>


                                                    </section>
                                                )
                                            })}
                                            <SwiperSlide>
                                                <section className="flex justify-center items-center relative w-full h-full shadow-lg shadow-gray-300">
                                                    <section>
                                                        <h1>
                                                            <Button
                                                                className={'text-red-600'}
                                                                onClick={() => setCategoryName()}>
                                                                موارد بیشتر
                                                            </Button>
                                                        </h1>
                                                    </section>
                                                </section>
                                            </SwiperSlide>
                                        </ProductSlider>
                                    </div>

                                ))

                                }



                            </TabContent> :
                                <TabContent >
                                    <div key={index} className={` p-4 rounded-lg bg-gray-50 dark:bg-gray-800   '} `}   >
                                        <ProductSlider>

                                            {slider.products.map((product, index) => {
                                                const indexArray = Object.entries(product.image.indexArray);

                                                return (
                                                    <section key={index} className=" relative flex flex-col shadow-md justify-start items-center">

                                                        <SwiperSlide className='h-full  shadow-gray-300 shadow-lg rounded-lg   ' >
                                                            <section className="relative w-full h-full    hover:shadow-lg hover:shadow-gray-300">

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
                                                                        {
                                                                            product?.amazingSales ?
                                                                                <section className=' rounded-lg  flex justify-center  items-center    w-10 h-10 bg-red-600 text-white text-center'>
                                                                                    <p>{convertEnglishToPersian(product?.amazingSales.percentage)}%</p>
                                                                                </section>

                                                                                : null
                                                                        }
                                                                    </section>

                                                                    <section className='felx flex-row justify-end w-3/4'>
                                                                        <p className="text-white text-left text-sm"> {product?.amazingSales ? priceFormatter(product.price - (product?.price * (product?.amazingSales?.percentage / 100))) : priceFormatter(product?.price)} تومان</p>
                                                                        {product?.amazingSales ? <p className='text-red-700 text-sm text-left line-through decoration-red-600'>
                                                                            {priceFormatter(product.price)} تومان
                                                                        </p> : null}
                                                                    </section>

                                                                </section>


                                                            </section>



                                                        </SwiperSlide>

                                                    </section>
                                                )
                                            })}
                                            <SwiperSlide>
                                                <section className="flex justify-center items-center relative w-full h-full shadow-lg shadow-gray-300">
                                                    <section>
                                                        <h1>
                                                            <Button
                                                                className={'text-red-600'}
                                                                onClick={() => setCategoryName()}>
                                                                موارد بیشتر
                                                            </Button>
                                                        </h1>
                                                    </section>
                                                </section>
                                            </SwiperSlide>
                                        </ProductSlider>
                                    </div>
                                </TabContent>

                            }
                         { sliderBetweenRound === index + 1 ?
                            <section className={`flex  flex-col lg:flex-row xl:flex-row md:flex-col justify-around items-center p-2 ml-auto mr-auto container mt-auto`}>

                                {data.middleBanner?.map((banner, index) => {

                                    return (
                                        <Banner key={index} basis={''}>
                                            <Link href={banner.url}>
                                                <Image width={500} height={300} className={'w-full h-full rounded-lg'} src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${banner.image}`} unoptimized={true} alt="image" />
                                            </Link>
                                        </Banner>
                                    )
                                })}

                            </section> : null}
                        </TabContainer>
                    </>)
                })}



                <section>

                    {data.bottomBanner?.map((banner, index) => {
                        return (
                            <Banner key={index} basis={''}>
                                <Link href={banner.url}>

                                    <Image width={500} height={300} className={'w-full h-full rounded-lg'} src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${banner.image}`} unoptimized={true} alt="image" />


                                </Link>
                            </Banner>
                        )
                    })}
                </section>


                <CartBlog >
                    {data.newBlogs.map((blog, index) => {
                        const indexArray = Object.entries(blog.image.indexArray);
                        return (
                            <section key={index} className="flex flex-col hover:shadow-gray-300 hover:border-gray-400 hover:shadow-lg   w-3/4 justify-center items-center  rounded-lg m-5">
                                <section className="flex justify-center items-center">
                                    <Link href={'blog.url'}>
                                        {indexArray.map(([size, value]) => (
                                            blog.image.currentImage === size && <Image className={'w-full h-full rounded-lg'} width={500} height={300} key={size} src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${value}`} unoptimized={true} alt={blog.slug} />
                                        ))}

                                    </Link>

                                </section>

                                <section className="flex flex-col  w-full justify-center  ">
                                    <h1 className="text-pallete cursor-pointer text-sm p-3">  {blog.title}     </h1>
                                    <p className="text-sm text-justify p-3 mb-2">
                                        {blog.summary}
                                    </p>

                                </section>
                            </section>
                        )
                    })}

                </CartBlog>
                <section className="mt-10">



                    <TabContainer>
                        <TabItems title={'برندهای معروف'} />
                        <TabContent>
                            <BrandSlider>

                                {data.brands.map((brand, index) => {

                                    const indexArray = brand.logo ? Object.entries(brand.logo?.indexArray) : null;
                                    return (
                                        <section key={index} className="  flex flex-col shadow-md justify-start items-center">

                                            <SwiperSlide className='h-full  shadow-gray-300 shadow-lg rounded-lg   ' >
                                                <section className="relative w-full h-full    hover:shadow-lg hover:shadow-gray-300">

                                                    <section className="h-full">
                                                        {indexArray?.map(([size, value]) => (
                                                            brand.logo.currentImage === size && <Link href={`/market/product/${brand.slug}`}>
                                                                <Image width={500}
                                                                    height={300}
                                                                    className={'w-full cursor-pointer    object-cover h-full   rounded-lg hover:object-fill  '}
                                                                    key={size}
                                                                    src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${value}`}
                                                                    unoptimized={true}
                                                                    priority={true}
                                                                    quality={80}
                                                                    alt={brand.persian_name} />
                                                            </Link>
                                                        ))}

                                                    </section>
                                                </section>
                                            </SwiperSlide>
                                        </section>
                                    )
                                })}
                            </BrandSlider>
                        </TabContent>
                    </TabContainer>

                </section>
            </>)}


        </>
    )
}
export default Home;