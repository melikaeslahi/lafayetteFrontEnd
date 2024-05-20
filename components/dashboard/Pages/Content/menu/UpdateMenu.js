'use client'
import Button from '@/components/dashboard/inputs/Button'
import { useRouter } from 'next/navigation'
import TitlePage from '@/components/dashboard/TitlePage'
import {  useEffect } from 'react'
import { Input  } from '@/components/dashboard/inputs'
import InputContainer from '@/components/dashboard/inputs/InputContainer'
import { setIsError, setIsLoading, setIsSuccess } from '@/store/reducers/dashboard/UtilSlice'
import { useGetAllParentIdQuery, useGetMenuQuery, useUpdateMenuMutation } from '@/lib/content/menuApi'
import EditMenuSchema from '@/validation/doshboard/content/menu/editMenuValidation'
import { useDispatch  } from 'react-redux'
import { setErrorData ,setSuccessMessage} from '@/store/reducers/dashboard/UtilSlice'

const UpdateMenu = ({ params }) => {
    const { data: menu = {}, isLoading, isSuccess, isError } =  useGetMenuQuery(params.id);
     
    const { data: parentId = [] } =  useGetAllParentIdQuery();
    const router = useRouter();
    const dispatch = useDispatch();
    useEffect(()=>{
       dispatch(setIsLoading(isLoading));
       dispatch(setIsSuccess(isSuccess));
       dispatch(setIsError(isError));     
    } , [ isLoading ,isSuccess ,isError])

 
    const initialValues = {
        name: `${menu.data?.name}`,
        parent_id: `${menu.data?.parent_id ? menu.data?.parent_id :''}`,
       
        status: `${menu.data?.status}`,
        url: `${menu.data?.url}`
    }
    const [UpdateMenu, { data , isLoading: isSend ,isSuccess:Success }] =  useUpdateMenuMutation()
    const handlerSubmit = async (values) => {
        // Create an object of formData
        let formData = new FormData();
        // Update the formData object
        formData.append('_method', 'PUT');
       
        formData.append("name", values.name);
        if (values.parent_id) {
            formData.append("parent_id", values.parent_id);
        }
       
        formData.append("status", values.status);
        formData.append("url", values.url);
        
        await UpdateMenu({ id: params.id, formData });
    }
  
    useEffect(() => {
        dispatch(setErrorData(data)); 
        if(Success){
        dispatch(setSuccessMessage('منو با موفقیت ویرایش شد.')); 
        }
    }, [data,  Success]);

    return (
        <>
            <TitlePage
                name="   ویرایش منو  "
                sitemapPage=" بخش محتوایی / منو ها / ویرایش منو   "
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
                validationSchema={EditMenuSchema}
                handlerSubmit={handlerSubmit} >
           
                <Input name='name' title={'دسته بندی'} type='text' />
                <Input name='url' placeholder={'http://toplearn'}   title="  آدرس " />
                <Input name='parent_id' title={' دسته والد  '} select={'select'} className={'text-left'} >
                    <>
                        <option> اتتخاب والد  </option>
                        { parentId.data?.map(({ id, name }) => (
                            <option key={id} value={id} >
                                {' '}
                                {name}{' '}
                            </option>
                        ))}
                    </>
                </Input>

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
                    ویرایش    منو
                </Button>
                
             

            </InputContainer>

        </>
    )
}
export default UpdateMenu;
