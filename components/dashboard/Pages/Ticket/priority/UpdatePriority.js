'use client'
import Button from '@/components/dashboard/inputs/Button'
import { useRouter } from 'next/navigation'
import TitlePage from '@/components/dashboard/TitlePage'
import {  useEffect } from 'react'
import { useDispatch } from 'react-redux'
 
import {   Input   } from '@/components/dashboard/inputs'
 
import { setIsError, setIsLoading, setIsSuccess } from '@/store/reducers/dashboard/UtilSlice'
import InputContainer from '@/components/dashboard/inputs/InputContainer'
import { useGetTicketPriorityQuery, useUpdateTicketPriorityMutation } from '@/lib/ticket/ticketPriorityApi'
import TicketPrioritySchema from '@/validation/doshboard/ticket/category/TicketCategoryValidation'
import { setErrorData ,setSuccessMessage} from '@/store/reducers/dashboard/UtilSlice'
const UpdatePriority = ({ params }) => {
    const { data:  priority = {}, isLoading, isSuccess, isError } =  useGetTicketPriorityQuery(params);
 
 
    const router = useRouter();
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(setIsLoading(isLoading));
        dispatch(setIsSuccess(isSuccess));
        dispatch(setIsError(isError));     
     } , [isLoading ,isSuccess ,isError])
 
    const initialValues = {
        name: `${priority.data?.name}`,
       
        
        status: `${priority.data?.status}`,
        
    }
    const [UpdatePriority, { data  , isLoading: isSend ,isSuccess:Success}] =  useUpdateTicketPriorityMutation()

  
    const handlerSubmit = async (values) => {
        // Create an object of formData
        let formData = new FormData();
        // Update the formData object
        formData.append('_method', 'PUT');
        
        formData.append("name", values.name);
   
        formData.append("status", values.status);
    
        
        await UpdatePriority({formData   ,  params });
    }
 
    useEffect(() => {
        dispatch(setErrorData(data)); 
        if(Success){
        dispatch(setSuccessMessage('  اولویت تیکت با موفقیت ویرایش شد.')); 
        }
    }, [data,  Success]);

    return (
        <>
            <TitlePage
                name="ویرایش  اولویت"
                sitemapPage=' بخش  تیکت ها / اولویت تیکت ها  /ویرایش    اولویت'            >
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
                    validationSchema={TicketPrioritySchema}
                    handlerSubmit={handlerSubmit}>
                    <Input name='name' title={' نام اولویت'} type='text' />
                   

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
                        ویرایش   اولویت
                    </Button>
                </InputContainer>
         
        </>
    )
}
export default UpdatePriority;
