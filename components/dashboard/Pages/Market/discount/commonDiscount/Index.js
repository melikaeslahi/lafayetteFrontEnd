'use client'
import { CustomTable, SettingRecord } from "@/components/dashboard/Table";
import { useDeleteCommonDiscountMutation, useGetAllCommonDiscountQuery } from "@/services/market/commonDiscountApi";
 
const Index = () => { 
    const  columns =[
        {key:'title', label:'عنوان تخفیف'},
        {key:'percentage' , label:'درصد تخفیف'}, 
        {key:'discount_ceiling' ,label:'حداکثر تخفیف', render:(_,row)=>row.amount_type ===0 ? `${row.amount}'%'`  : `${row.amount} 'تومان'`  } , 
        {key:'minimal_order_amount' ,label:'سقف خرید' ,render:(_,row)=>row.description.replace(/<(.|\n)*?>/g, '').slice(0, 10) },
        {key:'start_date' ,label:'تاریخ شروع'},
        {key:'end_date' ,label:'تاریخ پایان', render:(_ , row)=>row.parent !== null ? row.parent.name : 'دسته اصلی'},
        {key:'setting' , label:'تنظیمات', render:(_,row)=><SettingRecord message={تخفیف} query={useDeleteCommonDiscountMutation} id={row.id} title={row.name} />}
      ]
    return (
        <CustomTable 
         title={'تخفیف عمومی'}
         sitemap={'بخش فروش/ویترین/ تخفیف ها /تخفیف های عمومی'}
         query={useGetAllCommonDiscountQuery}
         columns={columns} />     
    )
}
export default Index;