'use client'
import Button from '@/components/dashboard/inputs/Button'
import { useRouter } from 'next/navigation'
import TitlePage from '@/components/dashboard/TitlePage'
import {   useEffect } from 'react'
 
 
import {  Input  } from '@/components/dashboard/inputs'
 
import { setIsError, setIsLoading, setIsSuccess } from '@/store/reducers/dashboard/UtilSlice'
import InputContainer from '@/components/dashboard/inputs/InputContainer'
 
import JalaliDate from '@/components/dashboard/inputs/JalaliDate'
import { useGetCopanQuery, useGetUsersQuery, useUpdateCopanMutation } from '@/lib/market/copanApi'
import CopanSchema from '@/validation/doshboard/market/discount/copan/copanValidation'
import { useDispatch  } from 'react-redux'
import { setErrorData ,setSuccessMessage} from '@/store/reducers/dashboard/UtilSlice'
const UpdateCopan = ({ params }) => {
    const { data: copan = {}, isLoading, isSuccess, isError } =  useGetCopanQuery(params);
  
    const { data: users = [] } =  useGetUsersQuery();
    const router = useRouter();
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(setIsLoading(isLoading));
        dispatch(setIsSuccess(isSuccess));
        dispatch(setIsError(isError));     
     } , [isLoading ,isSuccess ,isError])
 
    const initialValues = {
        code: `${copan.data?.code}`,
        user_id: `${copan.data?.user_id ? copan.data?.user_id :''}`,  
        discount_ceiling: `${copan.data?.discount_ceiling}`,     
        amount_type: `${copan.data?.amount_type}`,
        status: `${copan.data?.status}`,
        type: `${copan.data?.type}`,
        amount: `${copan.data?.amount}`,
        start_date: `${copan.data?.start_date}`,
        end_date: `${copan.data?.end_date}`,

        


    }
    const [UpdateCopan, { data , isLoading: isSend ,isSuccess:Success }] =  useUpdateCopanMutation()

  
    const handlerSubmit = async (values) => {
        // Create an object of formData
        let formData = new FormData();
        // Update the formData object
        formData.append('_method', 'PUT');
        if (values.user_id) {
            formData.append("user_id", values.user_id);
        }   
        formData.append("discount_ceiling", values.discount_ceiling);
        formData.append("code", values.code);
        formData.append("amount_type", values.amount_type);
        formData.append("status", values.status);
        formData.append("type", values.type);
        formData.append("amount", values.amount);
        formData.append("start_date", values.start_date);
        formData.append("end_date", values.end_date);


        
        await UpdateCopan({ id: params, formData });
    }
  
    useEffect(() => {
        dispatch(setErrorData(data)); 
        if(Success){
        dispatch(setSuccessMessage('تخفیف با موفقیت ویرایش شد.')); 
        }
    }, [data,  Success]);

    return (
        <>
            <TitlePage
                name="ویرایش  کپن"
                sitemapPage=' بخش فروش /ویترین /  تخفیف   ها / کپن ها / ویرایش کپن ها    '            >
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
              
                <Input name='user_id' title={' دسته کاربر  '} select={'select'} className={'text-left'} >
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
                        ویرایش  تخفیف
                    </Button>
                </InputContainer>
         
        </>
    )
}
export default UpdateCopan;
