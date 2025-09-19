'use client'
import { Button, Input } from "@/components/dashboard/inputs";
import PaymentContent from "@/components/shop/pages/payment/PaymentContent";
import PaymentMethod from "@/components/shop/pages/salesProccess/payment/PaymentMethod";
import Sidebar from "@/components/shop/pages/salesProccess/payment/Sidebar";
import { useAddCopanDiscountMutation, useGetPaymentDataQuery } from "@/services/customer/salesProccess/paymentApi";
import { setOrder } from "@/store/reducers/customer/paymentSlice";
import copanSchema from "@/validation/customer/salesProccess/copanValidation";
import { Form, Formik } from "formik";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const { default: PaymentContainer } = require("@/components/shop/pages/payment/PaymentContainer")

const Payment = () => {

    const dispatch = useDispatch();
    const { data: paymentData } = useGetPaymentDataQuery();
    const [copanDiscount] = useAddCopanDiscountMutation();
    const initialValues = {
        copan: '',

    }
    useEffect(() => {

        if (paymentData) {
            dispatch(setOrder(paymentData.order));
        }

    }, [paymentData, ])

    const handlerSubmit = async (values) => {
        const formData = new FormData();
        if (values.copan)
            formData.append('copan', values.copan);
        const data = await copanDiscount(formData).unwrap();

        console.log(data);
    }


    return (<>

        <PaymentContainer sidebar={
            <>
                <Sidebar />
            </>

        }>
            <PaymentContent title={' کد تخفیف '} className={'w-full  '}>
                <section className="w-full">
                    <Formik
                        initialValues={initialValues}
                        onSubmit={(values) => handlerSubmit(values)}
                        validationSchema={copanSchema}
                    >
                        <Form>
                            <section className="flex justify-start items-center w-full">
                                <Input title={'کد تخفیف'} className={'w-full'} containerClass={'w-full basis-full'} name={'copan'} placeholder={'مثل :welCome'} />
                                <Button type="submit" className="text-white bg-pallete px-4 py-1 rounded-lg h-auto">    ثبت کد  </Button>
                            </section>

                        </Form>

                    </Formik>

                </section>


            </PaymentContent>

            <PaymentMethod />

        </PaymentContainer>
    </>)
}
export default Payment;