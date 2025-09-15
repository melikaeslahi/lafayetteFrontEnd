'use client'
import Button from '@/components/dashboard/inputs/Button'
import { useRouter } from 'next/navigation'
import TitlePage from '@/components/dashboard/TitlePage'
import {  useEffect } from 'react'
 
import {   Input  } from '@/components/dashboard/inputs'

import InputContainer from '@/components/dashboard/inputs/InputContainer'
import { useAddNewProductColorMutation } from '@/services/market/productColorApi'
import CreateProductColorSchema from '@/validation/doshboard/market/productColor/createProductColorValidation'

import { useDispatch  } from 'react-redux'
import { setErrorData ,setSuccessMessage} from '@/store/reducers/dashboard/UtilSlice'
import { useAddNewProductSizeMutation } from '@/services/market/productSizeApi'

const CreateProductSize = ({ params }) => {

    const router = useRouter();
    const dispatch =useDispatch();
 

    const initialValues = {
        size_name: '',
        size: '',
        price_increase: '',

    }
    const [addNewProductSize, { data , isLoading: isSend ,isSuccess:Success }] =  useAddNewProductSizeMutation()
    useEffect(() => {
        dispatch(setErrorData(data)); 
        if(Success){
        dispatch(setSuccessMessage(' سایز با موفقیت اضافه شد.')); 
        }
    }, [data,  Success]);

    const handlerSubmit = async (values) => {
        const formData = new FormData();
        formData.append("size", values.color);
        formData.append("size_name", values.color_name);
        if (values.price_increase) {
            formData.append("price_increase", values.price_increase);
        }
        await addNewProductSize({ params, formData });

    }

    return (
        <>
            <TitlePage
                name="ایجاد  سایز "
                sitemapPage='بخش فروش /ویترین /   محصولات/ سایز ها  /ایجاد    سایز'
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
                validationSchema={CreateProductColorSchema}
                handlerSubmit={handlerSubmit}>

                <Input name='size_name' title={' نام سایز '} type='text' placeholder={' مثل: lg '} />
                <Input name='size' title={'کد سایز'} type='text' placeholder={' مثل: #hffggf '} />
                <Input name='price_increase' title={'افزایش قیمت'} type='text' placeholder={' مثل:12000 '} />







                <Button
                 disabled={isSend ? true : false}
                    type="submit"
                    className="text-white hover:bg-clifford hover:text-pallete bg-pallete py-4 px-8 basis-1/2 rounded-lg">
                    {' '}
                    ایجاد  سایز
                </Button>

            </InputContainer>

        </>
    )
}
export default CreateProductSize;