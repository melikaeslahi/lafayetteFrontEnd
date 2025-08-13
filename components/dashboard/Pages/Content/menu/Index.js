'use client'
import { CustomTable, SettingRecord, StatusRecord } from "@/components/dashboard/Table";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useChangeMenuStatusMutation, useDeleteMenuMutation, useGetAllMenusQuery } from "@/lib/content/menuApi";
import useToast from "@/hooks/useToast";

const Index = () => { 
    const { page, perPage, search } = useSelector((state) => state.util);

     //fetch menus
    const query = useGetAllMenusQuery({ page, perPage, search });
    const menus =query?.data;
    const [changeStatus, { data: dataStatus }] =   useChangeMenuStatusMutation();
    const [deleteMenu, result] =  useDeleteMenuMutation();
    
    const  columns =[
        {key:'name', label:'نام منو'},
        {key:'url' , label:'آدرس' , render:(_ , row)=><ShowImage image={row.image} />}, 
        {key:'status' ,label:'وضعیت', render:(_ , row)=><StatusRecord status={row.status} id={row.id} changeStatus={changeStatus}/> } , 
        {key:'parent' ,label:'منو والد', render:(_ , row)=>row.parent !== null ? row.parent.name : ' منو اصلی'},
        {key:'setting' , label:'تنظیمات', render:(_,row)=><SettingRecord id={row.id} title={row.name} />}
      ]

    useEffect(() => {
       useToast({result:result , message:"منو"})
    }, [result]);

    useEffect(() => {
    useToast({dataStatus:dataStatus , message:"منو"})
    }, [dataStatus])

    return ( 
      <CustomTable
       title={'منو ها'}
       sitemap={'بخش محتوایی / منو ها'}
       pagination={menus?.meta}
       deleteRecord={deleteMenu}
       data={query}
       columns={columns} />             
    )
}
export default Index;