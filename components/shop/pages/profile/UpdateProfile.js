 
 
 
import {  Input  } from "@/components/dashboard/inputs";
import Modal from "@/components/shop/Modal";
import { useUpdateProfileMutation } from "@/lib/customer/profile/profileApi";
 
import { modalOpenClose, setErrorData, setHandlerModal, setSuccessMessage } from "@/store/reducers/dashboard/UtilSlice";
import ProfileSchema from "@/validation/customer/profile/profileValidation";
 
 
import { Form, Formik } from "formik";
 
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
const UpdateProfile = () => {

    const { isOpenModal , isUpdate } =  useSelector(state => state.util);
    const { user } = useSelector(state => state.auth);
    const [updateInfo , {data}] = useUpdateProfileMutation();
      

    const dispatch =  useDispatch();
     

     useEffect(()=>{
      if(data?.status === 200 ){
       dispatch(setSuccessMessage('اطلاعات حساب شما با موفقیت ویرایش شد'))
       dispatch(setErrorData(null));

      }else if(data?.success === false){
        dispatch(setErrorData(data))
      }

     } , [data] )
    // const initialValues ={
    //     first_name: `${user.user?.first_name ?? ''}`,
    //     last_name: `${user.user?.last_name ?? ''}`,
    //     email: `${user.user?.email ?? ''}`,
    //     mobile: `${user.user?.mobile ?? ''}`,
    //     national_code: `${user.user?.national_code ?? ''}`,
    //     profile_photo_path: '',
    // }

    const initialValues ={
        first_name: ``,
        last_name: ``,
        email: ``,
        mobile: ``,
        national_code: ``,
        profile_photo_path: '',
    }

    const handlerSubmit = async (values) => {
       console.log(values)
        const formData = new FormData();

        formData.append('_method' , 'PUT');
        if(values.first_name){

            formData.append('first_name' , values.first_name);
        }
        if(values.last_name){

            formData.append('last_name' , values.last_name);
        }
        if(values.email){

            formData.append('email' , values.email);
        }
        if(values.mobile){

            formData.append('mobile' , values.mobile);
        }
        if(values.national_code){

            formData.append('national_code' , values.national_code);
        }
        if(values.profile_photo_path){

            formData.append('profile_photo_path' , values.profile_photo_path);
        }
        


         await updateInfo(formData);
  
        dispatch(modalOpenClose(false));
    }

 

    return (
        <>
            {isOpenModal ? <Modal title={'ویرایش  اطلاعات'}  >
                <Formik
                    initialValues={initialValues}
                    validationSchema={ProfileSchema}
                    onSubmit={(values) => handlerSubmit(values) }
                  
                >
                    <Form className="grid grid-flow-row grid-cols-1 md:grid-flow-col md:grid-cols-1 lg:grid-flow-row lg:grid-cols-2 xl:grid-cols-2 gap-2">
                        <Input title='نام    ' type={'text'} name='first_name' placeholder={'  نام '} />
                        <Input title=' نام خانوادگی    ' type={'text'} name='last_name' placeholder={'نام خانوادگی'} />
                        <Input name={'profile_photo_path'} title={'تصویر'} >
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
                        <Input title='کد  ملی' type={'text'} name='national_code' placeholder={'کد ملی'} />
                        <Input title='شماره موبایل    ' type={'text'} name='mobile' placeholder={'شماره موبایل'} />

                        <Input title=' ایمیل' type={'email'} name='email' placeholder={'آدرس ایمیل'} />

                        <button type="submit" className="bg-clifford text-pallete border rounded-lg border-pallete px-4 py-1 m-2" >  ویرایش آدرس </button>
                        <button
                            className="bg-white text-pallete border rounded-lg border-pallete px-4 py-1 m-2"
                            onClick={() => dispatch(modalOpenClose(false))}>

                            بستن
                        </button>
                    </Form>

                </Formik>
            </Modal> : null}
        </>
    )
}
export default UpdateProfile;