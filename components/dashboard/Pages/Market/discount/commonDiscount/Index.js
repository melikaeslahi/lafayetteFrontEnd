'use client'
import { CustomTable, SettingRecord } from "@/components/dashboard/Table";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDeleteCommonDiscountMutation, useGetAllCommonDiscountQuery } from "@/lib/market/commonDiscountApi";
import useToast from "@/hooks/useToast";

const Index = () => { 
    const { page, perPage, search } = useSelector((state) => state.util);
    const query =  useGetAllCommonDiscountQuery({ page, perPage, search });
    const commonDiscounts = query?.data;
    const [deleteCommonDiscount, {result:deleteResult}] =  useDeleteCommonDiscountMutation();

    const  columns =[
        {key:'title', label:'عنوان تخفیف'},
        {key:'percentage' , label:'درصد تخفیف' , render:(_ , row)=><ShowImage image={row.image} />}, 
        {key:'discount_ceiling' ,label:'حداکثر تخفیف', render:(_ , row)=><StatusRecord status={row.status} id={row.id} changeStatus={changeStatus}/> } , 
        {key:'minimal_order_amount' ,label:'سقف خرید' ,render:(_,row)=>row.description.replace(/<(.|\n)*?>/g, '').slice(0, 10) },
        {key:'start_date' ,label:'تاریخ شروع'},
        {key:'end_date' ,label:'تاریخ پایان', render:(_ , row)=>row.parent !== null ? row.parent.name : 'دسته اصلی'},
        {key:'setting' , label:'تنظیمات', render:(_,row)=><SettingRecord id={row.id} title={row.name} />}
      ]

    useEffect(() => {
         useToast({result:deleteResult , message:"تخفیف"})
    }, [deleteResult]);

    return (
        <CustomTable 
         title={'تخفیف عمومی'}
         sitemap={'بخش فروش/ویترین/ تخفیف ها /تخفیف های عمومی'}
         pagination={commonDiscounts?.meta}
         deleteRecord={deleteCommonDiscount}
         data={query}
         columns={columns} />     
    )
}
export default Index;