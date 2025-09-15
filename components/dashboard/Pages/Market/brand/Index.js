'use client'
import { CustomTable, SettingRecord, ShowImage, StatusRecord } from "@/components/dashboard/Table";
import { useChangeBrandStatusMutation, useDeleteBrandMutation, useGetAllBrandQuery } from "@/services/market/brandApi";
 
const Index = () => {   
    const  columns =[
        {key:'persian_name', label:'نام فارسی'},
        {key:'original_name' ,label:'نام اصلی'},
        {key:'image' , label:'لوگو' , render:(_ , row)=><ShowImage image={row.image} />}, 
        {key:'status' ,label:'وضعیت', render:(_ , row)=><StatusRecord message={'برند'} query={useChangeBrandStatusMutation} status={row.status} id={row.id} changeStatus={changeStatus}/> } , 
        {key:'tags' ,label:'برچسب ها'},
        {key:'slug',label:'اسلاگ'},
        {key:'setting' , label:'تنظیمات', render:(_,row)=><SettingRecord message={'برند'} query={useDeleteBrandMutation} id={row.id} title={row.persian_name} />}
      ]

    return (
        <CustomTable 
           title={'برند ها'}
           sitemap={'بخش فروش/ویترین/برند ها'}   
           query={useGetAllBrandQuery}
           columns={columns} />         
    )
}
export default Index;