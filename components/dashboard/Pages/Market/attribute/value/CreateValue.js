'use client'
import Button from '@/components/dashboard/inputs/Button'
import { useRouter } from 'next/navigation'
import TitlePage from '@/components/dashboard/TitlePage'
import {   useEffect } from 'react'
 
import {   Input  } from '@/components/dashboard/inputs'
 
import InputContainer from '@/components/dashboard/inputs/InputContainer'
import CreateValueSchema from '@/validation/doshboard/market/categoryValue/createValueValidation'
import { useAddNewValueMutation, useProductsAndAttributesQuery } from '@/lib/market/categoryValueApi'
import { useDispatch  } from 'react-redux'
import { setErrorData ,setSuccessMessage} from '@/store/reducers/dashboard/UtilSlice'


const CreateValue = ({params}) => {
 
    const router = useRouter();
    const { data: res = [] } =   useProductsAndAttributesQuery();
    const dispatch =useDispatch();
    const initialValues = {
        value: '',
        product_id: '',
        type: '',
        price_increase: ''

    }
    const [addNewValue, { data , isLoading: isSend ,isSuccess:Success }] =  useAddNewValueMutation()
    useEffect(() => {
        dispatch(setErrorData(data)); 
        if(Success){
        dispatch(setSuccessMessage('مقدار ویژگی با موفقیت ایجاد شد.')); 
        }
    }, [data, Success]);

    const handlerSubmit = async (values) => {

        // Create an object of formData
        const formData = new FormData();
        // Update the formData object

        formData.append("value", values.value);
        formData.append("product_id", values.product_id);
      
        formData.append("type", values.category_attribute_id);

        formData.append("price_increase", values.price_increase);
        

        await addNewValue( { params, formData});

    }

    return (
        <>
            <TitlePage
                name="ایجاد   ویژگی"
                sitemapPage='بخش فروش /ویترین / فرم کالاها / ویژگی ها    '
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
                validationSchema={CreateValueSchema}
                handlerSubmit={handlerSubmit}>

                <Input name='value' title={' مقدار'} type='text' placeholder={'مثل:xl'} />
                <Input name='price_increase' title={' افزایش قیمت'} type='text' placeholder={'مثل: 25000'} />

                 
                <Input name='product_id' title={' دسته والد  '} select={'select'} className={'text-left'} >
                    <>
                        <option> اتتخاب  محصول  </option>

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
                    ایجاد   ویژگی
                </Button>

            </InputContainer>

        </>
    )
}
export default CreateValue;