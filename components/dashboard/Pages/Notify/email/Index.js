'use client'
import { CustomTable, SettingRecord, StatusRecord  } from "@/components/dashboard/Table";
import { useSelector } from "react-redux";
import { useEffect } from "react";
 
import { useChangeEmailStatusMutation, useDeleteEmailMutation, useGetAllEmailQuery } from "@/lib/notify/EmailApi";
import useToast from "@/hooks/useToast";

const Index = () => {
  
    const { page, perPage, search } = useSelector((state) => state.util);

    const  query =  useGetAllEmailQuery({ page, perPage, search });
    const emails =query?.data;

    const [changeStatus, { data: dataStatus }] =   useChangeEmailStatusMutation();
    const [deleteEmail, result] =  useDeleteEmailMutation();
     
    const  columns =[
        {key:'subject', label:'موضوع'},
        {key:'status' ,label:'وضعیت', render:(value , row)=><StatusRecord status={value} id={row.id} changeStatus={changeStatus}/> } , 
        {key:'description' ,label:'توضیحات' ,render:(value)=>value.replace(/<(.|\n)*?>/g, '').slice(0, 10) },
        {key:'published_at' ,label:'تاریخ انتشار'},
        {key:'setting' , label:'تنظیمات', render:(_,row)=><SettingRecord id={row.id} title={row.name} />}
      ]

    useEffect(() => {
       useToast({result:result , message:'ایمیل'});
    }, [result]);

    useEffect(() => {
      useToast({dataStatus:dataStatus , message:'ایمیل'});
    }, [dataStatus])

    return (
        <CustomTable 
            title={' ایمیل ها'}
            sitemap={' بخش  اطلاع رسانی / ایمیل ها  '}
            pagination={emails?.meta}
            deleteRecord={deleteEmail}
            data={query}
            columns={columns} />
                
    )
}
export default Index;