'use client'
import Button from '@/components/dashboard/inputs/Button'
import { useRouter } from 'next/navigation'
import TitlePage from '@/components/dashboard/TitlePage'
import {   useEffect } from 'react'
 
import { Editor, Input, InputTags } from '@/components/dashboard/inputs'
import InputContainer from '@/components/dashboard/inputs/InputContainer'
import CreateFaqSchema from '@/validation/doshboard/content/faq/createFaq'
import { useAddNewFaqMutation } from '@/lib/content/faqApi'
import { useDispatch  } from 'react-redux'
import { setErrorData ,setSuccessMessage} from '@/store/reducers/dashboard/UtilSlice'
const CreateFaq = () => {
  
    const router = useRouter();
    const dispatch =useDispatch();
    const initialValues = {
        question: '',
        answer: '',
        status: '',
        tag: ''
    }
    const [addNewFaq, { data , isLoading: isSend ,isSuccess:Success }] =  useAddNewFaqMutation()
    useEffect(() => {
        dispatch(setErrorData(data)); 
        if(Success){
        dispatch(setSuccessMessage(' سوال با موفقیت ایجاد شد.')); 
        }
    }, [data,  Success]);

    const handlerSubmit = async (values) => {

        // Create an object of formData
        const formData = new FormData();
        // Update the formData object
  
        formData.append("question", values.answer);
        formData.append("answer", values.answer);
        formData.append("status", values.status);
        formData.append("tag", values.tag);

        await addNewFaq(formData);

    }

    return (
        <>
            <TitlePage
                name="ایجاد سوال"
                sitemapPage="بخش محتوایی /   سوالات متداول  / ایجاد سوال"
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
                validationSchema={CreateFaqSchema}
                handlerSubmit={handlerSubmit} >
               
                <InputTags name='tag' placeHolder={'برچسب ها'} title="برچسب ها" />
              
                <Input name='status' title={'وضعیت'} select={'select'} className={'text-left'} >
                    <>
                        <option value=''> اتتخاب  وضعیت  </option>
                        <option value='1'>  فعال     </option>
                        <option value='0'>   غیر فعال     </option>
                    </>
                </Input>

       
                <Editor name='question' title=' سوال ' />
                <Editor name='answer' title='  پاسخ ' />
                <Button
                 disabled={isSend ? true : false}
                    type="submit"
                    className="text-white hover:bg-clifford hover:text-pallete bg-pallete py-4 px-8 basis-1/2 rounded-lg">
                    {' '}
                    ایجاد    سوال
                </Button>
            </InputContainer>


        </>
    )
}
export default CreateFaq;