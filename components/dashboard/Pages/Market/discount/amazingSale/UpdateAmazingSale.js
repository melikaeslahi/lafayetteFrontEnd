'use client'
import Button from '@/components/dashboard/inputs/Button'
import { useRouter } from 'next/navigation'
import TitlePage from '@/components/dashboard/TitlePage'
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import {   Input  } from '@/components/dashboard/inputs'
import { setIsError, setIsLoading, setIsSuccess } from '@/store/reducers/dashboard/UtilSlice'
import InputContainer from '@/components/dashboard/inputs/InputContainer' 
import AmazingSaleSchema from '@/validation/doshboard/market/discount/AmazingSale/AmazingSaleValidation'
import JalaliDate from '@/components/dashboard/inputs/JalaliDate'
import { useGetAmazingSaleQuery, useGetProductsQuery, useUpdateAmazingSaleMutation } from '@/lib/market/amazingSaleApi'
import { setErrorData ,setSuccessMessage} from '@/store/reducers/dashboard/UtilSlice'
const UpdateAmazingSale = ({ params }) => {
    const { data: amazingsale = {}, isLoading, isSuccess, isError } =  useGetAmazingSaleQuery(params);
    const { data: products = [] } =  useGetProductsQuery();
   
 
    const router = useRouter();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setIsLoading(isLoading));
        dispatch(setIsSuccess(isSuccess));
        dispatch(setIsError(isError));
    }, [isLoading, isSuccess, isError])
 
    const initialValues = {
        product_id: `${amazingsale.data?.product_id ? amazingsale.data?.product_id :''}`,
        percentage: `${amazingsale.data?.percentage}`,
        status: `${amazingsale.data?.status}`,
        start_date: `${amazingsale.data?.start_date}`,
        end_date: `${amazingsale.data?.end_date}`

    }
    const [UpdateAmazingSale, { data , isLoading: isSend ,isSuccess:Success }] =   useUpdateAmazingSaleMutation()


    const handlerSubmit = async (values) => {
        // Create an object of formData
        let formData = new FormData();
        // Update the formData object
        formData.append('_method', 'PUT');
        formData.append("product_id", values.product_id);
        formData.append("percentage", values.percentage);  
        formData.append("status", values.status);
        formData.append("start_date", values.start_date);
        formData.append("end_date", values.end_date);

        await UpdateAmazingSale({ id: params, formData });
    }
  
    useEffect(() => {
        dispatch(setErrorData(data)); 
        if(Success){
        dispatch(setSuccessMessage(' تخفیف با موفقیت ویرایش شد.')); 
        }
    }, [data,  Success]);

    return (
        <>
            <TitlePage
                name="ویرایش  تخفیف"
                sitemapPage=' بخش فروش /ویترین /   تخفیف ها  /  فروش فوق العاده / ویرایش تخفیف'            >
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
                validationSchema={AmazingSaleSchema}
                handlerSubmit={handlerSubmit}>
                 
                <Input name='percentage' title={' درصد  تخفیف'} type='text' placeholder={' مثل : ٪20'} />
                <Input name='product_id' title={'  نام محصول    '} select={'select'} className={'text-left'} >
                    <>
                        <option> اتتخاب والد  </option>

                        {products.products?.map(({ id, name }) => (
                            <option key={id} value={id} >
                                {' '}
                                {name}{' '}
                            </option>
                        ))}
                    </>
                </Input>

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
                    ویرایش تخفیف
                </Button>
            </InputContainer>

        </>
    )
}
export default UpdateAmazingSale;
