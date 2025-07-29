'use client'
import { Table, TableContainer } from "@/components/dashboard/Table";
import TitlePage from "@/components/dashboard/TitlePage";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {  setIsError, setIsLoading, setIsSuccess, setItemLength } from "@/store/reducers/dashboard/UtilSlice";
import { usePathname } from "next/navigation";
import { Button } from "@/components/dashboard/inputs";
import { toast } from "react-toastify";
import Link from "next/link";
import {   useCanceledPaymentMutation ,   useGetOfflinePaymentQuery,  useReturnedPaymentMutation  } from "@/lib/market/paymentApi";
import useToast from "@/hooks/useToast";
const Index = () => {
 
    const dispatch = useDispatch();
    const pathname = usePathname();
    const { page, perPage, search } = useSelector((state) => state.util);
  
    const query =   useGetOfflinePaymentQuery({ page, perPage, search });
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
                message =' پرداخت با موفقیت برگشت داده شد ' 
            } else {
                message =' خطایی پیش آمده است  ' 
            }
            useToast({dataStatus:dataReturned , customMessage:message})   
    }, [dataReturned])


    return (<>
        <TitlePage
            name='پرداخت ها'
            sitemapPage='بخش فروش/ویترین/  پرداخت  ها'

        >
            <Link
                href={`${pathname}/create`}
                aria-disabled={true}
                className="py-4 px-8 bg-pallete rounded text-white"   >
                {' '}
                ایجاد   پرداخت جدید
            </Link>
        </TitlePage>

        <TableContainer
            pagination={payments?.meta}
           
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
            { payments.data?.map((payment, index) => {
                 
                return (
                    <tr key={index} className="text-center hover:bg-pallete hover:bg-opacity-20 hover:text-pallete  w-full  border-b-2 border-pallete">
                        <td className="pl-3 py-3">{index+=1}</td>
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