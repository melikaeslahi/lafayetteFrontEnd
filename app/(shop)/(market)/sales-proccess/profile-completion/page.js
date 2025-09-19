'use client'
import { Button, Input } from "@/components/dashboard/inputs";
import PaymentContent from "@/components/shop/pages/payment/PaymentContent";
import Sidebar from "@/components/shop/pages/salesProccess/profileCompletion/Sidebar";
import { useAddCopanDiscountMutation, useGetPaymentDataQuery } from "@/services/customer/salesProccess/paymentApi";
import { useGetProfileCompletionQuery, useUpdateProfileCompletionMutation } from "@/services/customer/salesProccess/profileCompletionApi";
import { setOrder } from "@/store/reducers/customer/paymentSlice";
import ProfileCompletionSchema from "@/validation/customer/salesProccess/profileCompletionValidation";
import { Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const { default: PaymentContainer } = require("@/components/shop/pages/payment/PaymentContainer")

const Payment = () => {
   const router = useRouter();
    const dispatch = useDispatch();
    const { data: profileCompletion } = useGetProfileCompletionQuery();
    const [updateProfileCompletion] = useUpdateProfileCompletionMutation();
    const [dataValue , setDataValue] = useState();
    const initialValues = {
        first_name: '',
        last_name: '',
        mobile: '',
        national_code: '',
        email:''


    }
     

    const handlerSubmit = async (values) => {
        
        if(values){
            const formData = new FormData();
         

            if (values.first_name)
                formData.append('first_name', values.first_name);
            if (values.last_name)
                formData.append('last_name', values.last_name);  
            if (values.national_code)
                formData.append('national_code', values.national_code);
                if (values.mobile)
                formData.append('mobile', values.mobile);
            if (values.email)
                formData.append('email', values.email);
            const data = await updateProfileCompletion(formData).unwrap();
            if(data?.status === 200 )
            router.push('/sales-proccess/address');

        }else{
            router.push('/sales-proccess/address');
        }
        
       

    }


    return (<>

        <PaymentContainer sidebar={
            <>
                <Sidebar  >
                    <section className={`flex justify-between items-center mb-1 pb-3 w-full`}>
                        <button 
                        onClick={()=>handlerSubmit(dataValue)}
                         disabled={profileCompletion?.user?.first_name && profileCompletion?.user?.last_name && profileCompletion?.user?.email &&profileCompletion?.user?.national_code && profileCompletion?.user?.mobile ?false :true }
                        type="submit" className={`bg-red-600 text-white rounded-lg  my-2  px-6 py-2  w-full`}> 
                        {profileCompletion?.user?.first_name && profileCompletion?.user?.last_name && profileCompletion?.user?.email &&profileCompletion?.user?.national_code && profileCompletion?.user?.mobile ?
                         ' تکمیل فرایند خرید' : 'ابتدا اطلاعات خود را تکمیل نمایید' } </button>

                    </section>
                </Sidebar>
            </>

        }>
            <PaymentContent title={' تکمیل پروفایل '} className={'w-full  '}>
                <section className="w-full">
                    <Formik
                        initialValues={initialValues}
                        onSubmit={(values) => setDataValue(values) }
                        validationSchema={ProfileCompletionSchema}
                    >
                        <Form>
                            <section className="flex justify-start items-center w-full">
                                {
                                    profileCompletion?.user?.first_name ? null :
                                     <Input title={'نام'} className={'w-full'} containerClass={'w-full basis-full'} name={'first_name'} placeholder={'مثل :محسن  '} />
                                }
                                {
                                    profileCompletion?.user?.last_name ? null :
                                        <Input title={' نام خانوادگی'} className={'w-full'} containerClass={'w-full basis-full'} name={'last_name'} placeholder={'مثل : اصلاحی'} />
                                }
                                {
                                    profileCompletion?.user?.email ? null :
                                        <Input title={'   ایمیل  '} type={'email'} className={'w-full'} containerClass={'w-full basis-full'} name={'email'} placeholder={'مثل : اصلاحی'} />

                                }
                                {
                                    profileCompletion?.user?.national_code ? null :
                                        <Input title={'    کد پستی  '} className={'w-full'} containerClass={'w-full basis-full'} name={'national_code'} placeholder={'مثل : اصلاحی'} />

                                }
                                {
                                    profileCompletion?.user?.mobile ? null :
                                        <Input title={' شماره موبایل '} className={'w-full'} containerClass={'w-full basis-full'} name={'mobile'} placeholder={'مثل :  09121111111'} />

                                }

                                
                            </section>

                        </Form>

                    </Formik>

                </section>


            </PaymentContent>


        </PaymentContainer>
    </>)
}
export default Payment;