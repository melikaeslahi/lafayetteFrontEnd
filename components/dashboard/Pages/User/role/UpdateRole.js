'use client'
import Button from '@/components/dashboard/inputs/Button'
import { useRouter } from 'next/navigation'
import TitlePage from '@/components/dashboard/TitlePage'
import {   useEffect } from 'react'
import { useDispatch } from 'react-redux'
 
import { Editor, Input  } from '@/components/dashboard/inputs'
 
import { setIsError, setIsLoading, setIsSuccess } from '@/store/reducers/dashboard/UtilSlice'
import InputContainer from '@/components/dashboard/inputs/InputContainer'
 
import { useGetRoleQuery, useUpdateRoleMutation } from '@/lib/user/roleApi'
import RoleSchema from '@/validation/doshboard/user/roles/roleValidation'
 
import { setErrorData ,setSuccessMessage} from '@/store/reducers/dashboard/UtilSlice'
const UpdateRole = ({ params }) => {
    const { data:  role = {}, isLoading, isSuccess, isError } =  useGetRoleQuery(params);
 
 
    const router = useRouter();
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(setIsLoading(isLoading));
        dispatch(setIsSuccess(isSuccess));
        dispatch(setIsError(isError));     
     } , [isLoading ,isSuccess ,isError])
 
    const initialValues = {
        name: `${role.data?.name}`,
      
        description: `${role.data?.description}`,
       
    }
    const [UpdateRole, { data , isLoading: isSend ,isSuccess:Success }] =  useUpdateRoleMutation()

  
    const handlerSubmit = async (values) => {
        // Create an object of formData
        let formData = new FormData();
        // Update the formData object
        formData.append('_method', 'PUT');
     
        formData.append("name", values.name);
        formData.append("description", values.description);
        
        await UpdateRole({ id: params, formData });
    }
    
    useEffect(() => {
        dispatch(setErrorData(data)); 
        if(Success){
        dispatch(setSuccessMessage(' نقش با موفقیت ویرایش شد.')); 
        }
    }, [data,  Success]);
    return (
        <>
            <TitlePage
                name="ویرایش  نقش"
                sitemapPage=' بخش  کاربران / سطوح دسترسی /   نقش ها /ویرایش نقش'            >
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
                    <Input name='name' title={'   نام نقش'} type='text' />
                     

                    <Editor name='description' title='   توضیحات ' />
                    <Button
                     disabled={isSend ? true : false}
                        type="submit"
                        className="text-white hover:bg-clifford hover:text-pallete bg-pallete py-4 px-8 basis-1/2 rounded-lg">
                        {' '}
                        ویرایش    نقش
                    </Button>
                </InputContainer>
         
        </>
    )
}
export default UpdateRole;
