'use client'
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { setErrorData } from "@/store/reducers/dashboard/UtilSlice";

const ResponseError = ({data}) => {
    const { errorData } = useSelector((state) => state.util);
    const router = useRouter();
    const dispatch = useDispatch();
    useEffect(() => {

        if (errorData !== null) {

           if (errorData?.status === 200) {
            dispatch(setErrorData(null));
            router.back();
            
            
           }            

            if (!data?.success) {
                toast.error(' خطایی پیش آمده است ', {
                    position: toast.POSITION.TOP_LEFT,
                    rtl: true
                })
            }

        } 
    }, [errorData]);

    //server errors
    return (
        <>
            {data?.success  ?
                <section style={{ borderColor: 'red', backgroundColor:'rgba(209, 29, 29, 0.2)' , width:'75%'     }} className="flex items-center w-3/4 p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 " >
                    <div>
                        <ul className='text-right  px-5 '>
                            { !data?.success ? Object.entries(data?.errors).map(([key, value]) => (
                                <li className='text-red-500 list-disc' key={key} >  {value}</li>
                            ))
                                : null
                            }

                        </ul>
                    </div>
                </section> : null}
        </>


    )
}
export default ResponseError;