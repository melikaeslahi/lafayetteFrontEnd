'use client';
import { Button } from "@/components/dashboard/inputs";
import CartProduct from "@/components/shop/CartProduct";
import Comment from "@/components/shop/Comment";
import InfoProductContainer from "@/components/shop/pages/market/InfoProductContainer";
import ProductContainer from "@/components/shop/pages/market/ProductContainer";
import ProductContent from "@/components/shop/pages/market/ProductContent";
import StarProductRating from "@/components/shop/pages/market/StarProductRating";
import ProductSlider from "@/components/shop/ProductSlider";
import TabContainer from "@/components/shop/tab/TabContainer";
import TabContent from "@/components/shop/tab/TabContent";
import TabItems from "@/components/shop/tab/TabItems";
import { priceFormatter } from "@/helper/helper";
import { useAddToFavoriteMutation, useGetProductMutation } from "@/lib/customer/market/productApi";
import { setCalculatePrice, setComments, setGallery, setIsFavorite, setNumber, setOriginalProductPrice, setProductDiscountPrice, setSelectedColorPrice, setSlug } from "@/store/reducers/customer/ProductSlice";
import { setIsError, setIsLoading, setIsSuccess, setItemLength } from "@/store/reducers/dashboard/UtilSlice";
import { faHeart, faStoreAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { SwiperSlide } from "swiper/react";


const Product = ({ params }) => {
    const dispatch = useDispatch();
    const [color, setColor] = useState();
    const [ counter, setCounter] = useState(1);
    const [  selectedColorPrice, setSelectColorPrice] = useState(0);



    const [show, setShow] = useState(1);
    const { user } = useSelector(state => state.auth);
    const { isLoading: loading, isSuccess: success, isError: error, length } = useSelector(state => state.util);
    const [getProduct, { data, isLoading, isSuccess, isError }] = useGetProductMutation();
    const [favorite, { data: favoriteData }] = useAddToFavoriteMutation();
    const [btnFavorite, setBtnFavorite] = useState(data?.isFavorite ? 'حذف از علاقه مندی' : 'اضافه به علاقه مندی');
   
    console.log(color)

    useEffect(() => {

        if (favoriteData) {
            if (favoriteData.status === 1) {
                setBtnFavorite('حذف از علاقه مندی ها')
                toast.success('محصول به علاقه مندی های شما   اضافه شد', {
                    position: toast.POSITION.TOP_LEFT,
                    rtl: true
                })
            } else if (favoriteData.status === 2) {
                setBtnFavorite('اضافه به علاقه مندی ها')

                toast.success('    محصولا از علاقه مندی های شما حذف شد  ', {
                    position: toast.POSITION.TOP_LEFT,
                    rtl: true
                })
            } else if (favoriteData.status === 3) {
                toast.success(`   ابتدا    وارد   شوید  `, {
                    position: toast.POSITION.TOP_LEFT,
                    rtl: true
                })
            }
        }

    }, [favoriteData])

   useEffect(()=>{
     dispatch(  setSelectedColorPrice(selectedColorPrice))
 
   } , [selectedColorPrice])
    useEffect(()=>{
     dispatch(setNumber(counter))
   } , [counter])

    const handlerFavorite = async (slug) => {
        try {
            const data = await favorite(slug).unwrap();
        } catch (error) {
            toast.error(` خطایی پیش آمده است `, {
                position: toast.POSITION.TOP_LEFT,
                rtl: true
            })
        }
    }

    useEffect(() => {

        async function product() {
            await getProduct(params.slug);
        }

        product();
    }, [params])


    useEffect(() => {
        if (data) {
            dispatch(setIsError(isError));
            dispatch(setIsSuccess(isSuccess));
            dispatch(setIsLoading(isLoading));
            dispatch(setItemLength(data.product.length))
            dispatch(setGallery(data.product.gallery));
            dispatch(setComments(data.product?.activeComments));
            dispatch(setSlug([data.product?.slug]));
            dispatch(setCalculatePrice({
                'selected_color':color,
                'marketable': data.product.marketable_number,
                'product':data.product

            }));
        
            dispatch(setIsFavorite({ isFavorite: data?.isFavorite, id: data?.product.slug }))
            dispatch(setOriginalProductPrice(data.product.price))
            dispatch(setProductDiscountPrice(data.product.amazingSales ?   data.product.price * data.product.amazingSales?.percentage/100 : 0))

        }
    }, [data, isError, isLoading, isSuccess , color ,selectedColorPrice])

    return (
        <>
            <ProductContainer>

                <ProductContent title={data?.product.name}>
                    <section className="flex flex-col justify-start items-start p-2 w-full">
                    <section className="mb-2 flex">
                            <section className="flex" >
                                <p className="text-sm">
                                    <FontAwesomeIcon icon={faStoreAlt} />
                                     امتیاز این محصول: 
                                </p>
                                <StarProductRating />
                            </section>
                        </section>

                        <section className="mb-2 flex flex-col justify-start items-start">
                            <section className="flex">
                                <p className="text-sm">رنگ : </p> <p className="text-sm"> {color?.color_name} </p>
                            </section>
                            <section className="flex mt-2">
                                {data?.product.colors.map((color, index) => (
                                    <section onClick={() =>{ 
                                        
                                         setColor(color)
                                         setSelectColorPrice(  color.price_increase ?? 0)
                                    }} key={index} style={{ backgroundColor: color.color }} className={`w-8 h-8 border border-gray-300 rounded-full ml-1 cursor-pointer`}>
                                    </section>
                                ))}

                            </section>
                        </section>

                        <section className="mb-2 flex flex-col justify-start items-start">
                            <section className="flex justify-start items-center">
                                <p className="text-sm"> سایز : </p>
                                <section className="flex mt-2">
                                    {data?.product.values.map((value, index) => (
                                        <section key={index} className="w-8 h-8 flex justify-center items-center  border border-gray-300 rounded-full hover:border-pallete  ml-1 cursor-pointer">
                                            <p className="tex-sm font-bold">  {JSON.parse(value.value).value} </p>
                                        </section>
                                    ))}
                                </section>
                            </section>
                        </section>

                        <section className="mb-2">
                            <section>
                                <p className="text-sm">
                                    <FontAwesomeIcon icon={faStoreAlt} />
                                    {data?.product.marketable_number > 0 ? '   کالا موجود در انبار  ' : 'کالا نا موجود'}
                                </p>
                            </section>
                        </section>
                        {isMobile ? <></> : <>
                            <section className="mb-2">



                                <section>
                                    <Button onClick={() => handlerFavorite(data?.product.slug)} className="text-sm hover:text-red-600">
                                        <FontAwesomeIcon className="text-red-600" icon={faHeart} />
                                        {btnFavorite}
                                    </Button>
                                </section>

                            </section>

                            <section className="flex justify-between items-center mr-2 w-full">
                                <section className="flex border rounded-lg  border-gray-300">
                                    <button disabled={counter == 1 ? true : false} onClick={()=>counter !=1 ? setCounter(counter-1): null} className="p-1 rounded-lg m-1 bg-pallete text-lg text-white" type="button">-</button>
                                    <input className="rounded-sm border-none w-8 p-0 text-center" type="number" min="1" max={data?.product.marketable_number} step="1" value={counter} readOnly="readonly" />
                                    <button disabled={counter == data?.product.marketable_number ? true : false} onClick={()=>counter != data?.product.marketable_number ? setCounter(counter+1): null} className="p-1 m-1 rounded-lg bg-pallete text-lg text-white" type="button">+</button>
                                </section>

                            </section>
                        </>
                        }
                    </section>
                </ProductContent>

            </ProductContainer>
            <TabContainer >
                <TabItems title={'کالاهای مرتبط'}  >


                </TabItems>
                <TabContent >
                    <div className=" p-4 rounded-lg bg-gray-50 dark:bg-gray-800" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                        <ProductSlider>
                            {data?.relatedProducts.map((product, index) => {
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
                                                                                product?.amazingSales  ?
                                                                                    <section className=' rounded-lg  flex justify-center  items-center    w-10 h-10 bg-red-600 text-white text-center'>
                                                                                        <p>{convertEnglishToPersian(product?.amazingSales?.percentage)}%</p>
                                                                                    </section>

                                                                                    : null
                                                                            }
                                                                        </section>

                                                                        <section className='felx flex-row justify-end w-3/4'>
                                                                            <p className="text-white text-left text-sm"> {product?.amazingSales ?  priceFormatter(product.price - (product?.price * (product?.amazingSales?.percentage/100) )) : priceFormatter(product?.price)} تومان</p>
                                                                            {product?.amazingSales  ? <p className='text-red-700 text-sm text-left line-through decoration-red-600'>
                                                                                { priceFormatter(product.price)} تومان
                                                                            </p> : null}
                                                                        </section>
                                                </section>


                                            </section>
                                        </SwiperSlide>

                                    </section>
                                )
                            })}


                        </ProductSlider>
                    </div>

                </TabContent>

            </TabContainer>


            <TabContainer >
                <TabItems title={'کالاهای مرتبط'} className='hidden'>
                    <li className="mr-2" role="presentation">
                        <button className={`${show === 1 ? 'text-pallete' : 'hover:text-pallete  dark:hover:text-pallete'} p-4 rounded-t-lg `} type="button" onClick={() => setShow(1)}>  معرفی محصول </button>
                    </li>
                    <li className="mr-2" role="presentation">
                        <button className={`${show === 2 ? 'text-pallete' : 'hover:text-pallete  dark:hover:text-pallete'} p-4 rounded-t-lg `} type="button" onClick={() => setShow(2)}>  ویژگی  </button>
                    </li>
                    <li className="mr-2" role="presentation">
                        <button className={`${show === 3 ? 'text-pallete' : 'hover:text-pallete  dark:hover:text-pallete'} p-4 rounded-t-lg `} type="button" onClick={() => setShow(3)}>  نظرات </button>
                    </li>

                </TabItems>
                <TabContent >
                    <div className={`${show !== 1 ? 'hidden' : ''} p-4 rounded-lg bg-gray-50 dark:bg-gray-800`} id="1" role="tabpanel" aria-labelledby="profile-tab">
                        <InfoProductContainer title={'معرفی کالا'} className={'w-full'}>
                            <p className="text-sm text-justify p-3  leading-6">
                                {data?.product.introduction.replace(/<(.|\n)*?>/g, '')}
                            </p>

                        </InfoProductContainer>
                    </div>
                    <div className={`${show !== 2 ? 'hidden' : ''} w-full p-4 rounded-lg bg-gray-50 dark:bg-gray-800`} id="2" role="tabpanel" aria-labelledby="dashboard-tab">
                        <InfoProductContainer title={'ویژگی های کالا'} className={'w-full  '}>

                            <section className="w-full flex flex-col justify-between  rounded-lg items-center bg-pallete bg-opacity-30">

                                {data?.product.metas.map((meta, index) => (
                                    <section key={index} className="w-full flex flex-row justify-between items-center p-4  ">
                                        <section className="w-1/4">
                                            <p className="font-bold text-sm"> {meta.meta_key} </p>
                                        </section>
                                        <section className="w-3/4 flex justify-start">
                                            <p className="text-sm">  {meta.meta_value}  </p>
                                        </section>
                                    </section>
                                ))}


                            </section>
                        </InfoProductContainer>
                    </div>
                    <div className={`${show !== 3 ? 'hidden' : ''} p-4 rounded-lg bg-gray-50 dark:bg-gray-800`} id="3" role="tabpanel" aria-labelledby="settings-tab">
                        <InfoProductContainer title={'نظرات کاربران'}>
                            <Comment />
                        </InfoProductContainer>
                    </div>

                </TabContent>

            </TabContainer>

        </>
    )
}
export default Product;