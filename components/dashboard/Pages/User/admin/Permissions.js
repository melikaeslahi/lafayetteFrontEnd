'use client'
import Button from '@/components/dashboard/inputs/Button'
import { useRouter } from 'next/navigation'
import TitlePage from '@/components/dashboard/TitlePage'
import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import  { MultipleSelect  } from '@/components/dashboard/inputs'
import { setIsError, setIsLoading, setIsSuccess } from '@/store/reducers/dashboard/UtilSlice'
import InputContainer from '@/components/dashboard/inputs/InputContainer'
 
import PermissionSchema from '@/validation/doshboard/user/adminUser/permissionValidation'
import { useAddNewPermissionsMutation, useGetPermissionsQuery } from '@/lib/user/adminUserApi'
import { useDispatch  } from 'react-redux'
import { setErrorData ,setSuccessMessage} from '@/store/reducers/dashboard/UtilSlice'


const CreateAdminPermissions = ({params}) => {
    const { data:   permissions = {}, isLoading, isSuccess, isError } =   useGetPermissionsQuery(params);
    const dispatch = useDispatch();
    const [permissionsOption , setPermissionsOption] = useState([]);
    const [ defaultOpt , setDefaultOpt] = useState([]);

    useEffect(()=>{
        dispatch(setIsLoading(isLoading));
        dispatch(setIsSuccess(isSuccess));
        dispatch(setIsError(isError));     
     } , [isLoading ,isSuccess ,isError])
    const router = useRouter();
    
 useEffect(() => {
    if(isSuccess){
        let  productsOtp =  permissions.permissions?.map((permission)=>{
            return {
                 value : permission.id,
                 label : permission.name
             }
         })
         setPermissionsOption(productsOtp);
         
         let   defaultVal =  permissions.admin.permissions?.map((permission)=>{
            return {
                 value : permission.id,
                 label : permission.name
             }
         })
         setDefaultOpt(defaultVal);
         
    }
   }, [permissions]);

 
 
    const initialValues = {
        permissions: [],
    }
    const [addNewPermissions, { data  , isLoading: isSend ,isSuccess:Success}] =   useAddNewPermissionsMutation()
    useEffect(() => {
        dispatch(setErrorData(data)); 
        if(Success){
        dispatch(setSuccessMessage('  دسترسی با موفقیت ایجاد شد.')); 
        }
    }, [data,  Success]);

    const handlerSubmit = async (values) => {

        
        const formData = new FormData();
     
        formData.append("permissions[]", values.permissions);
     

        await addNewPermissions({formData , params});

    }

    return (
        <>
            <TitlePage
                name="ایجاد  دسترسی "
                sitemapPage='بخش  کاربران /  ادمین /   ایجاد   دسترسی '
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
                 
              <MultipleSelect 
                name={'permissions'}
                 placeholder={'محصولات مورد نظر را انتخاب نمایید'}
                 defaultValue={defaultOpt}
                options={permissionsOption} 
                title=' دسترسی ها  '
               
                />

                <Button
                 disabled={isSend ? true : false}
                    type="submit"
                    className="text-white hover:bg-clifford hover:text-pallete bg-pallete py-4 px-8 basis-1/2 rounded-lg">
                    {' '}
                    ثبت
                </Button>

            </InputContainer>

        </>
    )
}
export default CreateAdminPermissions;