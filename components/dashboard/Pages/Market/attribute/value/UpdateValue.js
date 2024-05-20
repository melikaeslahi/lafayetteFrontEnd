'use client'
import Button from '@/components/dashboard/inputs/Button'
import { useRouter } from 'next/navigation'
import TitlePage from '@/components/dashboard/TitlePage'
import {   useEffect } from 'react'
import { useDispatch } from 'react-redux'
 
import {  Input  } from '@/components/dashboard/inputs'
import { setIsError, setIsLoading, setIsSuccess } from '@/store/reducers/dashboard/UtilSlice'
import InputContainer from '@/components/dashboard/inputs/InputContainer'
import EditValueSchema from '@/validation/doshboard/market/categoryValue/editValueValidation'
import { useGetValueQuery, useProductsAndAttributesQuery, useUpdateValueMutation } from '@/lib/market/categoryValueApi'
import { setErrorData ,setSuccessMessage} from '@/store/reducers/dashboard/UtilSlice'

const UpdateValue = ({ params }) => {
    const { data: value = {}, isLoading, isSuccess, isError } =  useGetValueQuery({id:params.id});
    const { data: res = [] } =   useProductsAndAttributesQuery();
   
   
    const router = useRouter();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setIsLoading(isLoading));
        dispatch(setIsSuccess(isSuccess));
        dispatch(setIsError(isError));
    }, [isLoading, isSuccess, isError])
 
    const initialValues = {
        value: `${isSuccess && JSON.parse(value.data?.value)?.value}`,
        price_increase: `${isSuccess && JSON.parse(value.data?.value)?.price_increase}`,   
        product_id: `${value.data?.product_id ?value.data?.product_id :'' }`,

      type:`${value.data?.type}`,
     
    }
    const [UpdateValue, { data , isLoading: isSend ,isSuccess:Success }] =  useUpdateValueMutation()


    const handlerSubmit = async (values) => {
        // Create an object of formData
        let formData = new FormData();
        // Update the formData object
        formData.append('_method', 'PUT');
        formData.append("value", values.value);
        formData.append("type", values.type);

        formData.append("product_id", values.product_id);
     
        formData.append("price_increase", values.price_increase);
        await UpdateValue({ attribute:params.attribute , id: params.id, formData });
    }
 
    useEffect(() => {
        dispatch(setErrorData(data)); 
        if(Success){
        dispatch(setSuccessMessage(' مقدار ویژگی با موفقیت ویرایش شد.')); 
        }
    }, [data, Success]);

    return (
        <>
            <TitlePage
                name="ویرایش  ویژگی"
                sitemapPage=' بخش فروش /ویترین /  فرم کالا  ها / ویژگی ها /ویرایش ویژگی     '            >
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
                validationSchema={EditValueSchema}
                handlerSubmit={handlerSubmit}>
                <Input name='value' title={' مقدار'} type='text' placeholder={'مثل:xl'} />
                <Input name='price_increase' title={' افزایش قیمت'} type='text' placeholder={'مثل: 25000'} />


                <Input name='product_id' title={' دسته والد  '} select={'select'} className={'text-left'} >
                    <>
                        <option> اتتخاب والد  </option>

                        {res.products?.map(({ id, name }) => (
                            <option key={id} value={id} >
                                {' '}
                                {name}{' '}
                            </option>
                        ))}
                    </>
                </Input>
                  <Input name='type' title={'   تایپ   '} select={'select'} className={'text-left'} >
                    <>
                        <option> اتتخاب تایپ  </option>
                        <option value='0'>   ساده    </option>
                        <option value='1'>  انتخابی    </option>    
                    </>
                </Input>
               

                <Button
                 disabled={isSend ? true : false}
                    type="submit"
                    className="text-white hover:bg-clifford hover:text-pallete bg-pallete py-4 px-8 basis-1/2 rounded-lg">
                    {' '}
                    ویرایش    ویژگی
                </Button>
            </InputContainer>

        </>
    )
}
export default UpdateValue;
