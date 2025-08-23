'use client'
import { CustomTable, SettingOrdersRecord } from "@/components/dashboard/Table";
import { useGetNewOrdersQuery } from "@/lib/market/orderApi";
 
const Index = () => {
    const  columns =[
        {key:'id', label:'کد سفارش'},
        {key:'order_final_amount' , label:'(بدون تخفیف) مجموع مبلغ سفارش' , render:(value)=> `${value} نومان` }, 
        {key:'order_discount_amount' ,label:'مجموع تمامی مبلغ تخفیف', render:(value)=> `${value} نومان`} , 
        {key:'order_total_products_discount_amount' ,label:'مبلغ تخفیف همه محصولات' ,render:(value)=> `${value} نومان`},
        {key:'order_final_amount' ,label:'مبلغ نهایی' ,render:(_,row)=>`${ row.order_final_amount  -  row.order_discount_amount }تومان` },
        {key:'paymentStatusValue' ,label:'وضعیت پرداخت '},
        {key:'paymentTypeValue',label:'شیوه ی پرداخت '},
        {key:'payment',label:'بانک ' , render:()=>row.payment.payments?.gateway ?  row.payment.payments?.gateway :'-'},
        {key:'deliveryStatusValue',label:'وضعیت ارسال '},
        {key:'delivery',label:'شیوه ی ارسال ' , render:(value)=>value.name},
        {key:'orderStatusValue',label:'وضعیت سفارش ' },
        {key:'setting' , label:'تنظیمات', render:(_,row)=> <SettingOrdersRecord id={row.id} />}
      ]

    return (
            <CustomTable 
            title={'سفارشات'}
            sitemap={'بخش فروش/ویترین/ سفارشات'}
            query={useGetNewOrdersQuery}
            columns={columns} />
    )
}
export default Index;