'use client'
import { CustomTable, SettingRecord, StatusRecord} from "@/components/dashboard/Table";
import { useChangeSMSStatusMutation, useDeleteSMSMutation, useGetAllSMSQuery } from "@/lib/notify/SMSApi";
 
const Index = () => {
    const  columns =[
        {key:'title', label:'عنوان'},
        {key:'status' ,label:'وضعیت', render:(value , row)=><StatusRecord message={'پیام'} query={useChangeSMSStatusMutation} status={value} id={row.id}/> } , 
        {key:'description' ,label:'توضیحات' ,render:(value)=>value.replace(/<(.|\n)*?>/g, '').slice(0, 10) },
        {key:'published_at' ,label:'تاریخ انتشار'},
        {key:'setting' , label:'تنظیمات', render:(_,row)=><SettingRecord message={'پیام'} query={useDeleteSMSMutation} id={row.id} title={row.title} />}
      ]

    return (
      <CustomTable 
        query ={useGetAllSMSQuery}
        title={'پیام ها'}
        sitemap={' بخش  اطلاع رسانی / پیام ها  '}
        columns={columns} />
    )
}
export default Index;