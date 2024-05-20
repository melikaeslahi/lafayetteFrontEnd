import Image from "next/image";
import Link from "next/link";
import profile from '../../../../public/image/profile.jpg'
import { useDispatch, useSelector } from "react-redux";
import { priceFormatter } from "@/helper/helper";
import { addToCart } from "@/store/reducers/customer/cartSlice";
import { useAddToCartMutation } from "@/lib/customer/salesProccess/cartApi";

const Sidebar = ( ) => {
    const dispatch =useDispatch();
    const {user} = useSelector(state=>state.auth);
    const {calculate ,number  ,original_product_price ,selected_color_price ,product_discount_price} = useSelector(state=> state.productCustomer)
    const productPrice = parseInt(original_product_price) + parseInt(selected_color_price);
    const finalProductDiscount = calculate.product?.amazingSales ? productPrice * calculate.product?.amazingSales?.percentage/100 : 0;
    const finalPrice = number * (productPrice - finalProductDiscount);
    const [addToCartDatabase , {data:cartData}] = useAddToCartMutation();

    const handlerAddToCart=async (item)=>{
        // console.log(item);
        if(user){
            const formData = new FormData();

            formData.append('number' , item.cartQty);
            formData.append('color_id' , item.selected_color.id);
             await addToCartDatabase({formData , slug:item.product.slug})


        }else{
            dispatch(addToCart(item))

        }

    }  


    return (
        <>
           
            <section className="flex flex-col justify-center mt-2 items-center w-full">
                <section className="flex justify-between items-center mb-1 pb-3 w-full">
                    <p className="text-sm">قیمت  کالا({number}) </p>
                    <p className="text-sm">{ priceFormatter(productPrice)}  تومان </p>

                </section>
                
                <section className="flex justify-between items-center mb-3 pb-3 w-full border-b  border-gray-300 ">
                    <p className="text-sm">  تخفیف کالاها  </p>
                    <p className="text-sm text-red-600">   {   priceFormatter(number * finalProductDiscount)   }   تومان </p>

                </section>  
              
                <section className="flex justify-between items-center mb-1 pb-3 w-full">
                    <p className="text-sm">    جمع سبد خرید </p>
                    <p className="text-sm"> { priceFormatter(finalPrice)} تومان </p>

                </section>

                <section className={`flex justify-between items-center mb-1 pb-3 w-full`}>
                <button
                disabled={calculate.marketable > 0 ?  ( calculate.selected_color != null ? false : true ): true }
                  onClick={()=>handlerAddToCart({ ...calculate,
                      cartQty:  number ,
                      discount:product_discount_price ,
                      productPrice:productPrice,
                      finalPrice:finalPrice })} 
                      className={`${calculate.marketable > 0 ? 'bg-red-600' : 'bg-red-400' }   text-white rounded-lg  my-2  px-6 py-2  w-full`}> 
                       {calculate.marketable > 0 ? (calculate?.selected_color?.color_name ?  ' اضافه به سبد خرید ' : 'رنگ محصول را انتخاب نمایید' ): 'ناموجود' }   
                         </button>

            </section>

            </section>
        </>
    )
}
export default Sidebar;