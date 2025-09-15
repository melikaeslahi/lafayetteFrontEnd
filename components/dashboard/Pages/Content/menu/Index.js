'use client'
import { CustomTable, SettingRecord, StatusRecord } from "@/components/dashboard/Table";
import { useChangeMenuStatusMutation, useDeleteMenuMutation, useGetAllMenusQuery } from "@/services/content/menuApi";
 

const Index = () => { 
    const  columns =[
        {key:'name', label:'نام منو'},
        {key:'url' , label:'آدرس' , render:(_ , row)=><ShowImage image={row.image} />}, 
        {key:'status' ,label:'وضعیت', render:(_ , row)=><StatusRecord message={'منو'} query={useChangeMenuStatusMutation} status={row.status} id={row.id}/> } , 
        {key:'parent' ,label:'منو والد', render:(_ , row)=>row.parent !== null ? row.parent.name : ' منو اصلی'},
        {key:'setting' , label:'تنظیمات', render:(_,row)=><SettingRecord message={'منو'} query={useDeleteMenuMutation} id={row.id} title={row.name} />}
      ]

    return ( 
      <CustomTable
       title={'منو ها'}
       sitemap={'بخش محتوایی / منو ها'}
       query={useGetAllMenusQuery}
       columns={columns} />             
    )
}
export default Index;