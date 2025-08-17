'use client'
import { CustomTable, SettingRecord } from "@/components/dashboard/Table";
import {  useSelector } from "react-redux";
import { useEffect } from "react";
import { useDeleteRoleMutation, useGetAllRoleQuery } from "@/lib/user/roleApi";
import useToast from "@/hooks/useToast";
 
const Index = () => {
    const { page, perPage, search } = useSelector((state) => state.util);

    const  query=  useGetAllRoleQuery({ page, perPage, search });
    const roles = query?.data;
    const [deleteRole, result] =  useDeleteRoleMutation();
     
    const  columns =[
        {key:'name', label:'نام  نقش'},
        {key:'description' ,label:'توضیحات' ,render:(_,row)=>row.description.replace(/<(.|\n)*?>/g, '').slice(0, 10) },
        {key:'setting' , label:'تنظیمات', render:(_,row)=><SettingRecord id={row.id} title={row.name} />}
      ]

    useEffect(() => {
        useToast({result:result , message:'نقش'})
    }, [result]);

    return ( 
      <CustomTable 
        title={' نقش ها ها'}
        sitemap={'بخش  کاربران/ سطوح دسترسی/   نقش ها'}
        pagination={ roles?.meta}
        deleteRecord={deleteRole}
        data={query}
        columns={columns} /> 
    )
}
export default Index;