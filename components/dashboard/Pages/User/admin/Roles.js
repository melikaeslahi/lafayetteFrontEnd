'use client'
import Button from '@/components/dashboard/inputs/Button'
import { useRouter } from 'next/navigation'
import TitlePage from '@/components/dashboard/TitlePage'
import { useState, useEffect } from 'react'
import {    MultipleSelect  } from '@/components/dashboard/inputs'
import { setIsError, setIsLoading, setIsSuccess } from '@/store/reducers/dashboard/UtilSlice'
 
import InputContainer from '@/components/dashboard/inputs/InputContainer'
import {  useAddNewRolesMutation, useGetRolesQuery } from '@/lib/user/adminUserApi'
import AdminSchema from '@/validation/doshboard/user/adminUser/adminValidation'
import { useDispatch } from 'react-redux'
 
import { setErrorData ,setSuccessMessage} from '@/store/reducers/dashboard/UtilSlice'



const CreateAdminRoles = ({params}) => {
    const { data:    roles = {}, isLoading, isSuccess, isError } =  useGetRolesQuery(params);
    const dispatch =  useDispatch();
    const [rolesOption , setRolesOption] = useState([]);
    const [ defaultOpt , setDefaultOpt] = useState([]);

    useEffect(()=>{
        dispatch(setIsLoading(isLoading));
        dispatch(setIsSuccess(isSuccess));
        dispatch(setIsError(isError));     
     } , [isLoading ,isSuccess ,isError])
    const router = useRouter();
    
 useEffect(() => {
    if(isSuccess){
        let  rolesOpt =  roles.roles?.map((role)=>{
            return {
                 value : role.id,
                 label : role.name
             }
         })
         setRolesOption(rolesOpt);
         
         let   defaultVal =  roles.admin.roles?.map((role)=>{
            return {
                 value : role.id,
                 label : role.name
             }
         })
         setDefaultOpt(defaultVal);
         
    }
   }, [roles]);

 
 
    const initialValues = {
        roles:[]
    }
    const [addNewRoles, { data , isLoading: isSend ,isSuccess:Success }] =  useAddNewRolesMutation()
    useEffect(() => {
        dispatch(setErrorData(data)); 
        if(Success){
        dispatch(setSuccessMessage('  نقش با موفقیت ایجاد شد.')); 
        }
    }, [data,  Success]);

    const handlerSubmit = async (values) => {

        
        const formData = new FormData();
     
        formData.append("roles[]", values.roles);
     

        await addNewRoles({formData , params});

    }

    return (
        <>
            <TitlePage
                name="ایجاد ادمین"
                sitemapPage='بخش  کاربران /  ادمین /   ایجاد   نقش کاربر '
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
                validationSchema={AdminSchema}
                handlerSubmit={handlerSubmit}>

<MultipleSelect 
                name={'roles'}
                 placeholder={' نقش مورد نظر را انتخاب نمایید'}
                 defaultValue={defaultOpt}
                options={rolesOption} 
                title='  نقش ها'
               
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
export default CreateAdminRoles;