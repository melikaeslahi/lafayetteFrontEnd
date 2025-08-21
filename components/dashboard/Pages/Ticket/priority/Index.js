'use client'
import { CustomTable, SettingRecord, StatusRecord } from "@/components/dashboard/Table";
import { useChangeTicketPriorityStatusMutation, useDeleteTicketPriorityMutation, useGetAllTicketPriorityQuery } from "@/lib/ticket/ticketPriorityApi";
 
const Index = () => {
    const  columns =[
        {key:'name', label:'نام  اولویت'},
        {key:'status' ,label:'وضعیت', render:(_ , row)=><StatusRecord message={'اولویت تیکت'} query={useChangeTicketPriorityStatusMutation} status={row.status} id={row.id} /> } , 
        {key:'setting' , label:'تنظیمات', render:(_,row)=><SettingRecord query={useDeleteTicketPriorityMutation} message={'اولویت تیکت'} id={row.id} title={row.name} />}
      ]

    return (
      <CustomTable 
        title={' اولویت تیکت ها'}
        sitemap={'بخش  تیکت ها/ اولویت تیکت ها'}
        query={useGetAllTicketPriorityQuery}
        columns={columns} /> 
            
    )
}
export default Index;