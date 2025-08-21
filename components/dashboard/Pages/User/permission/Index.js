'use client'
import { CustomTable, SettingRecord } from "@/components/dashboard/Table";
import { useDeletePermissionMutation, useGetAllPermissionQuery } from "@/lib/user/permissionApi";
 
const Index = () => {
    
    const  columns =[
        {key:'name', label:'نام دسترسی'},
        {key:'description' ,label:'توضیحات' ,render:(_,row)=>row.description.replace(/<(.|\n)*?>/g, '').slice(0, 10) },
        {key:'setting' , label:'تنظیمات', render:(_,row)=><SettingRecord query={useDeletePermissionMutation} message={'دسترسی'} id={row.id} title={row.name} />}
      ]
 

    return ( 
      <CustomTable 
        title={'   دسترسی  ها'}
        sitemap={'بخش  کاربران/ سطوح دسترسی/   دسترسی ها'}
        query={useGetAllPermissionQuery}
        columns={columns} /> 
    )
}
export default Index;