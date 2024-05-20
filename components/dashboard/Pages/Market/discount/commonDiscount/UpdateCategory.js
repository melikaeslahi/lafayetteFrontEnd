'use client'
import Button from '@/components/dashboard/inputs/Button'
import { useRouter } from 'next/navigation'
import TitlePage from '@/components/dashboard/TitlePage'
import {   useEffect } from 'react'
import { useDispatch } from 'react-redux'
 
import {  Input  } from '@/components/dashboard/inputs'
import { setIsError, setIsLoading, setIsSuccess } from '@/store/reducers/dashboard/UtilSlice'
import InputContainer from '@/components/dashboard/inputs/InputContainer'
import { useGetCommonDiscountQuery, useUpdateCommonDiscountMutation } from '@/lib/market/commonDiscountApi'
import JalaliDate from '@/components/dashboard/inputs/JalaliDate'
import CommonDiscountSchema from '@/validation/doshboard/market/discount/commonDiscount/CommonDiscontValidation'
import { setErrorData ,setSuccessMessage} from '@/store/reducers/dashboard/UtilSlice'
const UpdateCommonDiscount = ({ params }) => {
    const { data:  commonDiscount = {}, isLoading, isSuccess, isError } =  useGetCommonDiscountQuery(params);
   
 
    const router = useRouter();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setIsLoading(isLoading));
        dispatch(setIsSuccess(isSuccess));
        dispatch(setIsError(isError));
    }, [isLoading, isSuccess, isError])
 
    const initialValues = {
        title: `${commonDiscount.data?.title}`,
        percentage: `${commonDiscount.data?.percentage}`,
       
        discount_ceiling: `${commonDiscount.data?.discount_ceiling}`,
        minimal_order_amount: `${commonDiscount.data?.minimal_order_amount}`,
        status: `${commonDiscount.data?.status}`,
        start_date: `${commonDiscount.data?.start_date}`,
        end_date: `${commonDiscount.data?.end_date}`
    }
    const [UpdateCommonDiscount, { data , isLoading: isSend ,isSuccess:Success }] =  useUpdateCommonDiscountMutation()


    const handlerSubmit = async (values) => {
        // Create an object of formData
        let formData = new FormData();
        // Update the formData object
        formData.append('_method', 'PUT');
  
        formData.append("title", values.title);
        formData.append("percentage", values.percentage);
        formData.append("discount_ceiling", values.discount_ceiling);
        formData.append("minimal_order_amount", values.minimal_order_amount);
        formData.append("status", values.status);
        formData.append("start_date", values.start_date);
        formData.append("end_date", values.end_date);
        await UpdateCommonDiscount({ id: params, formData });
    }
 
    useEffect(() => {
        dispatch(setErrorData(data)); 
        if(Success){
        dispatch(setSuccessMessage('تخفیف با موفقیت ویرایش شد.')); 
        }
    }, [data, Success]);

    return (
        <>
            <TitlePage
                name="ویرایش  تخفیف عمومی"
                sitemapPage=' بخش فروش /ویترین / تخفیف ها   ها /ویرایش    تخفیف عمومی'            >
                <button
                    type="button"
                    onClick={() => { router.back() }}
                    className=" py-4 px-8 bg-pallete rounded text-white" >
                    {' '}
                    بازگشت
                </button>
            </TitlePage>
            <InputContainer  
                initialValues={initialValues}
                validationSchema={CommonDiscountSchema}
                handlerSubmit={handlerSubmit}>
                <Input name='title' title={'عنوان تخفیف'} type='text' placeholder={' مثل : تخفیف پاییز'} />
                <Input name='percentage' title={' درصد  تخفیف'} type='text' placeholder={' مثل : ٪20'} />
                <Input name='discount_ceiling' title={'حداکثر مبلغ تخفیف'} type='text' placeholder={' مثل : 20000'} />
                <Input name='minimal_order_amount' title={'سقف خرید کاربر'} type='text' placeholder={' مثل : 20000'} />
                <Input name='status' title={'وضعیت'} select={'select'} className={'text-left'} >
                    <>
                        <option value=''> اتتخاب  وضعیت  </option>
                        <option value='1'>  فعال     </option>
                        <option value='0'>   غیر فعال     </option>
                    </>
                </Input>

                <JalaliDate name={'start_date'} placeHolder={'تاریخ شروع'} title={'تاریخ شروع'} />
                <JalaliDate name={'end_date'} placeHolder={'تاریخ  پایان'} title={'تاریخ پایان'} />
                <Button
                 disabled={isSend ? true : false}
                    type="submit"
                    className="text-white hover:bg-clifford hover:text-pallete bg-pallete py-4 px-8 basis-1/2 rounded-lg">
                    {' '}
                    ویرایش   تخفیف
                </Button>
            </InputContainer>

        </>
    )
}
export default UpdateCommonDiscount;
