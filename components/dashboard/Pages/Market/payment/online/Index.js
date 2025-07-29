'use client'
import { Table, TableContainer } from "@/components/dashboard/Table";
import { useSelector } from "react-redux";
import { useEffect  } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/dashboard/inputs";
import Link from "next/link";
import {   useCanceledPaymentMutation, useGetOnlinePaymentQuery,  useReturnedPaymentMutation  } from "@/lib/market/paymentApi";
import TableHeader from "@/components/dashboard/Table/TableHeader";
import useToast from "@/hooks/useToast";
const Index = () => {
    const pathname = usePathname();
    const { page, perPage, search } = useSelector((state) => state.util);

    const  query=   useGetOnlinePaymentQuery({ page, perPage, search });
    const payments = query?.data;

    const [ canceled , {data:dataCanceled}] =   useCanceledPaymentMutation( );
    const  [returned , {data:dataReturned}] =    useReturnedPaymentMutation( );

    const handlerCanceled =   (id) => {
        canceled(id);
    }

    const handlerReturned =   (id) => {
        returned(id);
    }

    useEffect(() => {
        let message;   
            if (dataCanceled?.status === 200) {
               message =' پرداخت با  با موفقیت  باطل شد ' 
            }   else {  
               message=' خطایی پیش آمده است  ' 
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

 
    return (<>
       <TableHeader 
        title={'پرداخت ها'}
        sitemap={'بخش فروش/ویترین/  پرداخت  ها'}
        href={`${pathname}/create`}
       />
        <TableContainer
            pagination={payments?.meta}
            query={query}
        >
            {<Table> 
            <thead className="text-pallete  shadow-md">
                    <tr className={`text-center`}>
                        <th className="pl-3 py-3"> # </th>
                        <th className="pl-3 py-3">     کد تراکنش </th>
                        <th className="pl-3 py-3">     بانک   </th>
                        <th className="pl-3 py-3">   پرداخت کننده   </th>
                        <th className="pl-3 py-3">      وضعیت پرداخت     </th>
                        <th className="pl-3 py-3">   نوع پرداخت </th>
                         
                        <th className="pl-3 py-3">     تنظیمات   </th>
                    </tr>
                </thead>
                <tbody>
            { payments.data?.map((payment) => {
                return (
                    <tr key={payment} className="text-center hover:bg-pallete hover:bg-opacity-20 hover:text-pallete  w-full  border-b-2 border-pallete">
                        <td className="pl-3 py-3">{payment}</td>
                        <td className="pl-3 py-3">{payment.payments?.transaction_id}</td>
                        <td className="pl-3 py-3">{payment.payments?.gateway}</td>
                        <td className="pl-3 py-3">{payment.user_id.first_name + ' ' + payment.user_id.last_name }</td>
                        <td className="pl-3 py-3">{payment.status == 0 ? 'پرداخت نشده'  : payment.status == 1 ? 'پرداخت شده' : payment.status == 2 ? 'باطل شده': 'برگشت داده شده'} </td>
                        <td className="pl-3 py-3">{payment.type == 0 ? ' آنلاین'  : payment.type == 1 ? ' آفلاین  ' :  '   در محل  '} </td>     
                        <td>
                            <Link href={`${pathname}/show/${payment.id}`} className="py-2 px-4 bg-green-500 hover:bg-green-600  rounded text-white">   نمایش      </Link>
                            <Button type="button" onClick={() => {
                                handlerCanceled(payment.id)      
                            }} className={`py-2 px-4 bg-red-500 hover:bg-red-600 rounded text-white  `} disabled={payment.status == 2 ? true : false} >   باطل کردن    </Button>
                             <Button type="button" onClick={() => {
                             handlerReturned(payment.id)
                          }} className={`py-2 px-4 bg-yellow-500 hover:bg-yellow-600 rounded text-white  `} disabled={payment.status == 3 ? true : false}>    برگشت دادن      </Button>
                        </td>
                    </tr>)
            })}
                </tbody>    
             </Table>}
        </TableContainer>
    </>
    )
}
export default Index;