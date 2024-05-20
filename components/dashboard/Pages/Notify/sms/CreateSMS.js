'use client'
 
import Button from '@/components/dashboard/inputs/Button'
import { useRouter } from 'next/navigation'
import TitlePage from '@/components/dashboard/TitlePage'
import {  useEffect } from 'react'
 
import { Editor, Input } from '@/components/dashboard/inputs'
 
import InputContainer from '@/components/dashboard/inputs/InputContainer'
import JalaliDate from '@/components/dashboard/inputs/JalaliDate'
import { useAddNewSMSMutation } from '@/lib/notify/SMSApi'
import SMSSchema from '@/validation/doshboard/notify/sms/SMSValidation'
import { useDispatch  } from 'react-redux'
import { setErrorData ,setSuccessMessage} from '@/store/reducers/dashboard/UtilSlice'
const CreateSMS = () => {
 
    const router = useRouter();
    const dispatch =useDispatch();
 
 
    const initialValues = {
        title: '',
        body: '',
        published_at: '',
        status: '',
     
    }
    const [addNewSMS, { data  , isLoading: isSend ,isSuccess:Success}] =  useAddNewSMSMutation()
    useEffect(() => {
        dispatch(setErrorData(data)); 
        if(Success){
        dispatch(setSuccessMessage(' پیام با موفقیت ایجاد شد.')); 
        }
    }, [data,  Success]);

    const handlerSubmit = async (values) => {

        // Create an object of formData
        const formData = new FormData();
        // Update the formData object
        formData.append("title", values.title);
        formData.append("body", values.body);
   
        formData.append("published_at", values.published_at);
        formData.append("status", values.status);
      

        await addNewSMS(formData);

    }

    return (
        <>
            <TitlePage
                name="ایجاد    پیام"
                sitemapPage="بخش  اطلاع رسانی /    پیام  ها / ایجاد    پیام"
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
               <Input name='title' title={'   موضوع'} type='text' placeholder={'نام دسته یندی'} />
               
                 
        
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
                    ایجاد    پیام
                </Button>
            </InputContainer>


        </>
    )
}
export default CreateSMS;