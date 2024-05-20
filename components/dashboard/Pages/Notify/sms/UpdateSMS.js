'use client'
import Button from '@/components/dashboard/inputs/Button'
import { useRouter } from 'next/navigation'
import TitlePage from '@/components/dashboard/TitlePage'
import {   useEffect } from 'react'
import { Editor, Input  } from '@/components/dashboard/inputs'
import InputContainer from '@/components/dashboard/inputs/InputContainer'
import { setIsError, setIsLoading, setIsSuccess } from '@/store/reducers/dashboard/UtilSlice'
import { useDispatch } from 'react-redux'
import JalaliDate from '@/components/dashboard/inputs/JalaliDate'
import { useGetSMSQuery, useUpdateSMSMutation } from '@/lib/notify/SMSApi'
import SMSSchema from '@/validation/doshboard/notify/sms/SMSValidation'
import { useDispatch  } from 'react-redux'
import { setErrorData ,setSuccessMessage} from '@/store/reducers/dashboard/UtilSlice'

const UpdateSMS = ({ params }) => {
    const { data:  sms = {}, isLoading, isSuccess, isError } =  useGetSMSQuery(params);
 
 
    const router = useRouter();
    const dispatch = useDispatch();
    useEffect(()=>{
       dispatch(setIsLoading(isLoading));
       dispatch(setIsSuccess(isSuccess));
       dispatch(setIsError(isError));     
    } , [ isLoading ,isSuccess ,isError])

     
    const initialValues = {
        title: `${sms.data?.title}`,
        body: `${sms.data?.body}`,
        published_at: `${sms.data?.published_at}`,
        status: `${sms.data?.status}`,
       
    }
    const [UpdateSMS, { data , isLoading: isSend ,isSuccess:Success }] =   useUpdateSMSMutation()
    const handlerSubmit = async (values) => {
        // Create an object of formData
        let formData = new FormData();
        // Update the formData object
        formData.append('_method', 'PUT');
      
        formData.append("title", values.title);
      
        formData.append("body", values.body);
        formData.append("status", values.status);
        formData.append("published_at", values.published_at);
       
        await UpdateSMS({ id: params, formData });
    }
 
    useEffect(() => {
        dispatch(setErrorData(data)); 
        if(Success){
        dispatch(setSuccessMessage('پیام با موفقیت ویرایش شد.')); 
        }
    }, [data,  Success]);

    return (
        <>
            <TitlePage
                name="   ویرایش پیام"
                sitemapPage=" بخش  اطلاع رسانی /    پیام ها / ویرایش    پیام "
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
                validationSchema={SMSSchema}
                handlerSubmit={handlerSubmit} >
           
           <Input name='title' title={' عنوان'} type='text' placeholder={'نام دسته یندی'} />
               
                 
        
               <Input name='status' title={'وضعیت'} select={'select'} className={'text-left'} >
                   <>
                       <option value=''> اتتخاب  وضعیت  </option>
                       <option value='1'>  فعال     </option>
                       <option value='0'>   غیر فعال     </option>
                   </>
               </Input>

               <JalaliDate name={'published_at'} placeHolder={'تاریخ انتشار'} title={'تاریخ انتشار'} />
               <Editor name='body' title='   توضیحات ' />
                <Button
                 disabled={isSend ? true : false}
                    type="submit"
                    className="text-white hover:bg-clifford hover:text-pallete bg-pallete py-4 px-8 basis-1/2 rounded-lg">
                    {' '}
                    ویرایش    پیام
                </Button>
                
             

            </InputContainer>

        </>
    )
}
export default UpdateSMS;
