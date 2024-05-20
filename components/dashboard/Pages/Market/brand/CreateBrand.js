'use client'
import Button from '@/components/dashboard/inputs/Button'
import { useRouter } from 'next/navigation'
import TitlePage from '@/components/dashboard/TitlePage'
import {  useEffect } from 'react'
 
import { Input, InputTags } from '@/components/dashboard/inputs'
import InputContainer from '@/components/dashboard/inputs/InputContainer'
import { useAddNewBrandMutation } from '@/lib/market/brandApi'
import CreateBrandSchema from '@/validation/doshboard/market/brand/createBrandValidation'
import { useDispatch  } from 'react-redux'
import { setErrorData ,setSuccessMessage} from '@/store/reducers/dashboard/UtilSlice'


const CreateBrand = () => {
    const dispatch =useDispatch();
    const router = useRouter();
    const initialValues = {
        persian_name: '',
        original_name: '',
        logo: '',
        status: '',
        tags: ''
    }
    const [addNewBrand, { data , isLoading: isSend ,isSuccess:Success }] = useAddNewBrandMutation()
    useEffect(() => {
        dispatch(setErrorData(data)); 
        if(Success){
        dispatch(setSuccessMessage(' برند با موفقیت ایجاد شد.')); 
        }
    }, [data,  Success]);

    const handlerSubmit = async (values) => {

        // Create an object of formData
        const formData = new FormData();
        // Update the formData object
        formData.append("logo", values.logo);
        formData.append("persian_name", values.persian_name);
        formData.append("original_name", values.persian_name);
        formData.append("status", values.status);
        formData.append("tags", values.tags);

        await addNewBrand(formData);

    }

    return (
        <>
            <TitlePage
                name="ایجاد برند"
                sitemapPage='بخش فروش /ویترین /   برند ها /ایجاد برند'
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
                validationSchema={CreateBrandSchema}
                handlerSubmit={handlerSubmit}>

                <Input name='persian_name' title={'نام فارسی'} type='text' placeholder={' مثل:سامسونگ'} />
                <Input name='original_name' title={'نام  اصلی'} type='text' placeholder={' مثل: sumsung'} />

                <InputTags name='tags' placeHolder={'برچسب ها'} title="برچسب ها" />
                
                <Input name='status' title={'وضعیت'} select={'select'} className={'text-left'} >
                    <>
                        <option value=''> اتتخاب  وضعیت  </option>
                        <option value='1'>  فعال     </option>
                        <option value='0'>   غیر فعال     </option>
                    </>
                </Input>
                 
                <Input name={'logo'} title={'لوگو'} >
                    {({ field, form }) => {
                        return (
                            <>
                                <input type='file'
                                    accept='image/*'
                                    onChange={(event) => {
                                        form.setFieldValue(field.name, event.target.files[0])
                                    }}
                                />
                            </>
                        )
                    }}
                </Input>
           
                <Button
                 disabled={isSend ? true : false}
                    type="submit"
                    className="text-white hover:bg-clifford hover:text-pallete bg-pallete py-4 px-8 basis-1/2 rounded-lg">
                    {' '}
                    ایجاد برند
                </Button>

            </InputContainer>

        </>
    )
}
export default CreateBrand;