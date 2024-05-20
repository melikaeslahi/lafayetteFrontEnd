'use client'
import Button from '@/components/dashboard/inputs/Button'
import { useRouter } from 'next/navigation'
import TitlePage from '@/components/dashboard/TitlePage'
import {   useEffect } from 'react'
 
 
import { Editor, Input,   InputTags } from '@/components/dashboard/inputs'

import InputContainer from '@/components/dashboard/inputs/InputContainer'
import { setIsError, setIsLoading, setIsSuccess } from '@/store/reducers/dashboard/UtilSlice'
 
import { useGetFaqQuery, useUpdateFaqMutation } from '@/lib/content/faqApi'
import EditFaqSchema from '@/validation/doshboard/content/faq/editFaq'
import { useDispatch  } from 'react-redux'
import { setErrorData ,setSuccessMessage} from '@/store/reducers/dashboard/UtilSlice'

const UpdateFaq = ({ params }) => {
    const { data: faq = {}, isLoading, isSuccess, isError } =  useGetFaqQuery(params.id);


    const router = useRouter();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setIsLoading(isLoading));
        dispatch(setIsSuccess(isSuccess));
        dispatch(setIsError(isError));
    }, [isLoading, isSuccess, isError])

     
    const initialValues = {
        question: `${faq.data?.question}`,

        answer: `${faq.data?.answer}`,
        status: `${faq.data?.status}`,
        tag: `${faq.data?.tag}`
    }
    const [UpdateFaq, { data , isLoading: isSend ,isSuccess:Success }] = useUpdateFaqMutation()
    const handlerSubmit = async (values) => {
        // Create an object of formData
        let formData = new FormData();
        // Update the formData object
        formData.append('_method', 'PUT');
       
        formData.append("question", values.question);
        formData.append("answer", values.answer);
        formData.append("status", values.status);
        formData.append("tag", values.tag);
     
        await UpdateFaq({ id: params.id, formData });
    }
  
    useEffect(() => {
        dispatch(setErrorData(data)); 
        if(Success){
        dispatch(setSuccessMessage(' سوال با موفقیت ویرایش شد.')); 
        }
    }, [data, Success]);

    return (
        <>
            <TitlePage
                name=" ویرایش سوال "
                sitemapPage=" بخش محتوایی /   سوالات متداول  / ویرایش    سوال "
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
                validationSchema={EditFaqSchema}
                handlerSubmit={handlerSubmit} >

            
                <InputTags name='tag' placeHolder={'برچسب ها'} editTags={faq.data?.tag} title="برچسب ها" />
                 

                <Input name='status' title={'وضعیت'} select={'select'} className={'text-left'} >
                    <>
                        <option value=''> اتتخاب  وضعیت  </option>
                        <option value='1'>  فعال     </option>
                        <option value='0'>   غیر فعال     </option>
                    </>
                </Input>
           
                <Editor name='question' title='  سوال ' />
               
                <Editor name='answer' title=' پاسخ ' />
                <Button
                 disabled={isSend ? true : false}
                    type="submit"
                    className="text-white hover:bg-clifford hover:text-pallete bg-pallete py-4 px-8 basis-1/2 rounded-lg">
                    {' '}
                    ویرایش  سوال
                </Button>



            </InputContainer>

        </>
    )
}
export default UpdateFaq;
