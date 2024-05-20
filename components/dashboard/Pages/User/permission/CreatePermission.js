'use client'
import Button from '@/components/dashboard/inputs/Button'
import { useRouter } from 'next/navigation'
import TitlePage from '@/components/dashboard/TitlePage' 
import {   useEffect } from 'react'
 
import { Editor, Input } from '@/components/dashboard/inputs'
 
import InputContainer from '@/components/dashboard/inputs/InputContainer'
import { useAddNewPermissionMutation } from '@/lib/user/permissionApi'
import PermissionSchema from '@/validation/doshboard/user/permission/permissionValidation'

import { useDispatch  } from 'react-redux'
import { setErrorData ,setSuccessMessage} from '@/store/reducers/dashboard/UtilSlice'

const CreatePermission = () => {
    
    const router = useRouter();
    const dispatch =useDispatch();
 
   
    const initialValues = {
        name: '',    
        description: '',
       
    }
    const [addNewPermission, { data , isLoading: isSend ,isSuccess:Success }] =  useAddNewPermissionMutation()
    useEffect(() => {
        dispatch(setErrorData(data)); 
        if(Success){
        dispatch(setSuccessMessage(' دسترسی با موفقیت ایجاد شد.')); 
        }
    }, [data,  Success]);

    const handlerSubmit = async (values) => {

        // Create an object of formData
        const formData = new FormData();
        // Update the formData object
     
        formData.append("name", values.name);
       
        formData.append("description", values.description);
         

        await addNewPermission(formData);

    }

    return (
        <>
            <TitlePage
                name="ایجاد دسترسی"
                sitemapPage='بخش کاربران / سطوح دسترسی /   دسترسی ها /ایجاد دسترسی'
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
                validationSchema={PermissionSchema}
                handlerSubmit={handlerSubmit}>
         
            <Input name='name' title={' نام دسترسی  '} type='text' placeholder={'  مثل:ایجاد پست'} />
            
           
          
 
            <Editor name='description' title='   توضیحات ' />
            <Button
             disabled={isSend ? true : false}
                type="submit"
                className="text-white hover:bg-clifford hover:text-pallete bg-pallete py-4 px-8 basis-1/2 rounded-lg">
                {' '}
                ایجاد    دسترسی
            </Button>

            </InputContainer>

        </>
    )
}
export default CreatePermission;