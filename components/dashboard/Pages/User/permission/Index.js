'use client'
import { CustomTable, SettingRecord } from "@/components/dashboard/Table";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDeletePermissionMutation, useGetAllPermissionQuery } from "@/lib/user/permissionApi";
import useToast from "@/hooks/useToast";
 
const Index = () => {
    const { page, perPage, search } = useSelector((state) => state.util);

    const  query = useGetAllPermissionQuery({ page, perPage, search });
    const permissions = query?.data;
    const [deletePermission, result] =  useDeletePermissionMutation();
    
    const  columns =[
        {key:'name', label:'نام دسترسی'},
        {key:'description' ,label:'توضیحات' ,render:(_,row)=>row.description.replace(/<(.|\n)*?>/g, '').slice(0, 10) },
        {key:'setting' , label:'تنظیمات', render:(_,row)=><SettingRecord id={row.id} title={row.name} />}
      ]

    useEffect(() => {
       useToast({result:result , message:'دسترسی'})
    }, [result]);
    

    return ( 
      <CustomTable 
        title={'   دسترسی  ها'}
        sitemap={'بخش  کاربران/ سطوح دسترسی/   دسترسی ها'}
        pagination={permissions?.meta}
        deleteRecord={deletePermission}
        data={query}
        columns={columns} /> 
    )
}
export default Index;