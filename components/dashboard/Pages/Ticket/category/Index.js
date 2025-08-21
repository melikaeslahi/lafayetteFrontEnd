'use client'
import { CustomTable, SettingRecord, StatusRecord } from "@/components/dashboard/Table";
import { useChangeTicketCategoryStatusMutation, useDeleteTicketCategoryMutation, useGetAllTicketCategoryQuery } from "@/lib/ticket/ticketCategoryApi";
 
const Index = () => {   
    const  columns =[
        {key:'name', label:'نام دسته'},
        {key:'status' ,label:'وضعیت', render:(value ,row)=><StatusRecord message={'دسته بندی'} query={useChangeTicketCategoryStatusMutation} status={value} id={row.id}/> } , 
        {key:'setting' , label:'تنظیمات', render:(_,row)=><SettingRecord message={'دسته بندی'} query={useDeleteTicketCategoryMutation} id={row.id} title={row.name} />}
      ]

    return ( 
    <CustomTable 
        title={'دسته بندی ها'}
        sitemap={'بخش  تیکت ها/ دسته بندی  تیکت ها'}
        query={useGetAllTicketCategoryQuery}
        columns={columns} /> 
           
    )
}
export default Index;