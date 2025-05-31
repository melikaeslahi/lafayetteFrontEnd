'use client'
import Image from "next/image"
// import { Button } from "@/components/dashboard/inputs"
// import { faBagShopping, faHeart } from "@fortawesome/free-solid-svg-icons"
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useDispatch, useSelector } from "react-redux"
import { useGetProductsMutation } from "@/lib/customer/homeApi"
import { useEffect, useState } from "react"
import { setFiltering, setProducts } from "@/store/reducers/customer/ProductsSlice"
import { useAddToFavoriteMutation } from "@/lib/customer/market/productApi"
// import useAuth from "@/hooks/useAuth"
import Link from "next/link"
import { convertEnglishToPersian, priceFormatter } from "@/helper/helper"
// import { useGetProductsQuery } from "@/lib/customer/homeApi"
const Product = ({ children }) => {
    const dispatch = useDispatch();
    const { products } = useSelector(state => state.productsCustomer);
    const { isThLarge, isThList } = useSelector(state => state.util);
    const { user: userData } = useSelector(state => state.auth);



    const [favoritee, setFavorite] = useState(null);


    // function favoritelist(slug) {

    //    const data= userData.user.products.include(slug);
    //   console.log(data);

    // }

    const cagtegory = null;
    // const { data } = useGetProductsQuery();
    
    const [fetchProducts, { data }] = useGetProductsMutation();
    const [addToFavorite, { data: favorite }] = useAddToFavoriteMutation();



    useEffect(() => {
        if (data) {
            dispatch(setFiltering({ categories: data.categories, brands: data.brands }))
            dispatch(setProducts(data))
        }
    }, [data])


    useEffect(() => {
        if (favoritee) {
            async function favorite() {
                await addToFavorite(favoritee);

            }


            favorite();
        }
    }, [favoritee]);

    useEffect(() => {
        if(!products){
        async function allProducts() {
            await fetchProducts();
        }
        allProducts()}
    }, [products])

    return (
        <>
            {isThLarge ?


                products?.products.length > 0 ? products?.products.map((product, index) => {
                    const indexArray = Object.entries(product.image.indexArray);

                    return (
                        // pt-1  px-4 border-b border-r border-gray-300 h-72
                        <section key={index} className="relative w-full h-72  hover:shadow-lg hover:shadow-gray-300  pt-1  px-4 border-b border-r border-gray-300">

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




                            {/* //left-3 rigth-3 p-2*/}
                            <section className='flex flex-row rounded-b-lg rounded-t-xl p-2 h-16  absolute bottom-0 left-3.5 right-3.5 bg-black bg-opacity-40'>
                                <section className="w-1/4 justify-start">
                                    {
                                        product?.amazingSales  ?
                                            <section className=' rounded-lg  flex justify-center  items-center    w-10 h-10 bg-red-600 text-white text-center'>
                                                <p>{convertEnglishToPersian(product?.amazingSales.percentage)}%</p>
                                            </section>

                                            : null
                                    }
                                </section>

                                <section className='felx flex-row justify-end w-3/4'>


                                    <p className="text-white text-left text-sm"> {product?.amazingSales ?   priceFormatter(product.price - (product?.price * (product?.amazingSales?.percentage / 100) )): priceFormatter(product?.price)} تومان</p>
                                    {product?.amazingSales  ? <p className='text-red-700 text-sm text-left line-through decoration-red-600'>
                                        { priceFormatter(product.price)} تومان
                                    </p> : null}

                                </section>

                            </section>


                        </section>


                    )
                }) : null


                :
                products?.products.length > 0 ? products.products.map((product, index) =>{ 
                    const indexArray = Object.entries(product.image.indexArray);
                    
                    return(

                    <section key={index} className="flex justify-start items-center w-full m-2 p-1 border-b border-gray-300">

                        <section className="h-52 w-2/6">
                              {/* left-3 rigth-3 p-2 */}
                           
                              {/*flex justify-center items-center pt-1  px-4 border-b border-r border-gray-300 h-72 */}
                        <section className="relative w-full h-full flex justify-center items-center  hover:shadow-lg hover:shadow-gray-300  pt-1  px-4 border-b border-r border-gray-300">
                                    {/* w-52 */}
                            <section className="h-full w-52 ">
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




                             {/* left-3 rigth-3 p-2 */}
                            <section className='flex flex-row rounded-b-lg rounded-t-xl p-2 h-16  absolute bottom-0 left-14 right-14 bg-black bg-opacity-40'>
                                <section className="w-1/4 justify-start">
                                    {
                                        product?.amazingSales  ?
                                            <section className=' rounded-lg  flex justify-center  items-center    w-10 h-10 bg-red-600 text-white text-center'>
                                                <p>{product?.amazingSales.percentage}%</p>
                                            </section>

                                            : null
                                    }
                                </section>

                                <section className='felx flex-row justify-end w-3/4'>


                                    <p className="text-white w-full text-left text-sm"> {product?.amazingSales ? priceFormatter(product.price - (product?.price * (product?.amazingSales?.percentage / 100) )): priceFormatter(product?.price)} تومان</p>
                                    {product?.amazingSales  ? <p className='text-red-700 text-sm text-left line-through decoration-red-600'>
                                        {priceFormatter(product.price)} تومان
                                    </p> : null}

                                </section>

                            </section>


                        </section>
                        </section>

                        <section className="w-2/6 flex flex-col p-2 m-1">
                            <p className="text-lg font-bold mb-2"> {product.name} </p>
                            <section className="flex items-center justify-start">
                                <p className="text-sm mb-2   ">   رنگ:   </p>
                                <section className="flex">
                                    {product.colors.map((color, index) => (
                                        <section key={index} style={{ backgroundColor: color.color }} className={`w-8 h-8 border border-gray-300 rounded-full ml-1 cursor-pointer`}>
                                        </section>
                                    ))}
                                </section>

                            </section>
                            <section className="flex items-center justify-start">
                                <p className="text-sm  mb-2">   سایز:  </p>
                                {product?.values.map((value, index) => (

                                    <section key={index} className="flex mt-2">
                                        <section className="w-8 h-8 flex justify-center items-center  border border-gray-300 rounded-full hover:border-pallete  ml-1 cursor-pointer">
                                            <p className="tex-sm font-bold">{JSON.parse(value.value).value}</p>
                                        </section>

                                    </section>

                                ))}
                            </section>


                            <p className="text-sm mb-2">    وضعیت :  {product.marketable_number > 0 ? 'موجود در انبار' : 'ناموجود'} </p>
                            <p className="text-sm mb-2">     امتیاز :  ***** </p>
                        </section>
                        <section className="border-r p-2 m-2 border-gray-300 w-2/6">
                            <section className="flex flex-col justify-start items-start">
                                <p className={'text-lg mb-2 font-bold'}> ویژگی ها </p>
                                {product?.metas?.map((meta, index) => (
                                    <p key={index} className="text-sm   mb-2">  {meta.meta_key}:  {meta.meta_value}  </p>
                                ))}





                            </section>
                        </section>

                    </section>
                )}) : null

            }




        </>
    )
}
export default Product