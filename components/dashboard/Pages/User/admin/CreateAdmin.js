'use client'
import Button from '@/components/dashboard/inputs/Button'
import { useRouter } from 'next/navigation'
import TitlePage from '@/components/dashboard/TitlePage'
import {   useEffect } from 'react'
 
import {  Input  } from '@/components/dashboard/inputs'
 
import InputContainer from '@/components/dashboard/inputs/InputContainer'
import { useAddNewAdminMutation } from '@/lib/user/adminUserApi'
import AdminSchema from '@/validation/doshboard/user/adminUser/adminValidation'
import { useDispatch  } from 'react-redux'
import { setErrorData ,setSuccessMessage} from '@/store/reducers/dashboard/UtilSlice'


const CreateAdmin = () => {
 
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
        password_confirmation: ''
    }
    const [addNewAdmin, { data , isLoading: isSend ,isSuccess:Success }] =  useAddNewAdminMutation()
    useEffect(() => {
        dispatch(setErrorData(data)); 
        if(Success){
        dispatch(setSuccessMessage('  ادمین با موفقیت ایجاد شد.')); 
        }
    }, [data,  Success]);

    const handlerSubmit = async (values) => {

        
        const formData = new FormData();
     
        formData.append("image", values.image);
        formData.append("first_name", values.first_name);
        formData.append("last_name", values.last_name);
        formData.append("email", values.email);
        formData.append("mobile", values.mobile);
        formData.append("password", values.password);
        formData.append("password_confirmation", values.password_confirmation);
        formData.append("activation", values.activation);
        formData.append("status", values.status);


        await addNewAdmin(formData);

    }

    return (
        <>
            <TitlePage
                name="ایجاد ادمین"
                sitemapPage='بخش  کاربران /  ادمین /   ایجاد  ادمین '
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
                validationSchema={AdminSchema}
                handlerSubmit={handlerSubmit}>

                <Input name='first_name' title={' نام  '} type='text' placeholder={'مثل: ملیکا'} />
                <Input name='last_name' title={'     نام خانوداگی  '} type='text' placeholder={'مثل:  ملیکا اصلاحی'} />

                <Input name='email' title={' ایمیل '} type='email' placeholder={'مثل: melika.eslahi@gmail.com'} />

                <Input name='mobile' title={' شماره موبایل '} type='text' placeholder={'مثل:  09121111111'} />

                <Input name='status' title={'وضعیت'} select={'select'} className={'text-left'} >
                    <>
                        <option value=''> اتتخاب  وضعیت فعالیت  </option>
                        <option value='1'>  فعال     </option>
                        <option value='0'>   غیر فعال     </option>
                    </>
                </Input>

                <Input name='activation' title={'وضعیت فعال سازس'} select={'select'} className={'text-left'} >
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
                <Input name='password' title={'  رمز عبور   '} type='password' />
                <Input name='password_confirmation' title={'  تکرار رمز عبور '} type='password' />

                <Button
                 disabled={isSend ? true : false}
                    type="submit"
                    className="text-white hover:bg-clifford hover:text-pallete bg-pallete py-4 px-8 basis-1/2 rounded-lg">
                    {' '}
                    ایجاد ادمین
                </Button>

            </InputContainer>

        </>
    )
}
export default CreateAdmin;