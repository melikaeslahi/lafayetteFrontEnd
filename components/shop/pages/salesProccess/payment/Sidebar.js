import Image from "next/image";
 
 
import { convertEnglishToPersian, priceFormatter } from "@/helper/helper";
import { useSelector } from "react-redux";
import { usePaymentSubmitMutation } from "@/lib/customer/salesProccess/paymentApi";
import SidbarFrame from "../SidebarFrame";

const Sidebar = ( ) => {
    const {user} = useSelector(state => state.auth);
    const  { order , paymentType ,cashReceiver}=  useSelector(state => state.payment);
    const cart =  useSelector(state => state.cart);

    const [paymentSubmit] =   usePaymentSubmitMutation();
    
     console.log(order)

    const handlerPaymentSubmit =async(type ,cashReceiver)=>{

        const formData = new FormData();
        formData.append('payment_type', type);
        if(cashReceiver)
        formData.append('cash_receiver' , cashReceiver);
     const data= await  paymentSubmit(formData).unwrap();
     console.log(data);
    }

    return (
        <>
         {user ? 
         <SidbarFrame>
            <section className="flex flex-col justify-center mt-2 items-center w-full">
            <section className="flex justify-between items-center mb-1 pb-3 w-full">
                    <p className="text-sm"> قیمت کالاها({convertEnglishToPersian(cart.sideBarDatabaseInfo?.totalCartQty)}) </p>
                    <p className="text-sm">     {priceFormatter( parseInt(cart.sideBarDatabaseInfo?.totalCartProductPrice))} تومان </p>

                </section>
                
                <section className="flex justify-between items-center mb-3 pb-3 w-full border-b  border-gray-300 ">
                    <p className="text-sm">  تخفیف کالاها  </p>
                    <p className="text-sm text-red-600">     {priceFormatter(cart.sideBarDatabaseInfo?.totalCartDiscountAmaount)} تومان </p>

                </section>
              
                <section className="flex justify-between items-center mb-1 pb-3 w-full">
                    <p className="text-sm">    جمع سبد خرید </p>
                    <p className="text-sm">   {priceFormatter(parseInt(cart.sideBarDatabaseInfo?.totalCartFinalPrice))} تومان </p>

                </section>
              
                
              
              

               


                <section className="flex justify-between items-center mb-1 pb-3 w-full">
                    <p className="text-sm">     هزینه ارسال </p>
                    <p className="text-sm">   {priceFormatter(order?.delivery_amount)} تومان </p>

                </section>

                <section className="flex justify-between items-center mb-1 pb-3 w-full">
                    <p className="text-sm">        کد تخفیف اعمال شده </p>
                    <p className="text-sm  text-red-600">     {priceFormatter(order?.order_copan_discount_amount)} تومان </p>

                </section>

                <section className="flex justify-between mt-3 pt-3 border-t border-gray-300 items-center mb-1 pb-3 w-full">
                    <p className="text-sm">       مبلغ قابل پرداخت </p>
                    <p className="text-sm">     {priceFormatter(order?.order_final_amount )}تومان </p>

                </section>
                <section className={`flex justify-between items-center mb-1 pb-3 w-full`}>
                    <button 
                      onClick={()=>handlerPaymentSubmit(paymentType ,cashReceiver)}
                     disabled={paymentType ? false : true}
                        type="submit"
                        className={`bg-red-600 text-white rounded-lg  my-2  px-6 py-2  w-full`}>
                        {paymentType ? 'پرداخت' : 'روش پرداخت را انتخاب نمایید '}
                    </button>

                </section>


            </section>
            </SidbarFrame>  : null
             }  
           
        </>
    )
}
export default Sidebar;