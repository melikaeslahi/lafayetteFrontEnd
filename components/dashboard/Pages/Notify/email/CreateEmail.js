'use client'
 
import Button from '@/components/dashboard/inputs/Button'
import { useRouter } from 'next/navigation'
import TitlePage from '@/components/dashboard/TitlePage'
import {  useEffect } from 'react'
 
import { Editor, Input } from '@/components/dashboard/inputs'
 
import InputContainer from '@/components/dashboard/inputs/InputContainer'
import { useAddNewEmailMutation } from '@/lib/notify/EmailApi'
import EmailSchema from '@/validation/doshboard/notify/email/EmailValidation'
import JalaliDate from '@/components/dashboard/inputs/JalaliDate'
import { useDispatch  } from 'react-redux'
import { setErrorData ,setSuccessMessage} from '@/store/reducers/dashboard/UtilSlice'
const CreateEmail = () => {

    const router = useRouter();
    const dispatch =useDispatch();

    const initialValues = {
        subject: '',
        body: '',
        published_at: '',
        status: '',

    }
    const [addNewEmail, { data , isLoading: isSend ,isSuccess:Success }] =  useAddNewEmailMutation()
    useEffect(() => {
        dispatch(setErrorData(data)); 
        if(Success){
        dispatch(setSuccessMessage('ایمیل با موفقیت ایجاد شد.')); 
        }
    }, [data,  Success]);

    const handlerSubmit = async (values) => {

        // Create an object of formData
        const formData = new FormData();
        // Update the formData object
        formData.append("subject", values.subject);
        formData.append("body", values.body);   
        formData.append("published_at", values.published_at);
        formData.append("status", values.status);
       

        await addNewEmail(formData);

    }

    return (
        <>
            <TitlePage
                name="ایجاد  ایمیل"
                sitemapPage="بخش  اطلاع رسانی / ایمیل ها / ایجاد ایمیل"
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
                    ایجاد ایمیل
                </Button>
            </InputContainer>


        </>
    )
}
export default CreateEmail;