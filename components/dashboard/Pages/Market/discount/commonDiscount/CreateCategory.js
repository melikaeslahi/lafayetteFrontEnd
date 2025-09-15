'use client'
import Button from '@/components/dashboard/inputs/Button'
import { useRouter } from 'next/navigation'
import TitlePage from '@/components/dashboard/TitlePage' 
import {   useEffect } from 'react'
 
import {  Input  } from '@/components/dashboard/inputs'
import InputContainer from '@/components/dashboard/inputs/InputContainer'
import { useAddNewCommonDiscountMutation } from '@/services/market/commonDiscountApi'
import JalaliDate from '@/components/dashboard/inputs/JalaliDate'
 
import { useDispatch  } from 'react-redux'
import { setErrorData ,setSuccessMessage} from '@/store/reducers/dashboard/UtilSlice'
import CommonDiscountSchema from '@/validation/doshboard/market/discount/commonDiscount/commonDiscontValidation'


const CreateCommonDiscount = () => {
 
    const router = useRouter();
 
    const dispatch =useDispatch();
    
    const initialValues = {
        title: '',
        percentage: '',
        discount_ceiling: '',
        minimal_order_amount: '',
        status: '',
        start_date: '',
        end_date: ''
    }
    const [addNewCommonDiscount, { data , isLoading: isSend ,isSuccess:Success }] =  useAddNewCommonDiscountMutation()
    useEffect(() => {
        dispatch(setErrorData(data)); 
        if(Success){
        dispatch(setSuccessMessage('تخفیف با موفقیت ایجاد شد.')); 
        }
    }, [data, Success]);

    const handlerSubmit = async (values) => {

        // Create an object of formData
        const formData = new FormData();
        
        formData.append("title", values.title);
        formData.append("percentage", values.percentage);
        formData.append("discount_ceiling", values.discount_ceiling);
        formData.append("minimal_order_amount", values.minimal_order_amount);
        formData.append("status", values.status);
        formData.append("start_date", values.start_date);
        formData.append("end_date", values.end_date);
        await addNewCommonDiscount(formData);

    }

    return (
        <>
            <TitlePage
                name="ایجاد  تخفیف عمومی"
                sitemapPage='بخش فروش /ویترین /   تخفیف ها   /ایجاد  تخفیف عمومی'
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
                validationSchema={CommonDiscountSchema}
                handlerSubmit={handlerSubmit}>
         
       
           
            <Input name='title' title={'عنوان تخفیف'} type='text' placeholder={' مثل : تخفیف پاییز'} />
                <Input name='percentage' title={' درصد  تخفیف'} type='text' placeholder={' مثل : ٪20'} />
                <Input name='discount_ceiling' title={'حداکثر مبلغ تخفیف'} type='text' placeholder={' مثل : 20000'} />
                <Input name='minimal_order_amount' title={'سقف خرید کاربر'} type='text' placeholder={' مثل : 20000'} />
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
                ایجاد  تخفیف 
            </Button>

            </InputContainer>

        </>
    )
}
export default CreateCommonDiscount;