'use client'
import Button from '@/components/dashboard/inputs/Button'
import { useRouter } from 'next/navigation'
import TitlePage from '@/components/dashboard/TitlePage'
import {   useEffect } from 'react'
 
import {   Input  } from '@/components/dashboard/inputs' 
import InputContainer from '@/components/dashboard/inputs/InputContainer'
import { useAddNewMenuMutation, useGetAllParentIdQuery } from '@/lib/content/menuApi'
import CreateMenuSchema from '@/validation/doshboard/content/menu/createMenuValidation'
import { useDispatch  } from 'react-redux'
import { setErrorData ,setSuccessMessage} from '@/store/reducers/dashboard/UtilSlice'
const CreateMenu = () => {
    const { data: parentId = [] } =  useGetAllParentIdQuery();
    const router = useRouter();
    const dispatch =useDispatch();
 
    const parent_id = parentId && parentId.status === 200 && parentId.data;
    const initialValues = {
        name: '',
        parent_id: '',
        status: '',
        url: ''
    }
    const [addNewMenu, { data , isLoading: isSend ,isSuccess:Success }] =   useAddNewMenuMutation()
    useEffect(() => {
        dispatch(setErrorData(data)); 
        if(Success){
        dispatch(setSuccessMessage('منو با موفقیت ایجاد شد.')); 
        }

        
    }, [data,  Success]);

    const handlerSubmit = async (values) => {

        // Create an object of formData
        const formData = new FormData();
        // Update the formData object
   
        formData.append("name", values.name);
        if (values.parent_id) {
            formData.append("parent_id", values.parent_id);
        }
        formData.append("status", values.status);
        formData.append("url", values.url);

        await addNewMenu(formData);

    }

    return (
        <>
            <TitlePage
                name="ایجاد منو"
                sitemapPage="بخش محتوایی / منو ها/ ایجاد  منو"
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
                validationSchema={CreateMenuSchema}
                handlerSubmit={handlerSubmit} >
                <Input name='name' title={'نام منو'} type='text' placeholder={'صفحه اصلی'} />
                <Input name='url' placeholder={'http://toplearn'} title="آدرس" />
                <Input name='parent_id' title={' دسته والد  '} select={'select'} className={'text-left'} >
                    <>
                        <option value=''> اتتخاب والد  </option>

                        {parent_id && parent_id.map(({ id, name }) => (
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
                    ایجاد  منو
                </Button>
            </InputContainer>


        </>
    )
}
export default CreateMenu;