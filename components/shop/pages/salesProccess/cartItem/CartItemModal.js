import Modal from "@/components/shop/Modal";
import Image from "next/image";
import { image } from '../../../../../public/image/1674310398.jpg';
import { Button } from "@/components/dashboard/inputs";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { modalOpenClose, setIsCartItemModal } from "@/store/reducers/dashboard/UtilSlice";
import { getTotal } from "@/store/reducers/customer/cartSlice";
import { useEffect } from "react";
import { convertEnglishToPersian, priceFormatter } from "@/helper/helper";
import { useGetCartQuery } from "@/services/customer/salesProccess/cartApi";
const CartItemModal = () => {
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart);
    const  {user} = useSelector(state => state.auth);

    const  {isCartItemModal} = useSelector(state => state.util);


    const { data: cartItems ,isSuccess } =  useGetCartQuery();


    useEffect(() => {
        dispatch(getTotal());
    }, [cart, dispatch]);
    console.log(cart)
    return (
        <>
            <Modal
                margin={'mr-0'}
                close={true}
                title={'سبد خرید شما'}
                widthAndHiegth={'h-full w-full'}
                blur={'backdrop-blur-0'}
                position={'fixed bottom-0 top-0 right-0 w-full md:w-2/6 lg:w-2/6 xl:w-2/6  flex justify-start items-start'}
                show={isCartItemModal}
                closeMethod={setIsCartItemModal}
                >

                {user ? (
                   cartItems?.cartItems?.length === 0 ? <h1>سبد خرید شما خالی است</h1> :
                    <section className="w-full flex flex-col justify-start items-start h-full">
                        {cartItems?.cartItems?.map((cart, index) => {
                            const indexArray = Object.entries(cart.product.image.indexArray);
                          
                            return (
                                <section key={index} className="flex justify-between items-center w-full h-32 mb-2 pb-2 border border-b-0">
                                    <section className="w-2/4 h-full justify-end ">
                                        <section className="relative w-full h-full group   hover:shadow-lg hover:shadow-gray-300">
                                            <section className="h-full ">
                                                {indexArray.map(([size, value]) => (
                                                    cart.product.image.currentImage === size &&
                                                     <Link
                                                     href={`/market/product/${cart.product.slug}`}
                                                     onClick={()=>setIsCartItemModal(false)}
                                                     
                                                     >
                                                        <Image width={500}
                                                            height={300}
                                                            className={' w-full h-full rounded-lg cursor-pointer    object-cover  hover:object-fill  '}
                                                            key={size}
                                                            src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${value}`}
                                                            unoptimized={true}
                                                            priority={true}
                                                            quality={80}
                                                            alt="image" />
                                                    </Link>
                                                ))}
                                            </section>
                                            <section className='hidden group-hover:flex flex-row rounded-b-lg rounded-t-xl p-3 h-16  absolute bottom-0 left-0 right-0 bg-black bg-opacity-40'>
                                                <section className="w-1/4 justify-start">
                                                    {
                                                        cart.product?.amazingSales ?
                                                            <section className=' rounded-lg  flex justify-center  items-center    w-10 h-10 bg-red-600 text-white text-center'>
                                                                <p>{convertEnglishToPersian(cart.product?.amazingSales.percentage)}%</p>
                                                            </section>

                                                            : null
                                                    }
                                                </section>
                                                <section className='felx flex-row justify-end w-3/4'>
                                                    <p className="text-white text-left text-sm">   {convertEnglishToPersian(cart.number) + '×' + priceFormatter(cart.cartItemProductPrice)} تومان</p>
                                                    {cart.product?.amazingSales ? <p className='text-red-700 text-sm text-left    '>
                                                       تخفیف {priceFormatter(cart.cartItemProductDiscount)}  
                                                    </p> : null}
                                                </section>
                                            </section>
                                        </section>
                                    </section>
                                    <section className="w-4/6">
                                        <h2> {cart.product.name} </h2>
                                        <h3> مجموع قیمت  :  {  priceFormatter(cart.cartItemFinalPrice)   } تومان </h3>
                                        <h3>  { cart.color?.color_name  }  </h3>

                                    </section>

                                </section>
                            )
                        })}
 
                          {/* <section className="m-3 w-full flex justify-start items-start">
                               <h1 className="text-pallete">مجموع قیمت محصولات: </h1>
                               <h2>{priceFormatter(cart.cartTotalAmount)}تومان</h2>
                          </section>
                          <section className="m-3 w-full flex justify-start items-start">
                               <h1 className="text-pallete">  مبلغ قابل پرداخت : </h1>
                               <h2>{ priceFormatter(cart.cartTotalAmount - cart.discountTotalAmount )}تومان</h2>
                          </section> */}
                        <section className="absolute bottom-0 left-0 right-0 bg-white mt-4 flex justify-between items-center w-full h-16 z-50 shadow-[rgba(0,0,15,0.2)_5px_5px_4px_10px]">
                            <section className={'flex justify-center w-full '}>
                                <Link
                                    href={'/sales-proccess/card'}
                                    onClick={() => dispatch(modalOpenClose(false))}
                                    className={'py-1  m-3 px-3 rounded-lg bg-pallete text-white'}

                                > نمایش سبد خرید </Link>
                            </section>
                            <section className={'flex  justify-center w-full'}>
                                <Button onClick={() => dispatch(modalOpenClose(false))} className={'py-1 m-3 px-3 rounded-lg bg-white border border-pallete text-pallete'}>بستن</Button>
                            </section>

                        </section>
                    </section>
           
                ) :
                
                   (cart?.cartItems.length === 0 ? <h1>سبد خرید شما خالی است</h1> :
                    <section className="w-full flex flex-col justify-start items-start h-full">
                        {cart.cartItems.map((cart, index) => {
                            const indexArray = Object.entries(cart.product.image.indexArray);
                           const productPrice = parseInt(cart.product.price) + parseInt(cart.selected_color?.price_increase ?  cart.selected_color?.price_increase : 0 );
                           const discount = cart.product?.amazingSales ? cart.product.price * (cart.product?.amazingSales?.percentage/100  ) : parseInt(0);                        
                           const totalDiscount = cart.cartQty * discount;
                           const finalPrice = cart.cartQty * (productPrice - discount)
                            return (
                                <section key={index} className="flex justify-between items-center w-full h-32 mb-2 pb-2 border border-b-0">
                                    <section className="w-2/4 h-full justify-end ">
                                        <section className="relative w-full h-full group   hover:shadow-lg hover:shadow-gray-300">
                                            <section className="h-full ">
                                                {indexArray.map(([size, value]) => (
                                                    cart.product.image.currentImage === size && 
                                                    <Link
                                                     href={`/market/product/${cart.product.slug}`}
                                                     onClick={()=>setIsCartItemModal(false)}
                                                     >
                                                        <Image width={500}
                                                            height={300}
                                                            className={' w-full h-full rounded-lg cursor-pointer    object-cover  hover:object-fill  '}
                                                            key={size}
                                                            src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${value}`}
                                                            unoptimized={true}
                                                            priority={true}
                                                            quality={80}
                                                            alt="image" />
                                                    </Link>
                                                ))}
                                            </section>
                                            <section className='hidden group-hover:flex   flex-row rounded-b-lg rounded-t-xl p-3 h-16  absolute bottom-0 left-0 right-0 bg-black bg-opacity-40'>
                                                <section className="w-1/4 justify-start">
                                                    {
                                                        cart.product?.amazingSales ?
                                                            <section className=' rounded-lg  flex justify-center  items-center    w-10 h-10 bg-red-600 text-white text-center'>
                                                                <p>{convertEnglishToPersian(cart.product?.amazingSales.percentage)}%</p>
                                                            </section>

                                                            : null
                                                    }
                                                </section>
                                                <section className='felx flex-row justify-end w-3/4'>
                                                    <p className="text-white text-left text-sm">   {convertEnglishToPersian(cart.cartQty) + '×' + priceFormatter(productPrice)} تومان</p>
                                                    {cart.product?.amazingSales ? <p className='text-red-700 text-sm text-left    '>
                                                       تخفیف {priceFormatter( totalDiscount)}  
                                                    </p> : null}
                                                </section>
                                            </section>
                                        </section>
                                    </section>
                                    <section className="w-4/6">
                                        <h2> {cart.product.name} </h2>
                                        <h3> مجموع قیمت  :  {  priceFormatter(finalPrice)   } تومان </h3>
                                        <h3>  { cart.selected_color?.color_name  }  </h3>

                                    </section>

                                </section>
                            )
                        })}
 
                          <section className="m-3 w-full flex justify-start items-start">
                               <h1 className="text-pallete">مجموع قیمت محصولات: </h1>
                               <h2>{priceFormatter(cart.cartTotalAmount)}تومان</h2>
                          </section>
                          <section className="m-3 w-full flex justify-start items-start">
                               <h1 className="text-pallete">  مبلغ قابل پرداخت : </h1>
                               <h2>{ priceFormatter(cart.cartTotalAmount - cart.discountTotalAmount )}تومان</h2>
                          </section>
                        <section className="absolute bottom-0 left-0 right-0 bg-white mt-4 flex justify-between items-center w-full h-16 z-50 shadow-[rgba(0,0,15,0.2)_5px_5px_4px_10px]">
                            <section className={'flex justify-center w-full '}>
                                <Link
                                    href={'/sales-proccess/card'}
                                    onClick={() => dispatch(modalOpenClose(false))}
                                    className={'py-1  m-3 px-3 rounded-lg bg-pallete text-white'}

                                > نمایش سبد خرید </Link>
                            </section>
                            <section className={'flex  justify-center w-full'}>
                                <Button onClick={() => dispatch(modalOpenClose(false))} className={'py-1 m-3 px-3 rounded-lg bg-white border border-pallete text-pallete'}>بستن</Button>
                            </section>

                        </section>
                    </section>)
                }




            </Modal>
        </>
    )
}
export default CartItemModal;