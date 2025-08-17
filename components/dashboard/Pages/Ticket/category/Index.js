'use client'
import { CustomTable, SettingRecord, StatusRecord } from "@/components/dashboard/Table";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useChangeTicketCategoryStatusMutation, useDeleteTicketCategoryMutation, useGetAllTicketCategoryQuery } from "@/lib/ticket/ticketCategoryApi";
import useToast from "@/hooks/useToast";
 
const Index = () => {
 
    const { page, perPage, search } = useSelector((state) => state.util);

    const query =  useGetAllTicketCategoryQuery({ page, perPage, search });
    const categories = query?.data;
    const [changeStatus, { data: dataStatus }] =  useChangeTicketCategoryStatusMutation();
 
    const [deleteCategory, result] =  useDeleteTicketCategoryMutation();
    
    const  columns =[
        {key:'name', label:'نام دسته'},
        {key:'status' ,label:'وضعیت', render:(value ,row)=><StatusRecord status={value} id={row.id} changeStatus={changeStatus}/> } , 
        {key:'setting' , label:'تنظیمات', render:(_,row)=><SettingRecord id={row.id} title={row.name} />}
      ]


    useEffect(() => {
       useToast({result : result , message:'دسته بندی'});
    }, [result]);

    useEffect(() => {
       useToast({dataStatus:dataStatus , message:'دسته بندی'});
    }, [dataStatus])

    return ( 
    <CustomTable 
        title={'دسته بندی ها'}
        sitemap={'بخش  تیکت ها/ دسته بندی  تیکت ها'}
        pagination={categories?.meta}
        deleteRecord={deleteCategory}
        data={query}
        columns={columns} /> 
           
    )
}
export default Index;