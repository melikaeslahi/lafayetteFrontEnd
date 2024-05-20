'use client'
 
import { Button , Input  } from "@/components/dashboard/inputs";
import Modal from "@/components/shop/Modal";
import PaymentContent from "@/components/shop/pages/payment/PaymentContent";
import CreateAddress from "@/components/shop/pages/profile/address/CreateAddress";
import UpdateAddress from "@/components/shop/pages/profile/address/UpdateAddress";
import Sidebar from "@/components/shop/pages/salesProccess/choseAddressAndDelivery/Sidebar";
import { priceFormatter } from "@/helper/helper";
import { useChooseAddressAndDeliveryMutation, useGetAddressAndDeliveryQuery } from "@/lib/customer/salesProccess/addressApi";
import { modalOpenClose, setIsCreateAddressModal, setIsUpdateAddressModal, setUpdateAddress,   } from "@/store/reducers/dashboard/UtilSlice";
import { faCalendar, faEdit, faMapMarkerAlt, faMobileAlt, faPlusSquare, faShippingFast, faUserTag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form, Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
 
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const { default: PaymentContainer } = require("@/components/shop/pages/payment/PaymentContainer")

const Address = () => {
    
    const router= useRouter();
 
    const {data} = useGetAddressAndDeliveryQuery();
     const { isOpenModal, isIdAddress ,isCreateAddressModal ,isUpdateAddressModal } = useSelector(state => state.util);
    const { user } = useSelector(state => state.auth);
    const {  sideBarDatabaseInfo } = useSelector(state => state.cart);

    const [delivery , setDelivery] = useState(null);
    const [ deliveryPrice , setDeliveryPrice] = useState(0);

    const [selectedAddress , setAddress]= useState(null);
    const [chooseAddressAndDelivery ] = useChooseAddressAndDeliveryMutation();  
    const dispatch = useDispatch()
    const handlerModal = (address) => {
        if (address) {
            localStorage.setItem('address', JSON.stringify(address))

            dispatch(setUpdateAddress(address.id))

            dispatch( setIsUpdateAddressModal(true));
        }}

        const handlerAddressAndDellivery =async (delivery ,address )=>{
          const formData = new FormData();
          formData.append('delivery_id' , delivery);
          formData.append('address_id' , address);
           const res =  await chooseAddressAndDelivery(formData).unwrap();
           if(res?.status === 200) {
              router.push(`/sales-proccess/payment`);
           }
                 
        }
        
        

    return (
        <>
     
        <PaymentContainer   sidebar={
            <>
            <Sidebar>
                <section className="flex justify-between items-center mb-1 pb-3 w-full">
                    <p className="text-sm">     هزینه ارسال </p>
                    <p className="text-sm">    {priceFormatter(deliveryPrice)} تومان </p>

                </section>

                <section className="flex justify-between mt-3 pt-3 border-t border-gray-300 items-center mb-1 pb-3 w-full">
                    <p className="text-sm">       مبلغ قابل پرداخت </p>
                    <p className="text-sm">       { priceFormatter((sideBarDatabaseInfo.totalCartProductPrice - sideBarDatabaseInfo.totalCartDiscountAmaount ) + parseInt(deliveryPrice)  )  }تومان </p>

                </section>
                <section className={`flex justify-between items-center mb-1 pb-3 w-full`}>
                    <button type="submit"
                     disabled={delivery !== null && selectedAddress !== null ? false : true} 
                     onClick={()=>handlerAddressAndDellivery(delivery ,selectedAddress )}
                      className={`bg-red-600 text-white rounded-lg  my-2  px-6 py-2  w-full`}>
                        {delivery !== null && selectedAddress !== null ?  'پرداخت سفارش' :  ' آدرس و شیوه ی ارسال را انتخاب نمایید '}
                           
                              
                              </button>

                </section>
                </Sidebar>
            </>

        }>
              {isCreateAddressModal ?  <CreateAddress /> : null}
            {isUpdateAddressModal ? <UpdateAddress /> : null}
            <PaymentContent title={'انتخاب آدرس'}>
         
    {data?.addresses.map((address, index) => (
    <section 
    key={index}
     className={`w-full ${selectedAddress == address.id ? 'border border-pallete rounded-lg' : 'border border-gray-300 rounded-lg'}  p-2 mt-2 hover:border-pallete cursor-pointer`} 
     style={{}}>
        <input type="radio" onChange={(e)=>setAddress(e.target.value)} className="hidden" name="address_id" value={address.id}  id={`a-${address.id}`} />

        <label htmlFor={`a-${address.id}`} className=" mb-2  ">
            <section className="mb-2">
                <FontAwesomeIcon className="mx-1 text-pallete" icon={faMapMarkerAlt} />
                آدرس :   {address?.address ?? ' - '}

            </section>
            <section className="mb-2">
                <FontAwesomeIcon className=" mx-1 text-pallete" icon={faUserTag} />
                گیرنده :      {address?.recipient_first_name ?? ' - ' } {' '} {address?.recipient_last_name ?? ' - '}

            </section>
            <section className="flex justify-between mb-1">
                <section className="">
                    <FontAwesomeIcon className="mx-1 text-pallete" icon={faMobileAlt} />
                    موبایل گیرنده :   {address?.mobile ?? ' - '}
                </section>
                <Button href={''} onClick={() => handlerModal(address)} className="text-pallete"
                ><FontAwesomeIcon className=" text-pallete" icon={faEdit} />  ویرایش آدرس</Button>
            </section>


        </label>
    </section>))}


    <section className="w-full  border border-dashed border-gray-300  rounded-lg  p-2 mt-2 hover:border-pallete cursor-pointer">

        <section className="flex justify-center items-center">
            <Button href={''} onClick={() => {
                dispatch( setIsCreateAddressModal(true))
                
            }} className="text-pallete"
            ><FontAwesomeIcon className=" text-pallete" icon={faPlusSquare} />   ایجاد آدرس</Button>
        </section>


    </section>


 

            </PaymentContent>
              
              <PaymentContent title={'روش ارسال'} >

                <section className="flex justify-start items-start flex-grow p-2  mt-2">
             {data?.deliveryMethods.map((method , index)=>(
                 <section key={index}  
               
                 className={`w-3/4 ${ delivery == method.id ? 'border border-pallete rounded-lg' : 'border border-gray-300 rounded-lg'}    p-1 mt-2 hover:border-pallete cursor-pointer`}>
                 <input type="radio" 
                 onChange={(e)=>setDelivery(e.target.value)}
                  className="hidden" name="delivery_id" value={method.id}   id={`delivery-${method.id}`} />

                 <label   onClick={()=>setDeliveryPrice(method.amount)}  htmlFor={`delivery-${method.id}`} className=" mb-2  ">
                     <section className="mb-2">
                         <FontAwesomeIcon className="mx-1 text-pallete" icon={faShippingFast} />
                           {method.name}

                     </section>
                     <section className="mb-2">
                         <FontAwesomeIcon className=" mx-1 text-pallete" icon={faCalendar} />
                        تامین کالا تا {method.delivery_time} {method.delivery_time_unit} کاری

                     </section>
               


                 </label>
             </section>
             ))}       
               


                </section>
             

              </PaymentContent>

        </PaymentContainer>

         

       
    </>
   );
}
export default Address;