'use client'
import Button from '@/components/dashboard/inputs/Button'
import { useRouter } from 'next/navigation'
import TitlePage from '@/components/dashboard/TitlePage'
import {   useEffect } from 'react'
import { useDispatch } from 'react-redux'
 
import {   Input  } from '@/components/dashboard/inputs'
import { setIsError, setIsLoading, setIsSuccess } from '@/store/reducers/dashboard/UtilSlice'
import { useGetTicketCategoryQuery, useUpdateTicketCategoryMutation } from '@/lib/ticket/ticketCategoryApi'
import TicketCategorySchema from '@/validation/doshboard/ticket/priority/TicketPriorityValidation'
import InputContainer from '@/components/dashboard/inputs/InputContainer'
import { setErrorData ,setSuccessMessage} from '@/store/reducers/dashboard/UtilSlice'
const UpdateCategory = ({ params }) => {
    const { data:  category = {}, isLoading, isSuccess, isError } =  useGetTicketCategoryQuery(params);
 
 
    const router = useRouter();
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(setIsLoading(isLoading));
        dispatch(setIsSuccess(isSuccess));
        dispatch(setIsError(isError));     
     } , [isLoading ,isSuccess ,isError])
 
    const initialValues = {
        name: `${category.data?.name}`,
     
        status: `${category.data?.status}`,
        
    }
    const [UpdateCategory, { data , isLoading: isSend ,isSuccess:Success }] =  useUpdateTicketCategoryMutation()

  
    const handlerSubmit = async (values) => {
        // Create an object of formData
        let formData = new FormData();
        // Update the formData object
        formData.append('_method', 'PUT');
        
        formData.append("name", values.name);
       
        
        formData.append("status", values.status);
   

      
        await UpdateCategory({ params, formData });
    }
   
    useEffect(() => {
        dispatch(setErrorData(data)); 
        if(Success){
        dispatch(setSuccessMessage(' دسته بندی با موفقیت ویرایش شد.')); 
        }
    }, [data,  Success]);

    return (
        <>
            <TitlePage
                name="ویرایش دسته بندی"
                sitemapPage=' بخش  تیکت ها/  دسته بندی  تیکت /ویرایش دسته بندی'            >
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
                    validationSchema={TicketCategorySchema}
                    handlerSubmit={handlerSubmit}>
                    <Input name='name' title={'دسته بندی'} type='text' />
                   
                 

                    <Input name='status' title={'وضعیت'} select={'select'} className={'text-left'} >
                        <>
                            <option value=''> اتتخاب  وضعیت  </option>
                            <option value='1'>  فعال     </option>
                            <option value='0'>   غیر فعال     </option>
                        </>
                    </Input>
                 
                    <Button
                     disabled={isSend ? true : false}
                        type="submit"
                        className="text-white hover:bg-clifford hover:text-pallete bg-pallete py-4 px-8 basis-1/2 rounded-lg">
                        {' '}
                        ویرایش دسته بندی
                    </Button>
                </InputContainer>
         
        </>
    )
}
export default UpdateCategory;
