'use client'
 
import Button from '@/components/dashboard/inputs/Button'
import { useRouter } from 'next/navigation'
import TitlePage from '@/components/dashboard/TitlePage'
import {  useEffect } from 'react'
 
import { Editor, Input, InputTags } from '@/components/dashboard/inputs'

import InputContainer from '@/components/dashboard/inputs/InputContainer'
import { useAddNewPageMutation } from '@/services/content/pageApi'
import CreatePageSchema from '@/validation/doshboard/content/page/createPageValidation'
import { useDispatch  } from 'react-redux'
import { setErrorData ,setSuccessMessage} from '@/store/reducers/dashboard/UtilSlice'
const CreatePage = () => {

    const router = useRouter();
    const dispatch =useDispatch();
    const initialValues = {
        title: '',
        body: '',
        status: '',
        tags: ''
    }
    const [addNewPage, { data , isLoading: isSend ,isSuccess:Success }] =  useAddNewPageMutation()
    useEffect(() => {
        dispatch(setErrorData(data)); 
        if(Success){
        dispatch(setSuccessMessage(' صفحه با موفقیت ایجاد شد.')); 
        }
    }, [data,  Success]);

    const handlerSubmit = async (values) => {

        // Create an object of formData
        const formData = new FormData();
        // Update the formData object
        
        formData.append("title", values.title);
        formData.append("body", values.body);
        formData.append("status", values.status);
        formData.append("tags", values.tags);

        await addNewPage(formData);

    }

    return (
        <>
            <TitlePage
                name="ایجاد صفحه"
                sitemapPage="بخش محتوایی /    پیج ساز   / ایجاد    صفحه جدید"
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
                validationSchema={CreatePageSchema}
                handlerSubmit={handlerSubmit} >
                <Input name='title' title={'عنوان صفحه'} type='text' placeholder={'مثل:درباره من'} />
                <InputTags name='tags' placeHolder={'برچسب ها'} title="برچسب ها" />
               
                <Input name='status' title={'وضعیت'} select={'select'} className={'text-left'} >
                    <>
                        <option value=''> اتتخاب  وضعیت  </option>
                        <option value='1'>  فعال     </option>
                        <option value='0'>   غیر فعال     </option>
                    </>
                </Input>

                
                <Editor name='body' title='  بدنه صفحه ' />
                <Button
                 disabled={isSend ? true : false}
                    type="submit"
                    className="text-white hover:bg-clifford hover:text-pallete bg-pallete py-4 px-8 basis-1/2 rounded-lg">
                    {' '}
                    ایجاد   صفحه
                </Button>
            </InputContainer>


        </>
    )
}
export default CreatePage;