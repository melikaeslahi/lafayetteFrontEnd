'use client'
import useToast from "@/hooks/useToast";
import { useEffect } from "react";

const StatusRecord=({ name,status , id  , message , query})=>{

    const [changeStatus, { data: dataStatus }] =  query();


    const handlerStatus = async (id) => {
        await changeStatus(id);
    }

    useEffect(()=>{
        useToast({ dataStatus:dataStatus ,  message:message})
   },[dataStatus]);
    return(
        <>
         <input type="checkbox" 
         name={name ? name : 'status'}
          defaultChecked={status === 1 ? true : false} 
          onChange={() => handlerStatus(id)} />
        </>
    );
}
export default StatusRecord;