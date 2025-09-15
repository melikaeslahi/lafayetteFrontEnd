'use client'
import { CustomTable, SettingRecord, StatusRecord } from "@/components/dashboard/Table";
import { useChangePageStatusMutation, useDeletePageMutation, useGetAllPageQuery } from "@/services/content/pageApi";
 

const Index = () => { 
    const  columns =[
        {key:'title', label:'عنوان صفحه'},
        {key:'body' , label:'بدنه صفحه' , render:(_ , row)=> row.body.replace(/<(.|\n)*?>/g, '').slice(0, 10)}, 
        {key:'status' ,label:'وضعیت', render:(_ , row)=><StatusRecord message={'پیج ساز'} query={useChangePageStatusMutation} status={row.status} id={row.id}/> } , 
        {key:'tags' ,label:'برچسب ها'},
        {key:'slug',label:'اسلاگ'},
        {key:'setting' , label:'تنظیمات', render:(_,row)=><SettingRecord message={'پیج ساز'} query={useDeletePageMutation} id={row.id} title={row.title} />}
      ]

    return(  
        <CustomTable
          title={'پیج ساز'}
          sitemap={'بخش محتوایی /پیج ساز'}
          query={useGetAllPageQuery}
          columns={columns} />                  
    )
}
export default Index;