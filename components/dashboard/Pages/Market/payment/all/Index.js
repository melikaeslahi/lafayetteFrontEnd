'use client'
import { CustomTable, SettingCommentRecord } from "@/components/dashboard/Table";
import { useGetAllPaymentQuery } from "@/lib/market/paymentApi";

const Index = () => {
   
    const  columns =[
        {key:'payments', label:' کد تراکنش ', render:(value)=>value.transaction_id},
        {key:'payments' , label:'بانک' , render:(value)=> value.gateway }, 
        {key:'user_id' ,label:'پرداخت کننده ', render:(value)=> `${value.user_id.first_name} ${value.user_id.last_name}` } , 
        {key:'status' ,label:' وضعیت پرداخت ' ,render:(value)=> value == 0 ? 'پرداخت نشده'  : value == 1 ? 'پرداخت شده' :  value == 2 ? 'باطل شده': 'برگشت داده شده' },
        {key:'type' ,label:'نوع پرداخت' , render:(value)=>value == 0 ? ' آنلاین'  :  value == 1 ? 'آفلاین' :  'در محل'},
        {key:'setting' , label:'تنظیمات', render:(_,row)=> <SettingCommentRecord id={row.id} />}
      ]

    return (
        <CustomTable 
            title={'پرداخت ها'}
            sitemap={'بخش فروش/ویترین/ پرداخت ها'}
            query={useGetAllPaymentQuery}
            columns={columns} /> 
    )
}
export default Index;