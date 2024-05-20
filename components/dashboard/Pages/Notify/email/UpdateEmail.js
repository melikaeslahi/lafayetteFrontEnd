'use client'
import Button from '@/components/dashboard/inputs/Button'
import { useRouter } from 'next/navigation'
import TitlePage from '@/components/dashboard/TitlePage'
import {   useEffect } from 'react'
 
 
import { Editor, Input  } from '@/components/dashboard/inputs'
 
import InputContainer from '@/components/dashboard/inputs/InputContainer'
import { setIsError, setIsLoading, setIsSuccess } from '@/store/reducers/dashboard/UtilSlice'
import { useDispatch } from 'react-redux'
import { useGetEmailQuery, useUpdateEmailMutation } from '@/lib/notify/EmailApi'
import EmailSchema from '@/validation/doshboard/notify/email/EmailValidation'
import JalaliDate from '@/components/dashboard/inputs/JalaliDate'
 
import { setErrorData ,setSuccessMessage} from '@/store/reducers/dashboard/UtilSlice'

const UpdateEmail = ({ params }) => {
    const { data:  email = {}, isLoading, isSuccess, isError } =  useGetEmailQuery(params);
 
 
    const router = useRouter();
    const dispatch = useDispatch();
    useEffect(()=>{
       dispatch(setIsLoading(isLoading));
       dispatch(setIsSuccess(isSuccess));
       dispatch(setIsError(isError));     
    } , [ isLoading ,isSuccess ,isError])

  
    const initialValues = {
        subject: `${email.data?.subject}`,
        body: `${email.data?.body}`,
         published_at: `${email.data?.published_at}`,
        status: `${email.data?.status}`,
       
    }
    const [UpdateEmail, { data  , isLoading: isSend ,isSuccess:Success}] =  useUpdateEmailMutation()
    const handlerSubmit = async (values) => {
        // Create an object of formData
        let formData = new FormData();
        // Update the formData object
        formData.append('_method', 'PUT');
        formData.append("subject", values.subject);
        formData.append("body", values.body);
   
        formData.append("status", values.status);
        formData.append("published_at", values.published_at);
   
        await UpdateEmail({ id: params, formData });
    }
 
    useEffect(() => {
        dispatch(setErrorData(data)); 
        if(Success){
        dispatch(setSuccessMessage('ایمیل با موفقیت ویرایش شد.')); 
        }
    }, [data, Success]);

    return (
        <>
            <TitlePage
                name="   ویرایش ایمیل  "
                sitemapPage=" بخش  اطلاع رسانی / ایمیل   ها / ویرایش    ایمیل "
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
                validationSchema={EmailSchema}
                handlerSubmit={handlerSubmit} >
            
            <Input name='subject' title={'   موضوع'} type='text' placeholder={'نام دسته یندی'} />
               
                 
        
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
                    ویرایش    ایمیل
                </Button>
                
             

            </InputContainer>

        </>
    )
}
export default UpdateEmail;
