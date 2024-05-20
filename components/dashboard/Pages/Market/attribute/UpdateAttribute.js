'use client'
import Button from '@/components/dashboard/inputs/Button'
import { useRouter } from 'next/navigation'
import TitlePage from '@/components/dashboard/TitlePage'
import {  useEffect } from 'react'
import { useDispatch } from 'react-redux'
import {   Input  } from '@/components/dashboard/inputs'
import InputContainer from '@/components/dashboard/inputs/InputContainer'
import { setIsError, setIsLoading, setIsSuccess } from '@/store/reducers/dashboard/UtilSlice'
import EditAttributeSchema from '@/validation/doshboard/market/categoryAttribute/editAttributeValidation'
import { useGetAttributeQuery, useGetCategoriesQuery, useUpdateAttributeMutation } from '@/lib/market/categoryAttributeApi'
import { setErrorData ,setSuccessMessage} from '@/store/reducers/dashboard/UtilSlice'
const UpdateAttribute = ({ params }) => {
    const { data: categories = [] } =   useGetCategoriesQuery();
   
    const { data: attribute = {}, isLoading, isSuccess, isError } =  useGetAttributeQuery(params);
 
    const router = useRouter();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setIsLoading(isLoading));
        dispatch(setIsSuccess(isSuccess));
        dispatch(setIsError(isError));
    }, [isLoading, isSuccess, isError])
  
    const initialValues = {
        name: `${attribute.data?.name}`,
        unit: `${attribute.data?.unit}`,
        category_id: `${attribute.data?.category_id ? attribute.data?.category_id :''}`,
        
    }
    const [UpdateAttribute, { data  , isLoading: isSend ,isSuccess:Success}] =  useUpdateAttributeMutation()

  
    const handlerSubmit = async (values) => {
        // Create an object of formData
        let formData = new FormData();
        // Update the formData object
        formData.append('_method', 'PUT');
         
        formData.append("name", values.name);
        formData.append("unit", values.unit);

       
            formData.append("category_id", values.category_id);
      
        
        await UpdateAttribute({ id: params.id, formData });
    }
   
    useEffect(() => {
        dispatch(setErrorData(data)); 
        if(Success){
        dispatch(setSuccessMessage('ویژگی با موفقیت ویرایش شد.')); 
        }
    }, [data,  Success]);

    return (
        <>
            <TitlePage
                name="ویرایش    فرم"
                sitemapPage=' بخش فروش /ویترین /   فرم کالاها   /ویرایش    فرم'            >
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
                    validationSchema={EditAttributeSchema}
                    handlerSubmit={handlerSubmit}>
                       <Input name='name' title={' فرم  '} type='text' placeholder={'مثل: تیشرت'} />
                <Input name='unit' title={'  واحد  '} type='text' placeholder={'مثل:  سانتی متر'} />
                 
                <Input name='category_id' title={' دسته  بندی  '} select={'select'} className={'text-left'} >
                    <>
                        <option> اتتخاب دسته  </option>

                        {categories && categories.data?.map(({ id, name }) => (
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
                        ویرایش    فرم
                    </Button>
                </InputContainer>
         
        </>
    )
}
export default UpdateAttribute;
