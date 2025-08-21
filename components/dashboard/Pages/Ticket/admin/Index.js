'use client'
import { CustomTable  } from "@/components/dashboard/Table";
import { useEffect } from "react";
import { Button } from "@/components/dashboard/inputs";
import {  faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useChangeTicketAdminStatusMutation, useGetAllTicketAdminQuery } from "@/lib/ticket/ticketAdminApi";
import useToast from "@/hooks/useToast";
 
const Index = () => {

    const [changeStatus, { data: dataStatus }] = useChangeTicketAdminStatusMutation();
    const handlerStatus = async (id) => {
        await changeStatus(id);
    }
    const  columns =[
        {key:'first_name', label:'نام ادمین' , render:(value , row)=>`${value} ${row.last_name}`},
        {key:'email' , label:'ایمیل ادمین'  }, 
        {key:'setting' , label:'تنظیمات', render:(_,row)=> <Button type="button" 
        onClick={() => {
           handlerStatus(row.id)
         }}
          className={`py-2 px-4 rounded text-white
          ${ row.admin == null ? 
          'bg-green-500 hover:bg-green-600' :
          `bg-red-500 hover:bg-red-600`} 
           `}>  
         <FontAwesomeIcon icon={faTrash} />  
            </Button>}
      ]
 
    useEffect(() => {
           let message;
            if (dataStatus?.status === 200) {
                 message=' تیکت ادمین تغییر کرد '          
            }
            useToast({dataStatus: dataStatus , customMessage:message})
    }, [dataStatus])

    return (
     <CustomTable
        title={'  تیکت ادمین'}
        sitemap={'بخش  تیکت ها/  تیکت ادمین'}
        query={useGetAllTicketAdminQuery}
        columns={columns} /> 
    )
}
export default Index;