'use client'
import Button from '@/components/dashboard/inputs/Button'
import { useRouter } from 'next/navigation'
import TitlePage from '@/components/dashboard/TitlePage' 
import {   useEffect } from 'react'
 
import { Editor, Input  } from '@/components/dashboard/inputs'
import InputContainer from '@/components/dashboard/inputs/InputContainer'
import { useAddToStoreMutation } from '@/services/market/storeApi'
import CreateStoreSchema from '@/validation/doshboard/market/store/createStoreValidation'
import { useDispatch  } from 'react-redux'
import { setErrorData ,setSuccessMessage} from '@/store/reducers/dashboard/UtilSlice'


const AddToStore = ({params}) => {
    
    const router = useRouter();
    const dispatch =useDispatch();
   
 
    const initialValues = {
        receiver: '',
        deliverer: '',  
        description: '',
        marketable_number: '',
        
    }
    const [ addToStore, { data  , isLoading: isSend ,isSuccess:Success}] =  useAddToStoreMutation()
    useEffect(() => {
        dispatch(setErrorData(data)); 
        if(Success){
        dispatch(setSuccessMessage(' تعداد محصولل با موفقیت  تغییر یافت.')); 
        }
    }, [data,  Success]);

    const handlerSubmit = async (values) => {

        // Create an object of formData
        const formData = new FormData();
        // Update the formData object
        formData.append("receiver", values.receiver);
        formData.append("deliverer", values.deliverer);
       
        formData.append("description", values.description);
        formData.append("marketable_number", values.marketable_number);
         

        await addToStore({ params, formData});

    }

    return (
        <>
            <TitlePage
                name="ایجاد انبار  "
                sitemapPage='بخش فروش /ویترین / انبار /ایجاد انبار'
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
                validationSchema={CreateStoreSchema}
                handlerSubmit={handlerSubmit}>
         
            <Input name='receiver' title={' دریافت کننده'} type='text' placeholder={'   مثل : ملیکا اصلاحی  '} />
            <Input name='deliverer' title={'  تحویل دهنده  '} type='text' placeholder={'   مثل : ملیکا اصلاحی  '} />
            <Input name='marketable_number' title={'   تعداد    '} type='text' placeholder={'   مثل :  15    '} />
   
            <Editor name='description' title='   توضیحات ' />
            <Button
             disabled={isSend ? true : false}
                type="submit"
                className="text-white hover:bg-clifford hover:text-pallete bg-pallete py-4 px-8 basis-1/2 rounded-lg">
                {' '}
                ایجاد انبار
            </Button>

            </InputContainer>

        </>
    )
}
export default AddToStore;