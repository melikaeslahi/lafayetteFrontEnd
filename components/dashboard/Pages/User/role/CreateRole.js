'use client'
import Button from '@/components/dashboard/inputs/Button'
import { useRouter } from 'next/navigation'
import TitlePage from '@/components/dashboard/TitlePage' 
import {   useEffect } from 'react'
 
import { Editor, Input  } from '@/components/dashboard/inputs'
 
import InputContainer from '@/components/dashboard/inputs/InputContainer'
import RoleSchema from '@/validation/doshboard/user/roles/roleValidation'
import { useAddNewRoleMutation } from '@/lib/user/roleApi'
import { useDispatch  } from 'react-redux'
import { setErrorData ,setSuccessMessage} from '@/store/reducers/dashboard/UtilSlice'


const CreateRole = () => {
    
    const router = useRouter();
    const dispatch =useDispatch();
    
 
    const initialValues = {
        name: '',  
        description: '',
       
    }
    const [addNewRole, { data , isLoading: isSend ,isSuccess:Success }] =  useAddNewRoleMutation()
    useEffect(() => {
        dispatch(setErrorData(data)); 
        if(Success){
        dispatch(setSuccessMessage(' نقش با موفقیت ایجاد شد.')); 
        }
    }, [data,  Success]);

    const handlerSubmit = async (values) => {

        // Create an object of formData
        const formData = new FormData();
        // Update the formData object
     
        formData.append("name", values.name);     
        formData.append("description", values.description);
        

        await addNewRole(formData);

    }

    return (
        <>
            <TitlePage
                name="ایجاد  نقش"
                sitemapPage='بخش  کاربران / سطوح دسترسی /   نقش ها  /ایجاد نقش'
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
                validationSchema={RoleSchema}
                handlerSubmit={handlerSubmit}>
         
            <Input name='name' title={' نام نقش'} type='text' placeholder={' مثل: ادمین  '} />
            <Editor name='description' title='   توضیحات ' />
            <Button
             disabled={isSend ? true : false}
                type="submit"
                className="text-white hover:bg-clifford hover:text-pallete bg-pallete py-4 px-8 basis-1/2 rounded-lg">
                {' '}
                ایجاد   نقش
            </Button>

            </InputContainer>

        </>
    )
}
export default CreateRole;