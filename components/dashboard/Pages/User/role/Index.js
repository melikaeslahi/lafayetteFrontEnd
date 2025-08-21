'use client'
import { CustomTable, SettingRecord } from "@/components/dashboard/Table";
import { useDeleteRoleMutation, useGetAllRoleQuery } from "@/lib/user/roleApi";
 
const Index = () => {    
    const  columns =[
        {key:'name', label:'نام  نقش'},
        {key:'description' ,label:'توضیحات' ,render:(_,row)=>row.description.replace(/<(.|\n)*?>/g, '').slice(0, 10) },
        {key:'setting' , label:'تنظیمات', render:(_,row)=><SettingRecord query={useDeleteRoleMutation} message={'نقش'} id={row.id} title={row.name} />}
      ]

    return ( 
      <CustomTable 
        title={' نقش ها ها'}
        sitemap={'بخش  کاربران/ سطوح دسترسی/   نقش ها'} 
        query={useGetAllRoleQuery}
        columns={columns} /> 
    )
}
export default Index;