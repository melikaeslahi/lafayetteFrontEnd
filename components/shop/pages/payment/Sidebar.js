import Image from "next/image";
 
 
import { convertEnglishToPersian, priceFormatter } from "@/helper/helper";
import { useSelector } from "react-redux";

const Sidebar = ({children}) => {
    const {user} = useSelector(state => state.auth);
    const cart =  useSelector(state => state.cart);


    return (
        <>
         {user ? ( <section className="flex flex-col justify-center mt-2 items-center w-full">
                <section className="flex justify-between items-center mb-1 pb-3 w-full">
                    <p className="text-sm"> قیمت کالاها( {convertEnglishToPersian(cart.sideBarDatabaseInfo?.totalCartQty)}) </p>
                    <p className="text-sm">     {priceFormatter(cart.sideBarDatabaseInfo?.totalCartProductPrice)} تومان </p>

                </section>
                
                <section className="flex justify-between items-center mb-3 pb-3 w-full border-b  border-gray-300 ">
                    <p className="text-sm">  تخفیف کالاها  </p>
                    <p className="text-sm text-red-600">     {priceFormatter(cart.sideBarDatabaseInfo?.totalCartDiscountAmaount)} تومان </p>

                </section>
              
                <section className="flex justify-between items-center mb-1 pb-3 w-full">
                    <p className="text-sm">    جمع سبد خرید </p>
                    <p className="text-sm">   {priceFormatter(cart.sideBarDatabaseInfo?.totalCartProductPrice- cart.sideBarDatabaseInfo?.totalCartDiscountAmaount )} تومان </p>

                </section>

                {children}

            </section>) 
            :  
            <section className="flex flex-col justify-center mt-2 items-center w-full">
                <section className="flex justify-between items-center mb-1 pb-3 w-full">
                    <p className="text-sm"> قیمت کالاها( {convertEnglishToPersian(cart.cartTotalQty)}) </p>
                    <p className="text-sm">     {priceFormatter(cart.cartTotalAmount)} تومان </p>

                </section>
                
                <section className="flex justify-between items-center mb-3 pb-3 w-full border-b  border-gray-300 ">
                    <p className="text-sm">  تخفیف کالاها  </p>
                    <p className="text-sm text-red-600">     {priceFormatter(cart.discountTotalAmount)} تومان </p>

                </section>
              
                <section className="flex justify-between items-center mb-1 pb-3 w-full">
                    <p className="text-sm">    جمع سبد خرید </p>
                    <p className="text-sm">   {priceFormatter(cart.cartTotalAmount - cart.discountTotalAmount )} تومان </p>

                </section>

                {children}

            </section>
             }  
           
        </>
    )
}
export default Sidebar;