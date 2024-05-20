'use client'
import Button from '@/components/dashboard/inputs/Button'
import { useRouter } from 'next/navigation'
import TitlePage from '@/components/dashboard/TitlePage' 
import {  useEffect } from 'react' 
import {   Input } from '@/components/dashboard/inputs'
import InputContainer from '@/components/dashboard/inputs/InputContainer'
import { useAddNewTicketCategoryMutation } from '@/lib/ticket/ticketCategoryApi'
import TicketCategorySchema from '@/validation/doshboard/ticket/priority/TicketPriorityValidation'
import { useDispatch  } from 'react-redux'
import { setErrorData ,setSuccessMessage} from '@/store/reducers/dashboard/UtilSlice'


const CreateCategory = () => {
 
    const router = useRouter();
    const dispatch =useDispatch();
 
 
    const initialValues = {
        name: '',
        
        status: '',
        
    }
    const [addNewCategory, { data , isLoading: isSend ,isSuccess:Success }] =  useAddNewTicketCategoryMutation()
    useEffect(() => {
        dispatch(setErrorData(data)); 
        if(Success){
        dispatch(setSuccessMessage(' دسته بندی با موفقیت ایجاد شد.')); 
        }
    }, [data,  Success]);

    const handlerSubmit = async (values) => {

        // Create an object of formData
        const formData = new FormData();
        // Update the formData object
 
        formData.append("name", values.name);
       
        formData.append("status", values.status);
       

        await addNewCategory(formData);

    }

    return (
        <>
            <TitlePage
                name="ایجاد دسته بندی"
                sitemapPage='بخش فروش / تیکت ها /دسته بندی ها /ایجاد دسته بندی'
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
                validationSchema={TicketCategorySchema}
                handlerSubmit={handlerSubmit}>
         
            <Input name='name' title={'دسته بندی'} type='text' placeholder={'نام دسته یندی'} />
          
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
                ایجاد دسته بندی
            </Button>

            </InputContainer>

        </>
    )
}
export default CreateCategory;