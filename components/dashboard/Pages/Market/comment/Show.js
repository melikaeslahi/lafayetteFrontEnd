'use client'
import Button from '@/components/dashboard/inputs/Button'
import { useRouter } from 'next/navigation'
import TitlePage from '@/components/dashboard/TitlePage'
import {   useEffect } from 'react'
 
import { Editor } from '@/components/dashboard/inputs'

import InputContainer from '@/components/dashboard/inputs/InputContainer'
import { useGetCommentQuery, useAddNewAnswerMutation } from '@/services/market/commentApi'
import ShowCommentSchema from '@/validation/doshboard/market/comment/showValidation'
import { useDispatch  } from 'react-redux'
import { setErrorData ,setSuccessMessage} from '@/store/reducers/dashboard/UtilSlice'


const ShowComment = ({ params }) => {
    const { data: comment = [] } = useGetCommentQuery({ id:params.id});
 
    const router = useRouter();
    const dispatch =useDispatch();
 

    const initialValues = {

        body: '',

    }
    const [addNewAnswer, { data , isLoading: isSend ,isSuccess:Success }] = useAddNewAnswerMutation()
    useEffect(() => {
        dispatch(setErrorData(data)); 
        if(Success){
        dispatch(setSuccessMessage('کامنت با موفقیت ایجاد شد.')); 
        }
    }, [data, Success]);

    const handlerSubmit = async (values) => {

        // Create an object of formData
        const formData = new FormData();
        // Update the formData object

        formData.append("body", values.body);


        await addNewAnswer({ formData, id: params.id });

    }

    return (
        <>
            <TitlePage
                name="نمایش کامنت"
                sitemapPage='بخش فروش /ویترین /   کامنت ها   / نمایش کامنت    '
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
                validationSchema={ShowCommentSchema}
                handlerSubmit={handlerSubmit}>

                <section className='flex flex-col basis-1/2 shadow-md shadow-pallete p-5 m-5 '>

                    <h1 className='text-pallete text-lg'>  نویسنده نظر: {comment.data?.user.first_name + ' ' + comment.data?.user.last_name} - کد کاربر:{comment.data?.user.id} </h1>
                    <h3> نام محصول :  {comment.data?.commentable?.name} کد محصول:{comment.data?.commentable.id}    </h3>
                    <p>  متن کامنت:{comment.data?.body.replace(/<(.|\n)*?>/g, '')}  </p>

                </section>
                {comment.data?.parent_id == null ?  <><Editor name='body' title=' پاسخ ' />
                    <Button
                     disabled={isSend ? true : false}
                        type="submit"
                        className="text-white hover:bg-clifford hover:text-pallete bg-pallete py-4 px-8 basis-1/2 rounded-lg">
                        {' '}
                        ثبت پاسخ
                    </Button></> : ''

                }


            </InputContainer>

        </>
    )
}
export default ShowComment;