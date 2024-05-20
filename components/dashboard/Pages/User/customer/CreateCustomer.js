'use client'
import Button from '@/components/dashboard/inputs/Button'
import { useRouter } from 'next/navigation'
import TitlePage from '@/components/dashboard/TitlePage' 
import {   useEffect } from 'react'
 
import {   Input } from '@/components/dashboard/inputs'
import InputContainer from '@/components/dashboard/inputs/InputContainer'
import { useAddNewCustomerMutation } from '@/lib/user/customerApi'
import CustomerSchema from '@/validation/doshboard/user/customer/CustomerValidation'
import { useDispatch  } from 'react-redux'
import { setErrorData ,setSuccessMessage} from '@/store/reducers/dashboard/UtilSlice'


const CreateCustomer = () => {
  
    const router = useRouter();
    const dispatch =useDispatch();
 
 
    const initialValues = {
        first_name: '',
        last_name: '',
        image: '',
        email: '',
        mobile: '',
        password: '',
        activation: '',
        confirm:''
    }
    const [addNewCustomer, { data , isLoading: isSend ,isSuccess:Success }] =  useAddNewCustomerMutation()
    useEffect(() => {
        dispatch(setErrorData(data)); 
        if(Success){
        dispatch(setSuccessMessage('  کاربر با موفقیت ایجاد شد.')); 
        }
    }, [data,  Success]);

    const handlerSubmit = async (values) => {

        // Create an object of formData
        const formData = new FormData();
        // Update the formData object
        formData.append("image", values.image);
        formData.append("first_name", values.first_name);
        formData.append("last_name", values.last_name);
        formData.append("email", values.email);
        formData.append("mobile", values.mobile);
        formData.append("password", values.password);
        formData.append("confirm", values.confirm);
        formData.append("activation", values.activation);


        await addNewCustomer(formData);

    }

    return (
        <>
            <TitlePage
                name="ایجاد    مشتری"
                sitemapPage='بخش  کاربران / مشتریان /   ایجاد مشتری '
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
                validationSchema={CustomerSchema}
                handlerSubmit={handlerSubmit}>
         
            <Input name='first_name' title={' نام  '} type='text' placeholder={'مثل: ملیکا'} />
            <Input name='last_name' title={'     نام خانوداگی  '} type='text' placeholder={'مثل:  ملیکا اصلاحی'} />

            <Input name='email' title={' ایمیل '} type='email' placeholder={'مثل: melika.eslahi@gmail.com'} />
 
            <Input name='mobile' title={' شماره موبایل '} type='text' placeholder={'مثل:  09121111111'} />
            
            <Input name='activation' title={'وضعیت'} select={'select'} className={'text-left'} >
                <>
                    <option value=''> اتتخاب  وضعیت فعالیت  </option>
                    <option value='1'>  فعال     </option>
                    <option value='0'>   غیر فعال     </option>
                </>
            </Input>
           

            <Input name={'image'} title={'تصویر'} >
                {({ field, form }) => {
                    return (
                        <>
                            <input type='file'
                                accept='image/*'
                                onChange={(event) => {
                                    form.setFieldValue(field.name, event.target.files[0])
                                }}
                            />
                        </>
                    )
                }}
            </Input>
            <Input name='password' title={' شماره موبایل '} type='password'   />
            <Input name='confirm' title={' شماره موبایل '} type='password'   />
       
            <Button
             disabled={isSend ? true : false}
                type="submit"
                className="text-white hover:bg-clifford hover:text-pallete bg-pallete py-4 px-8 basis-1/2 rounded-lg">
                {' '}
                ایجاد مشتری
            </Button>

            </InputContainer>

        </>
    )
}
export default CreateCustomer;