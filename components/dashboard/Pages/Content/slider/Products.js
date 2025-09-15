'use client'
import Button from '@/components/dashboard/inputs/Button'
import { useRouter } from 'next/navigation'
import TitlePage from '@/components/dashboard/TitlePage'
import { useState, useEffect } from 'react'
 
import {   MultipleSelect  } from '@/components/dashboard/inputs'
import { setIsError, setIsLoading, setIsSuccess } from '@/store/reducers/dashboard/UtilSlice'
import InputContainer from '@/components/dashboard/inputs/InputContainer'
import { useDispatch } from 'react-redux'
import { useAddNewProductsMutation, useGetProductsQuery } from '@/services/content/sliderApi'
import ProductSliderSchema from '@/validation/doshboard/content/slider/productsValidation'
 
import { setErrorData ,setSuccessMessage} from '@/store/reducers/dashboard/UtilSlice'


const CreateSliderProducts = ({params}) => {
    const { data:    products = {}, isLoading, isSuccess, isError } =    useGetProductsQuery(params);
    const dispatch = useDispatch();
    const [productsOption , setProductsOption] = useState([]);
    const [ defaultOtp , setDefaultOtp] = useState([]);

    useEffect(()=>{
        dispatch(setIsLoading(isLoading));
        dispatch(setIsSuccess(isSuccess));
        dispatch(setIsError(isError));     
     } , [isLoading ,isSuccess ,isError])
    const router = useRouter();
    
 useEffect(() => {
    if(isSuccess){
        let  productsOtp =  products.products?.map((product)=>{
            return {
                 value : product.id,
                 label : product.name
             }
         })
         setProductsOption(productsOtp);
         
         let   defaultVal =  products.slider.products?.map((product)=>{
            return {
                 value : product.id,
                 label : product.name
             }
         })
          setDefaultOtp(defaultVal);
         
    }
   }, [products]);

 
 
    const initialValues = {
        products:[],
    }
    const [addNewProducts, { data , isLoading: isSend ,isSuccess:Success }] =  useAddNewProductsMutation()
    useEffect(() => {
        dispatch(setErrorData(data)); 
        if(Success){
        dispatch(setSuccessMessage(' محصولات با موفقیت  اضافه شدند  .')); 
        }
    }, [data,  Success]); 
    const handlerSubmit = async (values) => {

        
        const formData = new FormData();
     
        formData.append("products[]", values.products);
        

        await addNewProducts({formData , params});

    }

    return (
        <>
            <TitlePage
                name="ایجاد محصولات اسلایدر "
                sitemapPage='بخش   محتوایی /   اسلایدر ها /   ایجاد    محصولات اسلایدر '
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
                className={'flex flex-col'}
                initialValues={initialValues}
                validationSchema={ProductSliderSchema}
                handlerSubmit={handlerSubmit}>
            

                
              


             
                <MultipleSelect 
                name={'products'}
                 placeholder={'محصولات مورد نظر را انتخاب نمایید'}
                 defaultValue={defaultOtp}
                options={productsOption} 
                title=' محصولات ها'
               
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
export default CreateSliderProducts;