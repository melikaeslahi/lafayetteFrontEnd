'use client'
import Button from '@/components/dashboard/inputs/Button'
import { useRouter } from 'next/navigation'
import TitlePage from '@/components/dashboard/TitlePage'
import {  useEffect } from 'react'
import { useDispatch } from 'react-redux'
 
import { Editor, Input  } from '@/components/dashboard/inputs'
 
import EditCategorySchema from '@/validation/doshboard/market/category/editCategory'
import { setIsError, setIsLoading, setIsSuccess } from '@/store/reducers/dashboard/UtilSlice'
import InputContainer from '@/components/dashboard/inputs/InputContainer'
 
import { useGetPermissionQuery, useUpdatePermissionMutation } from '@/lib/user/permissionApi'
 
import { setErrorData ,setSuccessMessage} from '@/store/reducers/dashboard/UtilSlice'
const UpdatePermission = ({ params }) => {
    const { data:  permission = {}, isLoading, isSuccess, isError } =  useGetPermissionQuery(params);
 
 
    const router = useRouter();
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(setIsLoading(isLoading));
        dispatch(setIsSuccess(isSuccess));
        dispatch(setIsError(isError));     
     } , [isLoading ,isSuccess ,isError])
  
    const initialValues = {
        name: `${permission.data?.name}`, 
        description: `${permission.data?.description}`,
  
    }
    const [UpdatePermission, { data , isLoading: isSend ,isSuccess:Success }] =  useUpdatePermissionMutation()

  
    const handlerSubmit = async (values) => {
        // Create an object of formData
        let formData = new FormData();
        // Update the formData object
        formData.append('_method', 'PUT');
       
        formData.append("name", values.name);
    
        formData.append("description", values.description);
          
        await UpdatePermission({ id: params, formData });
    }
 
    useEffect(() => {
        dispatch(setErrorData(data)); 
        if(Success){
        dispatch(setSuccessMessage(' دسترسی با موفقیت ویرایش شد.')); 
        }
    }, [data,  Success]);

    return (
        <>
            <TitlePage
                name="ویرایش    دسترسی"
                sitemapPage=' بخش کاربران / سطوح دسترسی /   دسترسی  ها /ویرایش    دسترسی'            >
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
                    validationSchema={EditCategorySchema}
                    handlerSubmit={handlerSubmit}>
                    <Input name='name' title={'   نام دسترسی'} type='text' />
                     

                   
                    
                    <Editor name='description' title='   توضیحات ' />
                    <Button
                     disabled={isSend ? true : false}
                        type="submit"
                        className="text-white hover:bg-clifford hover:text-pallete bg-pallete py-4 px-8 basis-1/2 rounded-lg">
                        {' '}
                        ویرایش    دسترسی
                    </Button>
                </InputContainer>
         
        </>
    )
}
export default UpdatePermission;
