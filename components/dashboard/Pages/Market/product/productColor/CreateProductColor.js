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

const CreateProductColor = ({ params }) => {

    const router = useRouter();
    const dispatch =useDispatch();
 

    const initialValues = {
        color_name: '',
        color: '',
        price_increase: '',

    }
    const [addNewProductColor, { data , isLoading: isSend ,isSuccess:Success }] = useAddNewProductColorMutation()
    useEffect(() => {
        dispatch(setErrorData(data)); 
        if(Success){
        dispatch(setSuccessMessage(' رنگ با موفقیت اضافه شد.')); 
        }
    }, [data,  Success]);

    const handlerSubmit = async (values) => {
        const formData = new FormData();
        formData.append("color", values.color);
        formData.append("color_name", values.color_name);
        if (values.price_increase) {
            formData.append("price_increase", values.price_increase);
        }
        await addNewProductColor({ params, formData });

    }

    return (
        <>
            <TitlePage
                name="ایجاد  رنگ "
                sitemapPage='بخش فروش /ویترین /   محصولات/ رنگ ها  /ایجاد    رنگ'
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

                <Input name='color_name' title={' نام رنگ '} type='text' placeholder={' مثل:قرمز '} />
                <Input name='color' title={'کد رنگ'} type='text' placeholder={' مثل: #hffggf '} />
                <Input name='price_increase' title={'افزایش قیمت'} type='text' placeholder={' مثل:12000 '} />







                <Button
                 disabled={isSend ? true : false}
                    type="submit"
                    className="text-white hover:bg-clifford hover:text-pallete bg-pallete py-4 px-8 basis-1/2 rounded-lg">
                    {' '}
                    ایجاد  رنگ
                </Button>

            </InputContainer>

        </>
    )
}
export default CreateProductColor;