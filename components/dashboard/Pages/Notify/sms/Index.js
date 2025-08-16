'use client'
import { CustomTable, SettingRecord, StatusRecord} from "@/components/dashboard/Table";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useChangeSMSStatusMutation, useDeleteSMSMutation, useGetAllSMSQuery } from "@/lib/notify/SMSApi";
import useToast from "@/hooks/useToast";

const Index = () => {
    const { page, perPage, search } = useSelector((state) => state.util);

    const  query =  useGetAllSMSQuery({ page, perPage, search });
    const smses = query?.data;

    const [changeStatus, { data: dataStatus }] =   useChangeSMSStatusMutation();
    const [deleteSMS, result] =  useDeleteSMSMutation();

    const  columns =[
        {key:'title', label:'عنوان'},
        {key:'status' ,label:'وضعیت', render:(value , row)=><StatusRecord status={value} id={row.id} changeStatus={changeStatus}/> } , 
        {key:'description' ,label:'توضیحات' ,render:(value)=>value.replace(/<(.|\n)*?>/g, '').slice(0, 10) },
        {key:'published_at' ,label:'تاریخ انتشار'},
        {key:'setting' , label:'تنظیمات', render:(_,row)=><SettingRecord id={row.id} title={row.title} />}
      ]

     
    useEffect(() => {
        useToast({result: result , message:'پیام'})
    }, [result]);

    useEffect(() => {
       useToast({dataStatus:dataStatus , message:"پیام"})
    }, [dataStatus])

    return (
      <CustomTable 
        pagination={smses?.meta}
        deleteRecord={deleteSMS}
        data={query}
        title={'پیام ها'}
        sitemap={' بخش  اطلاع رسانی / پیام ها  '}
        columns={columns} />
    )
}
export default Index;