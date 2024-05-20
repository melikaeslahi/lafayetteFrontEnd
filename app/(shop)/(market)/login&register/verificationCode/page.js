'use client'
import { Button, Input, Label } from "@/components/dashboard/inputs";
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form, Formik } from "formik";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import logo from '../../../../../public/image/logoOne.jpg'
import ConfirmSchema from "@/validation/auth/confirmValidation";
import { useDispatch, useSelector } from "react-redux";
import useAuth from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import SuccessAlert from "@/components/dashboard/inputs/SuccessAlert";
import { setSuccessMessage } from "@/store/reducers/dashboard/UtilSlice";
const VerificationCode = () => {


    const [seconds, setSeconds] = useState(59);
    const [minutes, setMinutes] = useState(1);
    const router = useRouter();
    const dispatch = useDispatch();
    const { data, user, error } = useSelector((state) => state.auth);
    const { loginConfirm, resendOtpCode } = useAuth();
 


    useEffect(() => {
        if (data) {

            const created_at = new Date(data.otp?.created_at);
            created_at.setMinutes(created_at.getMinutes() + 2);
            const currentTime = new Date();
            const timer = created_at.getTime() - currentTime.getTime();
            const countDownDate = new Date().getTime() + timer;
            const now = new Date().getTime();

            var distance = countDownDate - now;

            var min = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            var second = Math.floor((distance % (1000 * 60)) / 1000);

            setSeconds(second);
            setMinutes(min);

            if (data.otp?.type === 1) {
                dispatch(setSuccessMessage(`کد تایید  به ایمیل ${data.otp?.login_id} ارسال شد `))
            } else {
                dispatch(setSuccessMessage(`   کد تایید  به شماره ی${data.otp?.login_id} ارسال شد`))

            }


        }
    }, [data])


    useEffect(() => {
        const interval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            }

            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(interval);
                } else {
                    setSeconds(59);
                    setMinutes(minutes - 1);
                }
            }
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, [seconds]);


    const initialValues = {
        otp: ''
    }

    const handlerSubmit = (values) => {
        const formData = new FormData();
        formData.append('otp', values.otp);
        loginConfirm(formData);

    }

    const handlerResendOTP = () => {
        resendOtpCode();




    }

    if (user) {
        return router.push('/')
    }
    return (<>
        <section className="w-full h-full m-5">

            <section className="relative w-3/4 lg:w-2/6 md:w-3/4 xl:w-2/6 h-3/4 border mx-auto container   shadow-lg shadow-gray-200 rounded-lg m-4">

                <section className="absolute right-0 top-0 m-2">
                    <button type="button" onClick={() => router.back()} > <FontAwesomeIcon className="text-xl font-extrabold  p-3" icon={faArrowRightLong} />  </button>
                </section>
                <section className="flex flex-col justify-between items-center">
                    <section className="m-5">
                        <Image className="rounded-full" alt="logo" src={logo} style={{ width: '100px', height: '100px' }} />
                    </section>
                    <h1 className="font-bold text-lg p-3" >  کد تایید  </h1>
                    <SuccessAlert TimeDisable={true} />

                    <section className="flex flex-col justify-between items-center w-full">
                        <section className="w-full  m-3">

                            <Formik
                                onSubmit={(values) => handlerSubmit(values)}
                                initialValues={initialValues}
                                validationSchema={ConfirmSchema}
                                className={'m-3'}
                            >

                                <Form className="flex flex-col justify-center items-center mx-auto">

                                    <Label className={'w-3/4   mr-3 '}> کد تایید </Label>
                                    <Input name={'otp'} className={'w-full mx-auto'} type={'text'} containerClass={'mx-auto  flex flex-col items-start '} placeholder={'  کد تایید  '} />
                                    {/* <section className="flex items-center   p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 " >
                                        <div>
                                            <p className='text-red-700'>
                                                {error?.otp}</p>
                                        </div>
                                    </section> */}
                                    <Button className={'w-3/4 mx-auto bg-red-600 text-white px-10 py-3 m-5 rounded-lg'}>    تایید  </Button>
                                    {seconds > 0 || minutes > 0 ? (
                                        <p className="text-red-600 m-2">
                                            ارسال مجدد تا: {minutes < 10 ? `0${minutes}` : minutes}:
                                            {seconds < 10 ? `0${seconds}` : seconds}
                                        </p>) : <Button disabled={seconds > 0 || minutes > 0} onClick={() => { handlerResendOTP() }} className={'w-3/4 mx-auto bg-red-600 text-white px-10 py-3 m-5 rounded-lg'}>     ارسال مجدد کد  </Button>
                                    }
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
    </>)
}
export default VerificationCode;