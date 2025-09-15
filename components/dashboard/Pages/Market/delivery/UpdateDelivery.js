'use client'
import Button from '@/components/dashboard/inputs/Button'
import { useRouter } from 'next/navigation'
import TitlePage from '@/components/dashboard/TitlePage'
import {   useEffect } from 'react'
import { useDispatch } from 'react-redux'
 
import {   Input  } from '@/components/dashboard/inputs'
import { setIsError, setIsLoading, setIsSuccess } from '@/store/reducers/dashboard/UtilSlice'
import InputContainer from '@/components/dashboard/inputs/InputContainer'
import { useGetDeliveryQuery, useUpdateDeliveryMutation } from '@/services/market/deliveryApi'
import DeliverySchema from '@/validation/doshboard/market/delivery/DeliveryValidation'
import { setErrorData ,setSuccessMessage} from '@/store/reducers/dashboard/UtilSlice'

const  UpdateDelivery = ({ params }) => {
    const { data:  delivery = {}, isLoading, isSuccess, isError } =  useGetDeliveryQuery(params);
    
 
    const router = useRouter();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setIsLoading(isLoading));
        dispatch(setIsSuccess(isSuccess));
        dispatch(setIsError(isError));
    }, [isLoading, isSuccess, isError])
  
    const initialValues = {
        name: `${delivery.data?.name}`,
        amount: `${delivery.data?.amount}`,
        delivery_time: `${delivery.data?.delivery_time}`,
        delivery_time_unit: `${delivery.data?.delivery_time_unit}`,
         
    }
    const [UpdateDelivery, { data , isLoading: isSend ,isSuccess:Success }] =  useUpdateDeliveryMutation()


    const handlerSubmit = async (values) => {
        // Create an object of formData
        let formData = new FormData();
        // Update the formData object
        formData.append('_method', 'PUT');
   
        formData.append("name", values.name);
        formData.append("amount", values.amount);
        formData.append("delivery_time", values.delivery_time);
        formData.append("delivery_time_unit", values.delivery_time_unit);

        
        await UpdateDelivery({ id: params, formData });
    }
 
    useEffect(() => {
        dispatch(setErrorData(data)); 
        if(Success){
        dispatch(setSuccessMessage('روش ارسال با موفقیت ویرایش شد.')); 
        }
    }, [data,  Success]);

    return (
        <>
            <TitlePage
                name="ویرایش  روش ارسال"
                sitemapPage=' بخش فروش /ویترین /   روش ارسال   /ویرایش    روش ارسال'            >
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
                validationSchema={DeliverySchema}
                handlerSubmit={handlerSubmit}>
                <Input name='name' title={' نام روش ارسال  '} type='text' placeholder={'    مثل :پست '} />
                <Input name='amount' title={'      هزینه  '} type='text' placeholder={'    مثل:20000تومان '} />
                <Input name='delivery_time' title={'      زمان ارسال  '} type='text' placeholder={'    مثل:3 '} />
                <Input name='delivery_time_unit' title={'      واحد زمان ارسال  '} type='text' placeholder={'    مثل: روز '} />

                <Button
                 disabled={isSend ? true : false}
                    type="submit"
                    className="text-white hover:bg-clifford hover:text-pallete bg-pallete py-4 px-8 basis-1/2 rounded-lg">
                    {' '}
                    ویرایش    روش ارسال
                </Button>
            </InputContainer>

        </>
    )
}
export default UpdateDelivery;
