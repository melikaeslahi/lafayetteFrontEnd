'use client'
import Button from '@/components/dashboard/inputs/Button'
import { useRouter } from 'next/navigation'
import TitlePage from '@/components/dashboard/TitlePage'
import {   useEffect } from 'react'
 
import {   Input } from '@/components/dashboard/inputs'
import InputContainer from '@/components/dashboard/inputs/InputContainer'
import { useAddNewAmazingSaleMutation, useGetProductsQuery } from '@/lib/market/amazingSaleApi'
import JalaliDate from '@/components/dashboard/inputs/JalaliDate'
import { useDispatch  } from 'react-redux'
import { setErrorData ,setSuccessMessage} from '@/store/reducers/dashboard/UtilSlice'
import AmazingSaleSchema from '@/validation/doshboard/market/discount/AmazingSale/amazingSaleValidation'


const CreateAmazingSale = () => {
    const { data: products = [] } = useGetProductsQuery();
    const router = useRouter();

    const dispatch =useDispatch();

    const initialValues = {
        percentage: '',
        product_id: '',
        status: '',
        start_date: '',
        end_date: ''
    }
    const [addNewAmazingSale, { data , isLoading: isSend ,isSuccess:Success }] = useAddNewAmazingSaleMutation()
    useEffect(() => {
        dispatch(setErrorData(data)); 
        if(Success){
        dispatch(setSuccessMessage('تخفیف با موفقیت ایجاد شد.')); 
        }
    }, [data,  Success]);

    const handlerSubmit = async (values) => {

        // Create an object of formData
        const formData = new FormData();
        // Update the formData object
        formData.append("product_id", values.product_id);
        formData.append("percentage", values.percentage);
        formData.append("status", values.status);
        formData.append("start_date", values.start_date);
        formData.append("end_date", values.end_date);

        await addNewAmazingSale(formData);

    }

    return (
        <>
            <TitlePage
                name="ایجاد  فروش فوق العاده"
                sitemapPage='بخش فروش /ویترین /   تخفیف ها   / فروش فوق  العاده /ایجاد تخفیف    '
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
                validationSchema={AmazingSaleSchema}
                handlerSubmit={handlerSubmit}>

                
                <Input name='percentage' title={' درصد  تخفیف'} type='text' placeholder={' مثل : ٪20'} />
               
                <Input name='product_id' title={'  نام محصول    '} select={'select'} className={'text-left'} >
                    <>
                        <option> اتتخاب والد  </option>

                        {products.products?.map(({ id, name }) => (
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
                <JalaliDate name={'start_date'} placeHolder={'تاریخ شروع'} title={'تاریخ شروع'} />
                <JalaliDate name={'end_date'} placeHolder={'تاریخ  پایان'} title={'تاریخ پایان'} />



                <Button
                 disabled={isSend ? true : false}
                    type="submit"
                    className="text-white hover:bg-clifford hover:text-pallete bg-pallete py-4 px-8 basis-1/2 rounded-lg">
                    {' '}
                    ایجاد تخفیف
                </Button>

            </InputContainer>

        </>
    )
}
export default CreateAmazingSale;