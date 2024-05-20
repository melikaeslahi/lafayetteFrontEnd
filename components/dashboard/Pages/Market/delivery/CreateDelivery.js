'use client'
import Button from '@/components/dashboard/inputs/Button'
import { useRouter } from 'next/navigation'
import TitlePage from '@/components/dashboard/TitlePage' 
import {   useEffect } from 'react'
 
import {   Input  } from '@/components/dashboard/inputs'
 
import InputContainer from '@/components/dashboard/inputs/InputContainer'
import { useAddNewDeliveryMutation } from '@/lib/market/deliveryApi'
import DeliverySchema from '@/validation/doshboard/market/delivery/DeliveryValidation'
import { useDispatch  } from 'react-redux'
import { setErrorData ,setSuccessMessage} from '@/store/reducers/dashboard/UtilSlice'


const CreateDelivery = () => {
    const dispatch =useDispatch();
    const router = useRouter(); 
    const initialValues = {
         name: '',
         amount: '',
         delivery_time: '',
         delivery_time_unit: '',
       
    }
    const [addNewDelivery, { data , isLoading: isSend ,isSuccess:Success }] =  useAddNewDeliveryMutation()
    useEffect(() => {
        dispatch(setErrorData(data)); 
        if(Success){
        dispatch(setSuccessMessage('روش ارسال با موفقیت ایجاد شد.')); 
        }
    }, [data,  Success]);

    const handlerSubmit = async (values) => {

        // Create an object of formData
        const formData = new FormData();
        // Update the formData object
       
        formData.append("name", values.name);
        formData.append("amount", values.amount);
        formData.append("delivery_time", values.delivery_time);
        formData.append("delivery_time_unit", values.delivery_time_unit);

        await addNewDelivery(formData);

    }

    return (
        <>
            <TitlePage
                name="ایجاد روش ارسال"
                sitemapPage='بخش فروش /ویترین /   روش ارسال   /ایجاد ارسال'
            >
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
                ایجاد روش ارسال 
            </Button>

            </InputContainer>

        </>
    )
}
export default CreateDelivery;