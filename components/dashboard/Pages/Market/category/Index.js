'use client'
import { CustomTable, SettingRecord, ShowImage, StatusRecord } from "@/components/dashboard/Table";
import { useChangeProductCategoryStatusMutation, useChangeShowInMenuMutation, useDeleteProductCategoryMutation, useGetAllProductCategoryQuery } from "@/services/market/productCategoryApi";
 

const Index = () => {
    const  columns =[
        {key:'name', label:'نام دسته'},
        {key:'image' , label:'تصویر' , render:(_ , row)=><ShowImage image={row.image} />}, 
        {key:'status' ,label:'وضعیت', render:(_ , row)=><StatusRecord message={'دسته بندی'} query={useChangeProductCategoryStatusMutation} status={row.status} id={row.id}/> } , 
        {key:'show_in_menu' ,label:'نمایش در منو',render:(_,row)=><StatusRecord message={'نمایش دسته بندی'} query={useChangeShowInMenuMutation} name={'show_in_menu'} id={row.id} status={row.show_in_menu}   />},
        {key:'description' ,label:'توضیحات' ,render:(_,row)=>row.description.replace(/<(.|\n)*?>/g, '').slice(0, 10) },
        {key:'tags' ,label:'برچسب ها'},
        {key:'parent' ,label:'دسته والد', render:(_ , row)=>row.parent !== null ? row.parent.name : 'دسته اصلی'},
        {key:'slug',label:'اسلاگ'},
        {key:'setting' , label:'تنظیمات', render:(_,row)=><SettingRecord message={'دسته بندی'} query={useDeleteProductCategoryMutation} id={row.id} title={row.name} />}
      ]

    return ( 
      <CustomTable 
       title={'دسته بندی ها'}
       sitemap={'بخش فروش/ویترین/دسته بندی ها'}    
       query={useGetAllProductCategoryQuery}
       columns={columns} /> 
          
    )
}
export default Index;