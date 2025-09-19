'use client'

import { Button, Input } from "@/components/dashboard/inputs";
import Modal from "@/components/shop/Modal";
import PaymentContent from "@/components/shop/pages/payment/PaymentContent";
import Sidebar from "@/components/shop/pages/salesProccess/payment/Sidebar";
import { useAddCopanDiscountMutation, useGetPaymentDataQuery, usePaymentSubmitMutation } from "@/services/customer/salesProccess/paymentApi";
import { setCashReceiver, setOrder, setPaymentType } from "@/store/reducers/customer/paymentSlice";
import { modalOpenClose, } from "@/store/reducers/dashboard/UtilSlice";
import cashReceiverSchema from "@/validation/customer/salesProccess/cashReceiverValidation";
import paymentSchema from "@/validation/customer/salesProccess/copanValidation";
import { faCalendar, faCreditCard, faEdit, faIdCardAlt, faMapMarkerAlt, faMobileAlt, faMoneyCheck, faPlusSquare, faShippingFast, faUserTag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form, Formik } from "formik";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const PaymentMethod = () => {

    const dispatch = useDispatch();
    const {paymentType} = useSelector(state=>state.payment);
    const [paymentSubmit] =   usePaymentSubmitMutation();

    const { data: paymentData } = useGetPaymentDataQuery();
    const [copanDiscount] = useAddCopanDiscountMutation();
 

    const initialValues = {
        
        cash_receiver:''
    }
    useEffect(()=>{
      
        if(paymentData){
            dispatch(setOrder(paymentData.order));
        }

    } , [paymentData])
  
 

    const handlerSubmit = (values) => {
        dispatch(setCashReceiver(values.cash_receiver))
    }
 



    return (<>
            <PaymentContent title={'روش پرداخت'} >
                <section className="flex flex-col justify-start items-start flex-grow p-2  mt-2">
                    <section className={`${paymentType == 1 ? 'border border-pallete rounded-lg' : ' border border-gray-300  rounded-lg'} w-3/4  p-1 mt-2 hover:border-pallete cursor-pointer`}>
                        <input onChange={(e) => dispatch(setPaymentType(e.target.value))} type="radio" name="payment_type" value="1" className="hidden" id="payment-1" />

                        <label htmlFor="payment-1" className="mb-2">
                            <section className="mb-2">
                                <FontAwesomeIcon className="mx-1 text-pallete" icon={faCreditCard} />
                                پرداخت آنلاین
                            </section>
                            <section className="mb-2">
                                <FontAwesomeIcon className=" mx-1 text-pallete" icon={faCalendar} />
                                درگاه پرداخت زرین پال
                            </section>
                        </label>
                    </section>

                    <section className={`${paymentType == 2 ? 'border border-pallete rounded-lg' : ' border border-gray-300  rounded-lg'} w-3/4  p-1 mt-2 hover:border-pallete cursor-pointer`}>
                        <input onChange={(e) => dispatch(setPaymentType(e.target.value))} type="radio" name="payment_type" value="2" className="hidden" id="payment-2" />
                        <label htmlFor="payment-2" className=" mb-2 py-4">
                            <section className="mb-2">
                                <FontAwesomeIcon className="mx-1 text-pallete" icon={faIdCardAlt} />
                                پرداخت  آفلاین
                            </section>
                            <section className="mb-2">
                                <FontAwesomeIcon className=" mx-1 text-pallete" icon={faCalendar} />
                                حداکثر در 2 روز کاری بررسی می شود
                            </section>
                        </label>
                    </section>

                    <section className={`${paymentType == 3 ? 'border border-pallete rounded-lg' : ' border border-gray-300  rounded-lg'} w-3/4  p-1 mt-2 hover:border-pallete cursor-pointer`}>
                        <input onChange={(e) => dispatch(setPaymentType(e.target.value))} type="radio" name="payment_type" value="3" className="hidden" id="payment-3" />

                        <label htmlFor="payment-3" className=" mb-2  py-4">
                            <section className="mb-2">
                                <FontAwesomeIcon className="mx-1 text-pallete" icon={faMoneyCheck} />
                                پرداخت در محل
                            </section>
                            <section className="mb-2  ">
                                <FontAwesomeIcon className=" mx-1 text-pallete" icon={faCalendar} />
                                پرداخت به پیک هنگام دریافت کالا
                            </section>
                        </label>
                    </section>
                   
                     <section  
                      className={`${paymentType == 3 ? 'w-full p-2' : 'hidden'  }`}
                     >
                     <Formik
                    initialValues={initialValues}
                    onSubmit={(values) => handlerSubmit(values)}
                    validationSchema={cashReceiverSchema}

                >
                    <Form>
                        <section className="flex justify-start items-center w-full">
                            <Input title={' گیرنده محصول '} className={'w-full'} containerClass={'w-full basis-full'} name={'cash_receiver'} placeholder={'مثل : محسن اصلاحی'} />
                            <Button type="submit" className="text-white bg-pallete px-4 py-1 rounded-lg h-auto">   ثبت گیرنده محصول   </Button>
                        </section>

                    </Form>

                </Formik>
                     </section>    
             

                </section>
            </PaymentContent>
       
    </>)
}
export default PaymentMethod;