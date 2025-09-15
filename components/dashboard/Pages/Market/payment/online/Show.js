'use client'
import { useRouter } from 'next/navigation'
import TitlePage from '@/components/dashboard/TitlePage'
import { useEffect } from 'react'
import {  setIsError, setIsLoading, setIsSuccess, setItemLength } from "@/store/reducers/dashboard/UtilSlice";
import InputContainer from '@/components/dashboard/inputs/InputContainer'
import { useGetPaymentQuery } from '@/services/market/paymentApi'
import { useDispatch } from 'react-redux'



const  ShowPayment = ({params}) => {
    const { data:  payment = [] , isLoading , isSuccess , isError } =  useGetPaymentQuery(params);
    const router = useRouter();
    const dispatch =  useDispatch();
 

    useEffect(() => {

        dispatch(setIsLoading(isLoading));
        dispatch(setIsSuccess(isSuccess));
        dispatch(setIsError(isError));
        dispatch(setItemLength(payment.data?.length));

    }, [isLoading, isSuccess, isError, payment ])

    return (
        <>
            <TitlePage
                name="  نمایش پرداخت"
                sitemapPage='بخش فروش /ویترین /     پرداخت ها /     نمایش پرداخت'
            >
                <button
                    type="button"
                    onClick={() => { router.back() }}
                    className=" py-4 px-8 bg-pallete rounded text-white" >
                    {' '}
                    بازگشت
                </button>
            </TitlePage>



            <InputContainer>

                <section className='flex flex-col items-center justify-center  w-96 shadow-md shadow-pallete p-5 m-5 '>

                    <h1 className='text-pallete text-lg'>     پرداخت کننده: {payment.data?.user_id.first_name ? payment.data?.user_id.first_name + ' ' + payment.data?.user_id.last_name : '-'}   </h1>
                    <h3>    مبلغ: {payment.data?.payments.amount ?payment.data?.payments.amount  : '-' }    </h3>
                    <p>  بانک: {payment.data?.payments.gateway ?payment.data?.payments.gateway  : '-' }    </p>
                    <p>   شماره پرداخت  :{payment.data?.payments.transaction_id?payment.data?.payments.transaction_id :'-'}  </p>
                    <p>   تاریخ پرداخت  :{payment.data?.payments.pay_date?payment.data?.payments.pay_date : '-'}  </p>
                    <p>    دریافت کننده پرداخت  :{payment.data?.payments.pay_date?payment.data?.payments.pay_date : '-'}  </p>

                </section>
            </InputContainer>





        </>
    )
}
export default ShowPayment;