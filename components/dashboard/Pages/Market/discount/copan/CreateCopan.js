'use client'
import Button from '@/components/dashboard/inputs/Button'
import { useRouter } from 'next/navigation'
import TitlePage from '@/components/dashboard/TitlePage'
import {   useEffect } from 'react'
 
import {   Input  } from '@/components/dashboard/inputs'
 
 
import InputContainer from '@/components/dashboard/inputs/InputContainer'
import { useAddNewCopanMutation, useGetUsersQuery } from '@/services/market/copanApi'
import JalaliDate from '@/components/dashboard/inputs/JalaliDate'
import CopanSchema from '@/validation/doshboard/market/discount/copan/copanValidation'

import { useDispatch  } from 'react-redux'
import { setErrorData ,setSuccessMessage} from '@/store/reducers/dashboard/UtilSlice'

const CreateCopan = () => {
    const { data:  users = [] } =  useGetUsersQuery();
    const router = useRouter();

    const dispatch =useDispatch();
 
    const initialValues = {
        code: '',
        user_id: '',
        type: '',
        discount_ceiling: '',
        amount_type: '',
        amount: '',
        status: '',
        start_date: '',
        end_date: ''

    }
    const [addNewCopan, { data , isLoading: isSend ,isSuccess:Success }] =  useAddNewCopanMutation()
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
        formData.append("code", values.code);
        formData.append("discount_ceiling", values.discount_ceiling);
        if (values.user_id) {
            formData.append("user_id", values.user_id);
        }
        formData.append("amount_type", values.amount_type);
        formData.append("type", values.type);

        formData.append("status", values.status);
        formData.append("amount", values.amount);
        formData.append("start_date", values.start_date);
        formData.append("end_date", values.end_date);


        await addNewCopan(formData);

    }

    return (
        <>
            <TitlePage
                name="ایجاد  کپن"
                sitemapPage='بخش فروش /ویترین / تخفیف   ها / کپن / ایجاد کپن'
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
                validationSchema={CopanSchema}
                handlerSubmit={handlerSubmit}>

                <Input name='code' title={'کد کپن '} type='text' placeholder={'   مثل: 112ME12  '} />
                <Input name='discount_ceiling' title={'  حداکثر تخفیف  '} type='text' placeholder={'   مثل:  20000 تومان  '} />
                <Input name='amount' title={'     میزان تخفیف  '} type='text' placeholder={'   مثل:  20000 تومان  '} />
              
                <Input name='user_id' title={'    کاربر  '} select={'select'} className={'text-left'} >
                    <>
                        <option> اتتخاب  کاربر  </option>

                        {  users.users?.map(({ id,  first_name , last_name }) => (
                            <option key={id} value={id} >
                                {' '}
                                {first_name + last_name}{' '}
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
                <Input name='amount_type' title={'   نوع تخفیف  '} select={'select'} className={'text-left'} >
                    <>
                        <option value=''>  انتخاب نوع تخفیف     </option>
                        <option value='0'>    درصدی     </option>
                        <option value='1'>       عددی       </option>
                    </>
                </Input>
                <Input name='type' title={'   تخفیف برای  '} select={'select'} className={'text-left'} >
                    <>
                        <option value=''> اتتخاب  برای  </option>
                        <option value='0'>   همه     </option>
                        <option value='1'>    کاربر خاص       </option>
                    </>
                </Input>
                <JalaliDate name={'start_date'} placeHolder={'تاریخ شروع'} title={'تاریخ شروع'} />
                <JalaliDate name={'end_date'} placeHolder={'تاریخ  پایان'} title={'تاریخ پایان'} />
                 
                <Button
                 disabled={isSend ? true : false}
                    type="submit"
                    className="text-white hover:bg-clifford hover:text-pallete bg-pallete py-4 px-8 basis-1/2 rounded-lg">
                    {' '}
                    ایجاد دسته بندی
                </Button>

            </InputContainer>

        </>
    )
}
export default CreateCopan;