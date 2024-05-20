'use client'
import { Button, Input, Label } from "@/components/dashboard/inputs";
import { Form, Formik } from "formik";
import Image from "next/image";
import Link from "next/link";
import logo from '../../../../public/image/logoOne.jpg'
import LoginRegisterSchema from "@/validation/auth/loginRegisterValidation";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import useAuth from "@/hooks/useAuth";



const LoginRegister = () => {
    const router = useRouter()

    const { user, error } = useSelector((state) => state.auth);
    const { login } = useAuth();



    const initialValues = {
        id: ''
    }

    const handlerSubmit = async (values) => {
        // const csrf = () => axios.get('/sanctum/csrf-cookie')
        const formData = new FormData();
        formData.append('id', values.id);
        await login(formData);
    }
    if (user) {
        return router.push('/')
    }

    return (
        <>

            <section className="w-full h-full m-5">

                <section className=" w-3/4 lg:w-2/6 md:w-3/4 xl:w-2/6 h-3/4 border mx-auto container   shadow-lg shadow-gray-200 rounded-lg m-4">
                    <section className="flex flex-col justify-between items-center">
                        <section className="m-5">
                            <Image className="rounded-full" alt="logo" src={logo} style={{ width: '100px', height: '100px' }} />
                        </section>
                        <h1 className="font-bold text-lg p-3" >ورود|ثبت نام</h1>
                        <section className="flex flex-col justify-between items-center w-full">
                            <section className="w-full  m-3">

                                <Formik
                                    onSubmit={(values) => handlerSubmit(values)}
                                    initialValues={initialValues}
                                    validationSchema={LoginRegisterSchema}
                                    className={'m-3'}
                                >

                                    <Form className="flex flex-col justify-center items-center mx-auto">
                                        <Label className={'w-3/4   mr-3 '}>ورود</Label>
                                        <Input name={'id'} className={'w-full mx-auto'} type={'text'} containerClass={'mx-auto  flex flex-col items-start '} placeholder={'شماره موبایل یا ایمیل'} />
                                        <Button className={'w-3/4 mx-auto bg-red-600 text-white px-10 py-3 m-5 rounded-lg'}>ورود به حساب</Button>
                                    </Form>
                                </Formik>
                                <section className="flex justify-center m-3">
                                    <p className="text-xs text-gray-500">ورود شما به معنای پذیرش  <Link href={'/'} className={'text-sky-500'}> شرایط  لافایت  </Link> و <Link href={'/'} className={'text-sky-500'}>قوانین حریم‌خصوصی</Link>  است</p>
                                </section>
                            </section>
                        </section>
                    </section>

                </section>

            </section>

        </>
    )
}
export default LoginRegister;




