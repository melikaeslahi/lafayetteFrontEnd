import Link from "next/link";
import { Button } from "../inputs";
import { usePathname } from "next/navigation";
import { useCanceledPaymentMutation, useReturnedPaymentMutation } from "@/lib/market/paymentApi";
import { useEffect } from "react";
import { useToast } from "react-toastify";

const SettingPaymentRecord=({id})=>{
    const pathname= usePathname();

    const [canceled , {data:dataCanceled}] =   useCanceledPaymentMutation();
    const [returned , {data:dataReturned}] =   useReturnedPaymentMutation();

    const handlerCanceled = (id) => {
        canceled(id);
    }

    const handlerReturned = (id) => {
        returned(id);
    }
    useEffect(() => {
        let message;   
            if (dataCanceled?.status === 200) {
               message =' پرداخت با موفقیت  باطل شد ' 
            }   else {  
               message=' خطایی پیش آمده است' 
            }
            useToast({dataStatus:dataCanceled , customMessage:message});
    }, [dataCanceled ])
 
     useEffect(() => {
          let message;
            if (dataReturned?.status ===  200 ) {
                 message=' پرداخت با موفقیت برگشت داده شد ' 
            }   else{
                 message=' خطایی پیش آمده است ' 
            }
         useToast({dataStatus:dataReturned , customMessage:message});
    }, [dataReturned])
    return(<>
     <Link href={`${pathname}/show/${id}`} className="py-2 px-4 bg-green-500 hover:bg-green-600  rounded text-white"> نمایش </Link>
            <Button type="button" onClick={() => {handlerCanceled(id) }}
             className={`py-2 px-4 bg-red-500 hover:bg-red-600 rounded text-white  `}
              disabled={row.status == 2 ? true : false} > باطل کردن </Button>
             <Button type="button" onClick={() => {handlerReturned(id)}}
             className={`py-2 px-4 bg-yellow-500 hover:bg-yellow-600 rounded text-white  `} 
             disabled={row.status == 3 ? true : false}> برگشت دادن </Button>
    </>);
}
export default SettingPaymentRecord;