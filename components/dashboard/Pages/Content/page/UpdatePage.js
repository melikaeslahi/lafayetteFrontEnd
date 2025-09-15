'use client'
import Button from '@/components/dashboard/inputs/Button'
import { useRouter } from 'next/navigation'
import TitlePage from '@/components/dashboard/TitlePage'
import {   useEffect } from 'react'
 
 
import { Editor, Input,InputTags } from '@/components/dashboard/inputs'
import InputContainer from '@/components/dashboard/inputs/InputContainer'
import { setIsError, setIsLoading, setIsSuccess } from '@/store/reducers/dashboard/UtilSlice'
 
import { useGetPageQuery, useUpdatePageMutation } from '@/services/content/pageApi'
import EditPageSchema from '@/validation/doshboard/content/page/editPageValidation'
import { useDispatch  } from 'react-redux'
import { setErrorData ,setSuccessMessage} from '@/store/reducers/dashboard/UtilSlice'

const UpdatePage = ({ params }) => {
    const { data:  page = {}, isLoading, isSuccess, isError } =  useGetPageQuery(params.id);
  
 
    const router = useRouter();
    const dispatch = useDispatch();
    useEffect(()=>{
       dispatch(setIsLoading(isLoading));
       dispatch(setIsSuccess(isSuccess));
       dispatch(setIsError(isError));     
    } , [ isLoading ,isSuccess ,isError])

 
    const initialValues = {
        title: `${page.data?.title}`,
        
        body: `${page.data?.body}`,
        status: `${page.data?.status}`,
        tags: `${page.data?.tags}`
    }
    const [UpdatePage, { data , isLoading: isSend ,isSuccess:Success }] =  useUpdatePageMutation()
    const handlerSubmit = async (values) => {
        // Create an object of formData
        let formData = new FormData();
        // Update the formData object
        formData.append('_method', 'PUT');
       
        formData.append("title", values.title);
      
        formData.append("body", values.body);
        formData.append("status", values.status);
        formData.append("tags", values.tags);
      
        await UpdatePage({ id: params.id, formData });
    }
 
    useEffect(() => {
        dispatch(setErrorData(data)); 
        if(Success){
        dispatch(setSuccessMessage(' صفحه با موفقیت ویرایش شد.')); 
        }
    }, [data, Success]);

    return (
        <>
            <TitlePage
                name="ویرایش صفحه"
                sitemapPage=" بخش محتوایی / پیج ساز / ویرایش صفحه "
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
                validationSchema={EditPageSchema}
                handlerSubmit={handlerSubmit} >
           
                <Input name='title' title={'عنوان صفحه'} type='text' />
                <InputTags name='tags' placeHolder={'برچسب ها'} editTags={page.data?.tags} title="برچسب ها" />
                <Input name='status' title={'وضعیت'} select={'select'} className={'text-left'} >
                    <>
                        <option value=''> اتتخاب  وضعیت  </option>
                        <option value='1'>  فعال     </option>
                        <option value='0'>   غیر فعال     </option>
                    </>
                </Input>
                <Editor name='body' title=' بدنه صفحه ' />
                <Button
                 disabled={isSend ? true : false}
                    type="submit"
                    className="text-white hover:bg-clifford hover:text-pallete bg-pallete py-4 px-8 basis-1/2 rounded-lg">
                    {' '}
                    ویرایش    صفحه
                </Button>
            </InputContainer>

        </>
    )
}
export default UpdatePage;
