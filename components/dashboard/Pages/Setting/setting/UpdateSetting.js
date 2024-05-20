'use client'
import Button from '@/components/dashboard/inputs/Button'
import { useRouter } from 'next/navigation'
import TitlePage from '@/components/dashboard/TitlePage'
import {   useEffect } from 'react'
import { useDispatch } from 'react-redux'
 
import { Editor, Input, InputFrame, InputTags, SelectImage } from '@/components/dashboard/inputs'
 
import { setIsError, setIsLoading, setIsSuccess } from '@/store/reducers/dashboard/UtilSlice'
import InputContainer from '@/components/dashboard/inputs/InputContainer'
import EditSettingSchema from '@/validation/doshboard/setting/editSettingValidation'
import { useGetSettingQuery, useUpdateSettingMutation } from '@/lib/setting/settingApi'
 
import { setErrorData ,setSuccessMessage} from '@/store/reducers/dashboard/UtilSlice'

const UpdateSetting = ({ params }) => {
    const { data:  setting = {}, isLoading, isSuccess, isError } =  useGetSettingQuery(params);
 
 
    const router = useRouter();
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(setIsLoading(isLoading));
        dispatch(setIsSuccess(isSuccess));
        dispatch(setIsError(isError));     
     } , [isLoading ,isSuccess ,isError])
   
    const initialValues = {
        title: `${setting.data?.title}`,
        keywords: `${setting.data?.keywords}`,
        logo: '',
        icon: '',
        description: `${setting.data?.description}`,
         
    }
    const [UpdateSetting, { data  , isLoading: isSend ,isSuccess:Success}] =  useUpdateSettingMutation()

  
    const handlerSubmit = async (values) => {
        // Create an object of formData
        let formData = new FormData();
        // Update the formData object
        formData.append('_method', 'PUT');
        if (values.logo) {
            formData.append("logo", values.logo);
        }
        if (values.icon) {
            formData.append("icon", values.icon);
        }
        formData.append("title", values.title);
       
        formData.append("description", values.description);
        formData.append("keywords", values.keywords);
   

     
        if (values.currentImage) {
            formData.append("currentImage", values.currentImage);
        }
        await UpdateSetting({ id: params, formData });
    }
 
    useEffect(() => {
        dispatch(setErrorData(data)); 
        if(Success){
        dispatch(setSuccessMessage(' تنظیمات با موفقیت ویرایش شد.')); 
        }
    }, [data, Success]);

    return (
        <>
            <TitlePage
                name=" تنظیمات"
                sitemapPage=' تنضیمات /ویرایش تنظیمات' >
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
                    validationSchema={EditSettingSchema}
                    handlerSubmit={handlerSubmit}>
                    <Input name='title' title={' عنوان '} type='text' />
                    <InputTags name='keywords' placeHolder={'   کلمات کلیدی'} editTags={setting.data?.keywords} title=" تنظیمات" />
                    

                    
                   
                    {  setting.data?.logo && <InputFrame name='currentImage' title='انتخاب سایز  لوگو' >
                        <SelectImage image={setting.data.logo} />
                    </InputFrame>
                    }
                    {  setting.data?.icon && <InputFrame name='currentImage' title='انتخاب سایز آیکون' >
                        <SelectImage image={setting.data.icon} />
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
                    <Input name={'icon'} title={'آیکون'} >
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
                    <Editor name='description' title='   توضیحات ' />
                    <Button
                     disabled={isSend ? true : false}
                        type="submit"
                        className="text-white hover:bg-clifford hover:text-pallete bg-pallete py-4 px-8 basis-1/2 rounded-lg">
                        {' '}
                        ویرایش تنظیمات
                    </Button>
                </InputContainer>
         
        </>
    )
}
export default UpdateSetting;
