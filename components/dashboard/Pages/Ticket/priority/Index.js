'use client'
import { CustomTable, SettingRecord, StatusRecord } from "@/components/dashboard/Table";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useChangeTicketPriorityStatusMutation, useDeleteTicketPriorityMutation, useGetAllTicketPriorityQuery } from "@/lib/ticket/ticketPriorityApi";
import useToast from "@/hooks/useToast";
 
const Index = () => {
    
    const { page, perPage, search } = useSelector((state) => state.util);

    const  query =  useGetAllTicketPriorityQuery({ page, perPage, search });
    const priorities = query?.data;

    const [changeStatus, { data: dataStatus }] =  useChangeTicketPriorityStatusMutation();
     
    const [deletePriority, result] =  useDeleteTicketPriorityMutation();

    const  columns =[
        {key:'name', label:'نام  اولویت'},
        {key:'status' ,label:'وضعیت', render:(_ , row)=><StatusRecord status={row.status} id={row.id} changeStatus={changeStatus}/> } , 
        {key:'setting' , label:'تنظیمات', render:(_,row)=><SettingRecord id={row.id} title={row.name} />}
      ]

    useEffect(() => {
       useToast({result:result , message:'اولویت تیکت'})
    }, [result]);

    useEffect(() => {
        useToast({dataStatus:dataStatus , message:'اولویت تیکت'})
    }, [dataStatus])

    return (
      <CustomTable 
        title={' اولویت تیکت ها'}
        sitemap={'بخش  تیکت ها/ اولویت تیکت ها'}
        pagination={priorities?.meta}
        deleteRecord={deletePriority}
        data={query}
        columns={columns} /> 
            
    )
}
export default Index;