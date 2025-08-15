'use client'
import { CustomTable } from "@/components/dashboard/Table";
import { useSelector } from "react-redux";
import { useEffect} from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/dashboard/inputs";
import Link from "next/link";
import { useCanceledPaymentMutation, useGetAllPaymentQuery, useReturnedPaymentMutation } from "@/lib/market/paymentApi";
import useToast from "@/hooks/useToast";
const Index = () => {
    const pathname = usePathname();
    const { page, perPage, search } = useSelector((state) => state.util);
 
    const query =  useGetAllPaymentQuery({ page, perPage, search });
    const payments = query?.data;

    const [ canceled , {data:dataCanceled}] = useCanceledPaymentMutation();
    const  [returned , {data:dataReturned}] = useReturnedPaymentMutation();
    
    const  columns =[
        {key:'payments', label:' کد تراکنش ', render:(value)=>value.transaction_id},
        {key:'payments' , label:'بانک' , render:(value)=> value.gateway }, 
        {key:'user_id' ,label:'پرداخت کننده ', render:(value)=> `${value.user_id.first_name} ${value.user_id.last_name}` } , 
        {key:'status' ,label:' وضعیت پرداخت ' ,render:(value)=> value == 0 ? 'پرداخت نشده'  : value == 1 ? 'پرداخت شده' :  value == 2 ? 'باطل شده': 'برگشت داده شده' },
        {key:'type' ,label:'نوع پرداخت' , render:(value)=>value == 0 ? ' آنلاین'  :  value == 1 ? 'آفلاین' :  'در محل'},
        {key:'setting' , label:'تنظیمات', render:(_,row)=><>
          <Link href={`${pathname}/show/${row.id}`} className="py-2 px-4 bg-green-500 hover:bg-green-600  rounded text-white"> نمایش </Link>
            <Button type="button" onClick={() => {handlerCanceled(row.id) }}
             className={`py-2 px-4 bg-red-500 hover:bg-red-600 rounded text-white  `}
              disabled={row.status == 2 ? true : false} > باطل کردن </Button>
             <Button type="button" onClick={() => {handlerReturned(row.id)}}
             className={`py-2 px-4 bg-yellow-500 hover:bg-yellow-600 rounded text-white  `} 
             disabled={row.status == 3 ? true : false}> برگشت دادن </Button>
        </>}
      ]

    const handlerCanceled =   (id) => {
        canceled(id);
    }

    const handlerReturned =   (id) => {
        returned(id);
    }


    useEffect(() => {
        let message;
            if (dataCanceled?.status === 200) {
                 message =' پرداخت با  با موفقیت  باطل شد'             
            }   else  {
                message= "خطایی پیش آمده است "
            }
        useToast({dataStatus:dataCanceled , customMessage:message});
    }, [dataCanceled]);
 
    useEffect(() => {
        if (dataReturned) {
            if (dataReturned?.status ===  200 ) {
              message= ' پرداخت با موفقیت برگشت داده شد ';
            }   else {
               message =' خطایی پیش آمده است ';
            }
        }
    }, [dataReturned])

    return (
        <CustomTable 
            title={'پرداخت ها'}
            sitemap={'بخش فروش/ویترین/  پرداخت  ها'}
            pagination={payments?.meta}
            data={query}
            columns={columns} /> 
    )
}
export default Index;