'use client';
import PaymentContent from "@/components/shop/pages/payment/PaymentContent";
import Tabs from "@/components/shop/tab/TabContainer";
import { faStoreAlt, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { convertEnglishToPersian, priceFormatter } from "@/helper/helper";
import { useGetCartQuery } from "@/lib/customer/salesProccess/cartApi";
import { Button } from "@/components/dashboard/inputs";
import { removeFromCart } from "@/store/reducers/customer/cartSlice";
 
 
const CartItemFromCash =()=>{
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart);
    const { user } = useSelector(state => state.auth);
    const { data: cartItems ,isSuccess } =  useGetCartQuery();
    console.log(cart);
    return (
       <>
                 <section className="flex flex-col m-2 p-2 ">
                        {cart?.cartItems.length === 0 ? 'سبد خرید شما خالی می باشد' : cart.cartItems.map((cart, index) => {
                            const indexArray = Object.entries(cart.product.image.indexArray);
                            const productPrice = parseInt(cart.product.price) + parseInt(cart.selected_color?.price_increase ? cart.selected_color?.price_increase : 0);
                            const discount = cart.product?.amazingSales ? cart.product.price * (cart.product?.amazingSales?.percentage / 100) : parseInt(0);

                            const totalDiscount = cart.cartQty * discount;
                            const finalPrice = cart.cartQty * (productPrice - discount)
                            return (
                                <section key={index} className="grid grid-flow-row grid-cols-1 lg:grid-cols-4 xl:grid-cols-4 md:grid-cols-1 w-full h-full p-2 mt-2 border border-gray-300 rounded-lg">
                                    <section className="w-full  flex justify-start items-center col-span-3  ">
                                        <section className="relative w-2/6  h-full hover:shadow-lg hover:shadow-gray-300">

                                            <section className="h-full">
                                                {indexArray.map(([size, value]) => (
                                                    cart.product.image.currentImage === size && <Link href={`/market/product/${cart.product.slug}`}>
                                                        <Image width={500}
                                                            height={300}
                                                            className={'w-full cursor-pointer object-cover h-full   rounded-lg hover:object-fill  '}
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
                                                        تخفیف {priceFormatter(discount)}
                                                    </p> : null}
                                                </section>

                                            </section>


                                        </section>

                                        <section className="flex w-4/6 flex-col items-start">
                                            <section className="flex   p-2 mt-1">
                                                <p className="  text-sm font-bold text-pallete pl-1">نام محصول: </p>
                                                <p className="text-sm font-normal align-baseline text-black">
                                                    {cart.product.name}
                                                </p>
                                            </section>
                                            <section className="flex   p-2 mt-1">
                                                <p className="  text-sm font-bold text-pallete pl-1">  رنگ: </p>
                                                <p className="text-sm font-normal align-baseline text-black">
                                                    {cart?.selected_color?.color_name}
                                                </p>
                                            </section>
                                            <section className="flex   p-2 mt-1">
                                                <p className="  text-sm font-bold text-pallete pl-1">
                                                    <FontAwesomeIcon icon={faStoreAlt} /> </p>
                                                <p className="text-sm font-normal align-baseline text-black">
                                                    {cart.product.marketable_number > 0 ? ' کالا موجود در انبار کالا ' : 'کالا ناموجود'}
                                                </p>
                                            </section>
                                            <section className="flex justify-between items-center mr-2 w-full">
                                                <section className="flex border rounded-lg  border-gray-300">
                                                    <button className="p-1 rounded-lg m-1 bg-pallete text-lg text-white" type="button">-</button>
                                                    <input className="rounded-sm border-none w-5 p-0 " type="number" min="1" max="5" step="1" value="1" readonly="readOnly" />
                                                    <button className="p-1 m-1 rounded-lg bg-pallete text-lg text-white" type="button">+</button>
                                                </section>
                                                <section className="   p-2 mt-1">
                                                    <Button  onClick={()=>dispatch(removeFromCart(cart.product.id))} className={'text-sm text-red-600'}>
                                                        <FontAwesomeIcon icon={faTrashAlt} className={'text-pallete'} />
                                                        حذف از سبد
                                                    </Button>
                                                </section>
                                            </section>

                                        </section>
                                    </section>
                                    <section className="flex  col-span-1   justify-end  items-end   h-full ">
                                        <section className="p-2 mt-1 flex flex-col w-full h-full justify-end items-center lg:items-end xl:items-end md:items-center  ">
                                            <section className="text-red-600  mb-1">تخفیف   {priceFormatter(totalDiscount)} </section>
                                            <section className=" font-bold">  {priceFormatter(finalPrice)}  تومان</section>
                                        </section>

                                    </section>
                                </section>

                            )
                        })}
                    </section>
                    

       </>
    );

}
export default CartItemFromCash;