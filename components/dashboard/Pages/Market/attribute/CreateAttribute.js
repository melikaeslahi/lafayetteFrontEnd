'use client'
import Button from '@/components/dashboard/inputs/Button'
import { useRouter } from 'next/navigation'
import TitlePage from '@/components/dashboard/TitlePage'
import {   useEffect } from 'react'
 
import {  Input  } from '@/components/dashboard/inputs'
 
import InputContainer from '@/components/dashboard/inputs/InputContainer'
import CreateAttributeSchema from '@/validation/doshboard/market/categoryAttribute/createAttributeValidation'
import { useAddNewAttributeMutation, useGetCategoriesQuery } from '@/lib/market/categoryAttributeApi'
import { useDispatch  } from 'react-redux'
import { setErrorData ,setSuccessMessage} from '@/store/reducers/dashboard/UtilSlice'


const CreateAttribute = () => {

    const router = useRouter();
    const { data: categories = [] } =  useGetCategoriesQuery();
    const dispatch =useDispatch();
   

    const initialValues = {
        name: '',
        category_id: '',
        unit: '',

    }
    const [addNewAttribute, { data , isLoading: isSend ,isSuccess:Success }] =  useAddNewAttributeMutation()
    useEffect(() => {
        dispatch(setErrorData(data)); 
        if(Success){
        dispatch(setSuccessMessage('ویژگی با موفقیت ایجاد شد.')); 
        }
    }, [data, Success]);

    const handlerSubmit = async (values) => {

        // Create an object of formData
        const formData = new FormData();
        // Update the formData object

        formData.append("name", values.name);
        formData.append("unit", values.unit);
        formData.append("category_id", values.category_id);



        await addNewAttribute(formData);

    }

    return (
        <>
            <TitlePage
                name="ایجاد  فرم"
                sitemapPage='بخش فروش /ویترین /   فرم کالا   /ایجاد    فرم کالا'
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
                validationSchema={CreateAttributeSchema}
                handlerSubmit={handlerSubmit}>

                <Input name='name' title={' فرم  '} type='text' placeholder={'مثل: تیشرت'} />
                <Input name='unit' title={'  واحد  '} type='text' placeholder={'مثل:  سانتی متر'} />
                 
                <Input name='category_id' title={' دسته  بندی  '} select={'select'} className={'text-left'} >
                    <>
                        <option> اتتخاب دسته  </option>

                        { categories.categories?.map(({ id, name }) => (
                            <option key={id} value={id} >
                                {' '}
                                {name}{' '}
                            </option>
                        ))}
                    </>
                </Input>
                 
            
                <Button
                 disabled={isSend ? true : false}
                    type="submit"
                    className="text-white hover:bg-clifford hover:text-pallete bg-pallete py-4 px-8 basis-1/2 rounded-lg">
                    {' '}
                    ایجاد   فرم
                </Button>

            </InputContainer>

        </>
    )
}
export default CreateAttribute;