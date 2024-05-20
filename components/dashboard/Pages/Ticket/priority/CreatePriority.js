'use client'
import Button from '@/components/dashboard/inputs/Button'
import { useRouter } from 'next/navigation'
import TitlePage from '@/components/dashboard/TitlePage' 
import {   useEffect } from 'react'
 
import {   Input  } from '@/components/dashboard/inputs'
 
import InputContainer from '@/components/dashboard/inputs/InputContainer'
import { useAddNewTicketPriorityMutation } from '@/lib/ticket/ticketPriorityApi'
import TicketPrioritySchema from '@/validation/doshboard/ticket/category/TicketCategoryValidation'
import { useDispatch  } from 'react-redux'
import { setErrorData ,setSuccessMessage} from '@/store/reducers/dashboard/UtilSlice'


const CreatePeriority = () => {
 
    const router = useRouter();
 
    const dispatch =useDispatch();
 
    const initialValues = {
        name: '',   
        status: '',
       
    }
    const [addNewPriority, { data , isLoading: isSend ,isSuccess:Success }] =  useAddNewTicketPriorityMutation()
    useEffect(() => {
        dispatch(setErrorData(data)); 
        if(Success){
        dispatch(setSuccessMessage('  اولویت تیکت با موفقیت ایجاد شد.')); 
        }
    }, [data,  Success]);

    const handlerSubmit = async (values) => {

        // Create an object of formData
        const formData = new FormData();
        // Update the formData object
       
        formData.append("name", values.name);
   
        formData.append("status", values.status);
        

        await addNewPriority(formData);

    }

    return (
        <>
            <TitlePage
                name="ایجاد    اولویت"
                sitemapPage='بخش  تیکت ها /اولویت تیکت ها/ایجاد اولویت'
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
                validationSchema={TicketPrioritySchema}
                handlerSubmit={handlerSubmit}>
         
            <Input name='name' title={' نام اولویت  '} type='text' placeholder={'نام اولویت'} />
          
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
                ایجاد   اولویت
            </Button>

            </InputContainer>

        </>
    )
}
export default CreatePeriority;