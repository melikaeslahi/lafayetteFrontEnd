'use client'
import Button from '@/components/dashboard/inputs/Button'
import { useRouter } from 'next/navigation'
import TitlePage from '@/components/dashboard/TitlePage'
import {   useEffect } from 'react'
import { useDispatch } from 'react-redux'
 
import { Input, InputFrame, InputTags, SelectImage } from '@/components/dashboard/inputs'
import { setIsError, setIsLoading, setIsSuccess } from '@/store/reducers/dashboard/UtilSlice'
import InputContainer from '@/components/dashboard/inputs/InputContainer' 
import { useGetBrandQuery, useUpdateBrandMutation } from '@/services/market/brandApi'
import EditBrandSchema from '@/validation/doshboard/market/brand/editBrandValidation' 
import { setErrorData ,setSuccessMessage} from '@/store/reducers/dashboard/UtilSlice'
const UpdateBrand = ({ params }) => {
    const { data: brand = {}, isLoading, isSuccess, isError } =   useGetBrandQuery(params.id);
   
  
    const router = useRouter();
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(setIsLoading(isLoading));
        dispatch(setIsSuccess(isSuccess));
        dispatch(setIsError(isError));     
     } , [isLoading ,isSuccess ,isError])
  
    const initialValues = {
        persian_name: `${brand.data?.persian_name}`,
        original_name: `${brand.data?.original_name}`,
        logo: '', 
        status: `${brand.data?.status}`,
        tags: `${brand.data?.tags}`
    }
    const [UpdateBrand, { data , isLoading: isSend ,isSuccess:Success }] =   useUpdateBrandMutation()

  
    const handlerSubmit = async (values) => {
        // Create an object of formData
        let formData = new FormData();
        // Update the formData object
        formData.append('_method', 'PUT');
        if (values.logo) {
            formData.append("logo", values.logo);
        }
        formData.append("persian_name", values.persian_name);
        formData.append("original_name", values.original_name);
        formData.append("status", values.status);
        formData.append("tags", values.tags);
        if (values.currentImage) {
            formData.append("currentImage", values.currentImage);
        }
        await UpdateBrand({ id: params.id, formData });
    }
   
    useEffect(() => {
        dispatch(setErrorData(data)); 
        if(Success){
        dispatch(setSuccessMessage(' برند با موفقیت ویرایش شد.')); 
        }
    }, [data,  Success]);

    return (
        <>
            <TitlePage
                name="ویرایش برند"
                sitemapPage=' بخش فروش /ویترین /  برندها  /ویرایش برند' >
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
                    validationSchema={EditBrandSchema}
                    handlerSubmit={handlerSubmit}>
                    <Input name='persian_name' title={'نام فارسی برند'} type='text' />
                    <Input name='original_name' title={'نام اصلی برند'} type='text' />

                    <InputTags name='tags' placeHolder={'برچسب ها'} editTags={brand.data?.tags} title="برچسب ها" />
            

                    <Input name='status' title={'وضعیت'} select={'select'} className={'text-left'} >
                        <>
                            <option value=''> اتتخاب  وضعیت  </option>
                            <option value='1'>  فعال     </option>
                            <option value='0'>   غیر فعال     </option>
                        </>
                    </Input>
                   
                    {  brand.data?.logo && <InputFrame name='currentImage' title='انتخاب سایز تصویر' >
                        <SelectImage image={brand.data?.logo} />
                    </InputFrame>
                    }
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
                  ویرایش برند     
                    </Button>
                </InputContainer>
            
             
        </>
    )
}
export default UpdateBrand;
