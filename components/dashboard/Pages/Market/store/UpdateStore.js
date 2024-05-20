'use client'
import Button from '@/components/dashboard/inputs/Button'
import { useRouter } from 'next/navigation'
import TitlePage from '@/components/dashboard/TitlePage'
import {  useEffect } from 'react'
import { useDispatch } from 'react-redux'
 
import {   Input  } from '@/components/dashboard/inputs'
  
import { setIsError, setIsLoading, setIsSuccess } from '@/store/reducers/dashboard/UtilSlice'
import InputContainer from '@/components/dashboard/inputs/InputContainer'
 
import EditStoreSchema from '@/validation/doshboard/market/store/editStoreValidation'
import { useGetProductQuery, useUpdateStoreMutation } from '@/lib/market/storeApi'
 
import { setErrorData ,setSuccessMessage} from '@/store/reducers/dashboard/UtilSlice'
const UpdateStore = ({ params }) => {
    const { data: product = {}, isLoading, isSuccess, isError } =   useGetProductQuery(params);
    
 
    const router = useRouter();
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(setIsLoading(isLoading));
        dispatch(setIsSuccess(isSuccess));
        dispatch(setIsError(isError));     
     } , [isLoading ,isSuccess ,isError])
 
    const initialValues = {
        marketable_number: `${product.data?.marketable_number}`,
         sold_number: `${product.data?.sold_number}`,
        frozen_number: `${product.data?.frozen_number}`,
        
       
    }
    const [UpdateStore, { data , isLoading: isSend ,isSuccess:Success }] =  useUpdateStoreMutation()

  
    const handlerSubmit = async (values) => {
        // Create an object of formData
        let formData = new FormData();
        // Update the formData object
        formData.append('_method', 'PUT');
        
        formData.append("marketable_number", values.marketable_number);
        formData.append("sold_number", values.sold_number);
        formData.append("frozen_number", values.frozen_number);

        
        await UpdateStore({ id: params , formData });
    }
 
    useEffect(() => {
        dispatch(setErrorData(data)); 
        if(Success){
        dispatch(setSuccessMessage(' تعداد محصول با موفقیت تغییر یافت  .')); 
        }
    }, [data,  Success]);

    return (
        <>
            <TitlePage
                name="ویرایش   انبار"
                sitemapPage=' بخش فروش /ویترین /   انبار   /ویرایش انبار'            >
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
                    validationSchema={EditStoreSchema}
                    handlerSubmit={handlerSubmit}>
            <Input name='marketable_number' title={'  تعداد قابل فروش      '} type='text' placeholder={'   مثل :  15    '} />
            <Input name='sold_number' title={'    تعداد فروخته شده    '} type='text' placeholder={'   مثل :  15    '} />
            <Input name='frozen_number' title={'    تعداد رزرو شده    '} type='text' placeholder={'   مثل :  15    '} />
                    
                    <Button
                     disabled={isSend ? true : false}
                        type="submit"
                        className="text-white hover:bg-clifford hover:text-pallete bg-pallete py-4 px-8 basis-1/2 rounded-lg">
                        {' '}
                        ویرایش انبار
                    </Button>
                </InputContainer>
         
        </>
    )
}
export default UpdateStore;
